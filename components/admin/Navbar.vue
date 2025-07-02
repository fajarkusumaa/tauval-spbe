<script setup lang="ts">
import { Notification01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import { useToken, useUser } from "~/lib/token";

const token = useToken()
const user = useUser()

function logout() {
  navigateTo('/')
  token.value = null
  user.value = null
}
</script>

<template>
  <header class="flex items-center justify-end p-4 sticky top-0 backdrop-blur-md bg-transparent z-50">
    <div class="flex items-center gap-4">
      <button class="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
        <HugeiconsIcon :icon="Notification01Icon" />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <div class="flex items-center gap-2">
            <img src="https://api.dicebear.com/9.x/thumbs/svg?seed=Christopher" class="w-8 h-8 rounded-full"
              alt="User" />

            <div class="text-sm">
              <div class="font-bold">{{ user?.name }}</div>
              <div class="text-gray-500">{{ user?.email }}</div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-45 mt-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
