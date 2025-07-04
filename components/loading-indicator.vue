<script setup lang="ts">
import { Loading03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';

</script>

<template>
  <div class="flex">
    Loading...
    <HugeiconsIcon :icon="Loading03Icon" class="animate-spin" />
  </div>
</template>
