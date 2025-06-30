<!-- layouts/admin.vue -->
<template>
  <div
    class="flex min-h-screen bg-gradient-to-br from-[#E5F1FF] to-[#F1F5FF] text-gray-900"
  >
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex flex-col flex-1">
      <!-- Topbar -->
      <Navbar />

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../components/admin/Sidebar.vue";
import Navbar from "~/components/admin/Navbar.vue";
</script>
