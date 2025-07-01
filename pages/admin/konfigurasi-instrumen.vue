<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">
      Konfigurasi Instrumen
    </h1>

    <template v-for="(group, index) in groupedData" :key="index">
      <Table class="bg-white overflow-x-auto mb-4 overflow-hidden">
        <TableBody>
          <!-- Loop Domain Group -->
          <!-- Header Domain -->
          <TableRow
            class="hover:bg-slate-800 bg-slate-800 text-slate-50 font-semibold"
          >
            <TableCell colspan="9">
              Domain {{ index + 1 }} : {{ group.domain }}
            </TableCell>
          </TableRow>

          <!-- Table Header -->
          <TableRow class="bg-gray-200 text-sm text-gray-600 hover:bg-gray-200">
            <TableHead>Indikator</TableHead>
            <TableHead>Penjelasan</TableHead>
            <TableHead>Indeks</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Satker</TableHead>
            <TableHead>Substansi</TableHead>
            <TableHead>Tindak Lanjut 2024</TableHead>
            <TableHead class="text-center">Aksi</TableHead>
          </TableRow>

          <!-- Rows per Indikator -->
          <TableRow
            v-for="(item, i) in group.items"
            :key="i"
            class="hover:bg-muted/200"
          >
            <TableCell>{{ item.indikator }}</TableCell>
            <TableCell>{{ item.penjelasan }}</TableCell>
            <TableCell class="text-center">{{ item.indeks }}</TableCell>
            <TableCell>{{ item.target }}</TableCell>
            <TableCell>{{ item.satker }}</TableCell>
            <TableCell>{{ item.substansi }}</TableCell>
            <TableCell>{{ item.tindakLanjut }}</TableCell>
            <TableCell class="text-center">
              <Button
                size="sm"
                @click="handleEdit(item, group.domain)"
                class="cursor-pointer"
              >
                Edit
              </Button>
            </TableCell>
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
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const isDialogOpen = ref(false);

const selectedItem = ref<any>({
  domain: "",
  indikator: "",
  kriteria: [],
});

const handleEdit = (item: any, domain: string) => {
  selectedItem.value = {
    domain: domain,
    indikator: item.penjelasan, // kamu bisa ganti field ini sesuai kebutuhan
    kriteria: [
      { level: "Level 1", deskripsi: "..." },
      { level: "Level 2", deskripsi: "..." },
      { level: "Level 3", deskripsi: "..." },
      { level: "Level 4", deskripsi: "..." },
      { level: "Level 5", deskripsi: "..." },
    ],
  };
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
    domain: "Kebijakan Internal SPBE",
    items: [
      {
        indikator: "Indikator 1",
        penjelasan: "Tingkat Kematangan Kebijakan Internal Arsitektur SPBE",
        indeks: 3,
        target: 5,
        satker: "PUSDATIN",
        substansi: "SPBE",
        tindakLanjut: "Kepmen Arsitektur 303/M/2024",
      },
      {
        indikator: "Indikator 2",
        penjelasan: "Tingkat Kematangan Kebijakan Internal Peta Rencana SPBE",
        indeks: 3,
        target: 5,
        satker: "PUSDATIN",
        substansi: "SPBE",
        tindakLanjut: "Kepmen Peta Rencana (Draft)",
      },
    ],
  },
  {
    domain: "Tata Kelola Data",
    items: [
      {
        indikator: "Indikator 3",
        penjelasan: "Tingkat Kematangan Kebijakan Internal Manajemen Data",
        indeks: 3,
        target: 4,
        satker: "PUSDATIN",
        substansi: "Data Pendidikan",
        tindakLanjut: "Kepmen Arsitektur SPBE",
      },
      {
        indikator: "Indikator 4",
        penjelasan: "Tingkat Kematangan Kebijakan Internal Audit TIK",
        indeks: 4,
        target: 5,
        satker: "PUSDATIN",
        substansi: "PAKI",
        tindakLanjut: "SK Pendampingan Audit Eksternal (KAPUS)",
      },
    ],
  },
];

watchEffect(() => {
  console.log("isDialogOpen changed to:", isDialogOpen.value);
});
</script>
