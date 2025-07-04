<template>
  <div class="w-screen h-screen flex items-center justify-center overflow-hidden admin-background">
    <Card class="w-[350px] bg-white shadow-lg border border-white/10">
      <CardHeader>
        <CardTitle class="text-xl">Selamat datang👋</CardTitle>
        <CardDescription class="text-slate-700">
          Masukkan akun anda untuk melanjutkan
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div class="mb-4" v-if="loginError">
          <Alert variant="destructive" class="border-destructive bg-destructive/10">
            <AlertTitle>Galat!</AlertTitle>
            <AlertDescription>
              {{ loginError.error.message[0] }}
            </AlertDescription>
          </Alert>
        </div>
        <form class="space-y-4" ref="form" @submit.prevent="login">
          <button type="submit" hidden></button>
          <div class="flex flex-col space-y-1.5">
            <Label for="username" class="text-slate-600">Username</Label>
            <Input id="username" type="username" placeholder="Masukkan username" class="bg-slate-50 text-slate-800"
              v-model="credentials.username" required />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="password" class="text-slate-600">Password</Label>
            <Input id="password" type="password" placeholder="********" class="bg-slate-50 text-slate-800"
              v-model="credentials.password" required />
          </div>
        </form>
      </CardContent>

      <CardFooter class="flex gap-2 px-6">
        <Button class="border w-full" @click="submitForm" :disabled="isLoading">
          Login
          <template v-if="isLoading">
            <HugeiconsIcon :icon="Loading03Icon" class="animate-spin" />
          </template>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import { useToken, useUser } from "~/lib/token";
import type { LoginErrorResponseT, LoginSuccessResponseT } from "~/types/index.types";

definePageMeta({
  middleware: () => {
    const token = useToken()

    if (token.value) {
      return navigateTo('/admin')
    }
  }
})

const config = useRuntimeConfig()

const form = ref<HTMLFormElement | null>(null)

const credentials = ref({
  username: "",
  password: "",
})
const isLoading = ref(false);
const loginError = ref<LoginErrorResponseT | null>(null)

function submitForm() {
  if (form.value !== null) {
    form.value.requestSubmit()
  }
}

async function login() {
  isLoading.value = true

  const token = useToken();
  const user = useUser();

  await $fetch<LoginSuccessResponseT>(`${config.public.apiBase}/auth/login`, {
    method: 'POST',
    body: credentials.value
  }).then((res) => {
    isLoading.value = false
    loginError.value = null
    token.value = res.data.token
    user.value = res.data.user
    navigateTo('/admin')
  })
    .catch((err) => {
      isLoading.value = false
      loginError.value = err.data
    })
};
</script>
