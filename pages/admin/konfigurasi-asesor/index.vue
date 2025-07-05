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
          <!-- <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md">Satker</TableHead> -->
          <TableHead class="p-2 text-center bg-slate-800 text-white rounded-md w-32">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="status === 'pending'">
          <TableRow>
            <TableCell colspan="9" class="text-center text-muted-foreground">
              <div class="flex items-center justify-center gap-1">
                <HugeiconsIcon :icon="Loading03Icon" class="animate-spin" /> Memuat...
              </div>
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="status === 'error'">
          <TableRow>
            <TableCell colspan="9" class="text-center text-muted-foreground">
              <div class="flex items-center justify-center gap-1 text-destructive">
                <HugeiconsIcon :icon="CancelCircleHalfDotIcon" /> Galat...
              </div>
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
              <TableCell class="text-center flex justify-center gap-2">
                <Button class="size-9" variant="outline" @click="() => setEditState({ open: true, data: item })">
                  <HugeiconsIcon :icon="Pen01Icon" />
                </Button>
                <Button class="size-9" variant="destructive" @click="() => setDeleteState({ open: true, data: item })">
                  <HugeiconsIcon :icon="Delete02Icon" />
                </Button>
              </TableCell>
            </TableRow>
          </template>
        </template>
      </TableBody>
    </Table>
  </div>
  <DeleteDialog @success="() => refresh()" />
  <EditDialog @success="() => refresh()" />
</template>

<script setup lang="ts">
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { GetAsesorsResponseT } from "~/types/index.types";
import { useToken } from "~/lib/token";
import { HugeiconsIcon } from "@hugeicons/vue";
import { CancelCircleHalfDotIcon, Delete02Icon, Loading03Icon, MoreHorizontalSquare01Icon, Pen01Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { useKonfigurasiAsesorStore } from "~/store/konfigurasi-asesor-store";
import DeleteDialog from "~/components/admin/konfigurasi-asesor/delete-dialog.vue";
import EditDialog from "~/components/admin/konfigurasi-asesor/edit-dialog.vue";
import { useAPI } from "~/lib/use-api";

definePageMeta({
  layout: "admin",
  middleware: 'auth',
});

const config = useRuntimeConfig();
const token = useToken()

const store = useKonfigurasiAsesorStore()
const { setDeleteState, setEditState } = store

const { data, status, error, refresh } = useAPI<GetAsesorsResponseT>(`${config.public.apiBase}/asesors`);

const assesors = computed(() => data.value?.data);
</script>
