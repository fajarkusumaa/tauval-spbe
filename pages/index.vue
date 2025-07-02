<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
</script>

<template>
  <div
    class="w-screen h-screen flex items-center justify-center overflow-hidden bg-primary"
  >
    <Card
      class="w-[350px] bg-gradient-to-br from-slate-50/10 to-transparent backdrop-blur-lg shadow-lg border border-white/10"
    >
      <CardHeader>
        <CardTitle class="text-white text-xl mb-2"
          >Login to your account</CardTitle
        >
        <CardDescription class="text-slate-300">
          Enter your credentials to access the dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form class="space-y-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email" class="text-slate-200">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              class="bg-slate-100 text-slate-800"
            />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="password" class="text-slate-200">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              class="bg-slate-100 text-slate-800"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter class="flex justify-end gap-2 px-6 pb-6">
        <Button
          variant="outline"
          class="text-slate-600 border-slate-200 hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button class="border">Login</Button>
      </CardFooter>
    </Card>
  </div>
</template>
