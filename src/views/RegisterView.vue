<script setup lang="ts">
import { AutoForm } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import { register, type LoginRequest } from "@/services/http/login";
import { useRouter } from "vue-router";
import * as zod from "zod";

const { toast } = useToast();
const router = useRouter();
const schema = zod.object({
  email: zod
    .string({ required_error: "E-mail é obrigatório." })
    .email("Este não é um e-mail válido."),
  password: zod
    .string({ required_error: "Password is required." })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
});

async function onSubmit({ email, password }: LoginRequest) {
  try {
    await register({ email, password });
    toast({
      title: "Cadastri realizado com sucesso",
      description: "Bem-vindo de volta!",
      class: "bg-green-500 text-white",
    });
    router.push("/");
  } catch (error) {
    console.error("Register failed:", error);
    toast({
      title: "Erro",
      description: "Falha ao fazer login. Verifique suas credenciais.",
      class: "bg-red-500 text-white",
    });
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
      <AutoForm
        class="flex flex-col gap-4"
        :schema="schema"
        :field-config="{
          email: {
            label: 'E-mail',
            inputProps: {
              type: 'email',
              placeholder: 'exemplo@mail.com',
            },
          },
          password: {
            label: 'Senha',
            inputProps: {
              type: 'password',
              placeholder: '••••••••',
            },
          },
        }"
        @submit="onSubmit"
      >
        <Button type="submit" class="w-full">Cadastrar</Button>
      </AutoForm>
    </div>
  </div>
</template>
