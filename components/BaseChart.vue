<template>
  <client-only>
    <VChart :option="option" autoresize class="w-full h-full" />
  </client-only>
</template>

<script setup>
import VChart from "vue-echarts";
defineProps({ option: Object });
</script>
