<!-- layouts/admin.vue -->
<template>
  <Toaster rich-colors position="top-center" />
  <div
    class="flex min-h-screen bg-gradient-to-br w-screen overflow-hidden from-[#E5F1FF] to-[#F1F5FF] text-gray-900 admin-background">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex flex-col flex-1 w-full max-h-screen overflow-hidden">
      <!-- Topbar -->
      <Navbar />

      <!-- Page Content -->
      <main class="flex-1 p-6 w-full overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToken } from "~/lib/token";
import Sidebar from "~/components/admin/Sidebar.vue";
import Navbar from "~/components/admin/Navbar.vue";
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 re

const token = useToken();

if (!token.value) {
  navigateTo("/login");
}

</script>
