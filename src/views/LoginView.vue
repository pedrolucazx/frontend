<script setup lang="ts">
import { AutoForm } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { useSessionStore } from "@/store/session";
import * as zod from "zod";
import { login, type LoginRequest } from "@/services/http/login";

const schema = zod.object({
  email: zod
    .string({ required_error: "E-mail é obrigatório." })
    .email("Este não é um e-mail válido."),
  password: zod
    .string({ required_error: "Password is required." })
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
});

const sessionStore = useSessionStore();

async function onSubmit({ email, password }: LoginRequest) {
  try {
    const data = await login({ email, password });
    const token = data.token;
    const payload = JSON.parse(atob(token.split(".")[1]));

    const sessionData = {
      id: payload.sub,
      email: payload.username,
      role: payload.role,
      token,
    };

    await sessionStore.setSession(sessionData);
  } catch (error) {
    console.error("Login failed:", error);
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
        <Button type="submit" class="w-full">Enviar</Button>
      </AutoForm>
    </div>
  </div>
</template>
