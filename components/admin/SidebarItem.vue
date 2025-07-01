<!-- components/admin/SidebarItem.vue -->
<template>
  <NuxtLink
    :to="to"
    class="flex items-center space-x-2 hover:bg-white/10 p-2 rounded cursor-pointer"
  >
    <DynamicIcon name="user" :iconProps="{ class: 'w-6 h-6 text-blue-500' }" />
    <!-- <span class="text-xl"> {{ icon }}</span> -->
    <span class="text-sm nowrap">{{ text }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from "@hugeicons/vue";
import DynamicIcon from "../DynamicIcon.vue";

defineProps({
  icon: String,
  text: String,
  to: {
    type: String,
    required: true,
  },
});
</script>
