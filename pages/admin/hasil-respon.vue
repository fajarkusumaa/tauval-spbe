<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">
      Hasil Respon Instrumen SPBE
    </h1>

    <template v-for="(group, index) in groupedData" :key="index">
      <Table class="overflow-x-auto mb-4 overflow-hidden border-separate">
        <TableBody>
          <!-- Loop Domain Group -->
          <!-- Header Domain -->
          <TableRow
            class="hover:bg-slate-800 bg-slate-800 rounded-md overflow-hidden text-slate-50 font-semibold"
          >
            <TableHead colspan="9">
              Domain {{ index + 1 }} : {{ group.domain }}
            </TableHead>
          </TableRow>

          <!-- Table Header -->
          <TableRow class="bg-gray-200 text-sm text-gray-600 hover:bg-gray-200">
            <TableHead>Indikator</TableHead>
            <TableHead class="text-center">Indeks</TableHead>
            <TableHead class="text-center">Status</TableHead>
            <TableHead class="text-center">Target 2024</TableHead>
            <TableHead>Satker Penanggung Jawab</TableHead>
            <TableHead class="w-4">Progress Pengisian</TableHead>
          </TableRow>

          <!-- Rows per Indikator -->
          <TableRow
            v-for="(item, i) in group.items"
            :key="i"
            class="hover:bg-muted/200"
          >
            <TableCell class="rounded-sm bg-white">{{ item.indikator }}</TableCell>
            <TableCell class="rounded-sm bg-white">{{ item.indeks }}</TableCell>
            <TableCell class="text-center rounded-sm bg-white">{{ item.status }}</TableCell>
            <TableCell class="rounded-sm bg-white">{{ item.target }}</TableCell>
            <TableCell class="rounded-sm bg-white">{{ item.satker }}</TableCell>
            <TableCell class="rounded-sm bg-white">{{ item.progress }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </template>
  </div>

  <Dialog
    :open="isDialogOpen"
    @update:open="(val) => (isDialogOpen = val)"
    class="w-4xl"
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl mb-3">Edit Kriteria Indikator</DialogTitle>
        <div class="space-y-1">
          <p class="text-sm text-slate-600">
            Domain: <strong>{{ selectedItem.domain }}</strong>
          </p>
          <p class="text-sm text-slate-600">
            Indikator: <strong>{{ selectedItem.indikator }}</strong>
          </p>
        </div>
      </DialogHeader>

      <div class="grid gap-4 py-4">
        <div class="flex gap-4 items-center">
          <label class="font-semibold w-1/4">Tingkat</label>
          <label class="font-semibold w-3/4">Kriteria</label>
        </div>
        <div
          v-for="(item, index) in selectedItem.kriteria"
          :key="index"
          class="flex gap-4 items-center"
        >
          <label class="font-semibold w-1/4">{{ item.level }}</label>
          <Textarea
            v-model="item.deskripsi"
            rows="3"
            class="w-3/4 bg-slate-100 text-slate-700 p-2"
          />
        </div>
      </div>

      <DialogFooter>
        <!-- <Button variant="outline" @click="handleClose">Batal</Button> -->
        <Button @click="handleSave">Simpan</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import { ref } from "vue";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const isDialogOpen = ref(false);

const selectedItem = ref<any>({
  domain: "",
  indikator: "",
  kriteria: [],
});

const handleEdit = (item: any, domain: string) => {
  console.log(item);
  isDialogOpen.value = true;
};

const handleClose = () => {
  isDialogOpen.value = false;
  selectedItem.value = null;
};

const handleSave = () => {
  // alert(`Data disimpan untuk indikator: ${selectedItem.value.indikator}`);
  handleClose();
};

// Grouped Data: per domain
const groupedData = [
  {
    domain:
      "Domain 1: Kebijakan Internal SPBE | Aspek 1: Kebijakan Internal Tata Kelola SPBE",
    items: [
      {
        indikator: "Indikator 1",
        indeks: 3,
        status: "Sama",
        target: 5,
        satker: "PUSDATIN",
        progress: 75,
      },
      {
        indikator: "Indikator 2",
        indeks: 3,
        status: "Sama",
        target: 5,
        satker: "PUSDATIN",
        progress: 50,
      },
      {
        indikator: "Indikator 3",
        indeks: 3,
        status: "Turun",
        target: 5,
        satker: "PUSDATIN",
        progress: 55,
      },
      {
        indikator: "Indikator 4",
        indeks: 3,
        status: "Sama",
        target: 4,
        satker: "PUSDATIN",
        progress: 100,
      },
    ],
  },
  {
    domain: "Domain 2: Tata Kelola SPBE | Aspek 2: Perencanaan Strategis SPBE",
    items: [
      {
        indikator: "Indikator 11",
        indeks: 4,
        status: "Turun",
        target: 3,
        satker: "PUSDATIN",
        progress: 75,
      },
      {
        indikator: "Indikator 12",
        indeks: 5,
        status: "Sama",
        target: 5,
        satker: "PUSDATIN",
        progress: 50,
      },
      {
        indikator: "Indikator 13",
        indeks: 2,
        status: "Naik",
        target: 2,
        satker: "Biro Perencanaan dan Pusdatin",
        progress: 55,
      },
      {
        indikator: "Indikator 14",
        indeks: 5,
        status: "Naik",
        target: 5,
        satker: "Biro Organisasi & Tata Laksana",
        progress: 75,
      },
    ],
  },
];

watchEffect(() => {
  console.log("isDialogOpen changed to:", isDialogOpen.value);
});
</script>
