<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">Konfigurasi Asesor</h1>
    <Alert variant="destructive" class="border-destructive bg-destructive/10 mb-4" v-if="error">
      <AlertTitle>Galat!</AlertTitle>
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>
    <!-- Tombol Tambah -->
    <div class="flex justify-end mb-4">

      <Button as-child>
        <NuxtLink to="/admin/konfigurasi-asesor/create">
          <HugeiconsIcon :icon="PlusSignIcon" /> Tambah Assesor
        </NuxtLink>
      </Button>
    </div>
    <!-- Table ShadVue -->
    <Table class="rounded shadow-sm border-separate table-auto">
      <TableHeader class="rounded-lg overflow-hidden bg-primary">
        <TableRow class="bg-primary rounded-lg overflow-hidden">
          <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md w-10">No</TableHead>
          <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md">Nama</TableHead>
          <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md">User</TableHead>
          <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md">Jabatan</TableHead>
          <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md">Satker</TableHead>
          <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="status === 'pending'">
          <TableRow>
            <TableCell colspan="9" class="text-center text-muted-foreground">
              Memuat...
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="status === 'error'">
          <TableRow>
            <TableCell colspan="9" class="text-center text-muted-foreground">
              Error...
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="status === 'success'">
          <template v-if="!assesors">
            <TableRow>
              <TableCell colspan="9" class="text-center text-muted-foreground">
                Tidak ada data.
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow v-for="item in assesors" :key="item.id" class="hover:bg-muted/50 transition-colors">
              <TableCell class="text-center">{{ assesors.indexOf(item) + 1 }}</TableCell>
              <TableCell class="text-center">
                {{ item.nama }}
              </TableCell>
              <TableCell class="text-center">
                <span class="bg-slate-100 rounded-full px-2 py-0.5 inline-block cursor-pointer">{{ item.user.username
                  }}</span>
              </TableCell>
              <TableCell class="text-center">
                <span>{{ item.jabatan }}</span>
              </TableCell>
              <TableCell class="text-center">
                <span>{{ item.user.satker.Nama }}</span>
              </TableCell>
              <TableCell class="text-center">
                <span>{{ item.user.satker.Nama }}</span>
              </TableCell>
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>
  </div>

  <Dialog :open="isDialogOpen" @update:open="(val) => (isDialogOpen = val)" class="w-4xl">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl mb-3">Tambah User</DialogTitle>
      </DialogHeader>

      <div class="grid gap-4 pb-4">
        <div class="flex gap-4 items-center">
          <div class="grid w-2/3 max-w-sm items-center gap-1.5">
            <Label for="nama">Nama</Label>
            <Input id="nama" type="text" placeholder="Masukkan nama" />
          </div>
          <div class="grid w-1/3 max-w-sm items-center gap-1.5">
            <Label for="role">Role</Label>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin"> Admin </SelectItem>
                  <SelectItem value="common"> Common User </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button @click="handleSave">Simpan</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: 'auth',
});

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Dialog from "~/components/ui/dialog/Dialog.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { GetAsesorsResponseT } from "~/types/index.types";
import { useToken } from "~/lib/token";
import { HugeiconsIcon } from "@hugeicons/vue";
import { PlusSignIcon } from "@hugeicons/core-free-icons";

const config = useRuntimeConfig();
const token = useToken()

const { data, status, error } = useFetch<GetAsesorsResponseT>(`${config.public.apiBase}/asesors`, {
  headers: {
    Authorization: `Bearer ${token.value}`,
  }
});
const assesors = computed(() => data.value?.data);

const isDialogOpen = ref(false);
const handleAddUser = () => {
  isDialogOpen.value = true;
};

const handleEdit = (user: any) => {
  alert(`Edit user: ${user.name}`);
};

const handleSave = () => {
  // Simulasi penyimpanan data
  alert("Data user telah disimpan.");
  isDialogOpen.value = false;
};
</script>
