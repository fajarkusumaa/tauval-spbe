<template>
  <component :is="resolvedIcon" v-bind="iconProps" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { iconMap } from "../lib/icons";

const props = defineProps<{
  name: string;
  iconProps?: Record<string, any>;
}>();

const resolvedIcon = computed(() => iconMap[props.name] ?? null);
</script>
