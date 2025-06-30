<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700">Dashboard Admin</h1>
    <!-- Content -->
    <div class="wrapper h-screen">
      <div class="container mt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="item">
            <div class="title mb-4 font-bold text-primary">Indeks SPBE</div>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent> Card Content </CardContent>
              <CardFooter> Card Footer </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <!-- / Content -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: `admin`,
});

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>
