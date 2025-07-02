<script setup lang="ts">
import { Loading03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';

const router = useRouter();
onMounted(() => {
  router.push('/login');
})
</script>

<template>
  <div class="h-screen w-screen grid place-items-center">
    <HugeiconsIcon :icon="Loading03Icon" class="animate-spin" />
  </div>
</template>
