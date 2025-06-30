<!-- components/admin/SidebarItem.vue -->
<template>
  <div
    class="flex items-center space-x-2 hover:bg-white/10 p-2 rounded cursor-pointer"
  >
    <span class="text-xl">{{ icon }}</span>
    <span class="text-sm nowrap">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  text: String,
});
</script>
