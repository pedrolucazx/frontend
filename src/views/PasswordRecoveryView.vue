<script setup lang="ts">
import { AutoForm } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { passwordRecovery } from "@/services/http/login";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";
import * as zod from "zod";

const { toast } = useToast();
const schema = zod.object({
  email: zod
    .string({ required_error: "E-mail é obrigatório." })
    .email("Este não é um e-mail válido."),
});

async function onSubmit(data: { email: string }) {
  try {
    await passwordRecovery(data.email);
    toast({
      title: "Sucesso",
      description: "Sua nova senha foi enviada para seu e-mail.",
      class: "bg-green-500 text-white",
    });
  } catch (error) {
    console.error("Login failed:", error);
    toast({
      title: "Erro",
      description:
        "Não foi possível enviar a nova senha. Tente novamente mais tarde.",
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
        }"
        @submit="onSubmit"
      >
        <Button type="submit" class="w-full">Enviar Nova Senha</Button>
      </AutoForm>
    </div>
  </div>
  <Toaster />
</template>
