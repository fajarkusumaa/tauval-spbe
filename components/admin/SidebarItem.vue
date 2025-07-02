<template>
  <NuxtLink :to="to" class="flex items-center space-x-2 hover:bg-white/10 p-2 rounded cursor-pointer">
    <HugeiconsIcon :icon="icon" />
    <span class="text-sm nowrap">{{ text }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { HugeiconsIcon } from "@hugeicons/vue";

type IconSvgObject = ([string, {
  [key: string]: string | number;
}])[] | readonly (readonly [string, {
  readonly [key: string]: string | number;
}])[];

defineProps<{
  icon: IconSvgObject;
  text: string;
  to: string;
}>();
</script>
