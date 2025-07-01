<script setup lang="ts">
import { Notification01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
</script>

<!-- components/admin/Navbar.vue -->
<template>
  <header
    class="flex items-center justify-end p-4 sticky top-0 backdrop-blur-md bg-transparent z-50 border-b border-slate-200"
  >
    <div class="flex items-center gap-4">
      <button class="text-gray-500 hover:text-gray-700 hover:cursor-pointer">
        <HugeiconsIcon :icon="Notification01Icon" />
      </button>
      <div class="flex items-center gap-2">
        <img
          src="https://i.pravatar.cc/32"
          class="w-8 h-8 rounded-full"
          alt="User"
        />
        <div class="text-sm">
          <div class="font-bold">John Doe</div>
          <div class="text-gray-500">user@email.com</div>
        </div>
      </div>
    </div>
  </header>
</template>
