<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">
      Konfigurasi Instrumen
    </h1>

    <template v-for="(group, index) in groupedData" :key="index">
      <Table class="overflow-x-auto mb-4 overflow-hidden border-separate">
        <TableBody>
          <!-- Header Domain (1x saja per domain) -->
          <TableRow class="hover:bg-slate-800 text-slate-50 font-semibold rounded-sm">
            <TableCell colspan="9" class="bg-slate-800 rounded-sm">
              Domain {{ index + 1 }}: {{ group.domain.nama }}
            </TableCell>
          </TableRow>

          <!-- Loop each Aspek inside this Domain -->
          <template v-for="(aspek, aspekIndex) in group.domain.aspek" :key="aspekIndex">
            <!-- Header Aspek -->
            <TableRow class="text-slate-50 font-semibold">
              <TableCell colspan="9" class="hover:bg-slate-700 bg-slate-600 rounded-sm">
                Aspek {{ aspekIndex + 1 }}. {{ aspek.nama }}
              </TableCell>
            </TableRow>

            <!-- Table Header -->
            <TableRow class="bg-slate-100 text-sm text-gray-600 hover:bg-gray-200">
              <TableHead>Indikator</TableHead>
              <TableHead class="w-8/12">Penjelasan</TableHead>
              <TableHead class="text-center">Indeks 2024</TableHead>
              <TableHead class="text-center">Target</TableHead>
              <TableHead class="text-center">Satker</TableHead>
              <TableHead>Substansi</TableHead>
              <TableHead class="w-4">Tindak Lanjut 2024</TableHead>
              <TableHead class="text-center">Aksi</TableHead>
            </TableRow>

            <!-- Rows per Indikator -->
            <TableRow v-for="(item, i) in aspek.items" :key="i" class="hover:bg-muted/200">
              <TableCell class="rounded-sm bg-white">{{
                item.indikator
              }}</TableCell>
              <TableCell class="rounded-sm bg-white">{{
                item.penjelasan
              }}</TableCell>
              <TableCell class="rounded-sm bg-white text-center">{{
                item.indeks
              }}</TableCell>
              <TableCell class="rounded-sm bg-white text-center">{{
                item.target
              }}</TableCell>
              <TableCell class="rounded-sm bg-white">{{
                item.satker
              }}</TableCell>
              <TableCell class="rounded-sm bg-white text-center">{{
                item.substansi
              }}</TableCell>
              <TableCell class="rounded-sm bg-white w-4 text-wrap">{{
                item.tindakLanjut
              }}</TableCell>
              <TableCell class="rounded-sm bg-white text-center">
                <Button size="sm" @click="handleEdit(item, group.domain.nama)" class="cursor-pointer">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </template>
  </div>

  <Dialog :open="isDialogOpen" @update:open="(val) => (isDialogOpen = val)">
    <DialogContent class="min-w-4xl">
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

      <div class="grid grid-cols-3 gap-4 py-4">
        <div class="col-span-1">
          <Label class="mb-2">Satker</Label>
          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Pilih Satker" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="satker"> Satker </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="col-span-1">
          <Label class="mb-2">Asesor</Label>
          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Pilih Asesor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="substansi"> SPBE </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="col-span-1">
          <Label class="mb-2">Prosentase Bobot</Label>
          <Input type="number" />
        </div>
        <div class="col-span-3 mt-8">
          <div class="flex gap-4 items-center">
            <label class="font-semibold w-1/4">Tingkat</label>
            <label class="font-semibold w-3/4">Kriteria</label>
          </div>
          <div v-for="(item, index) in selectedItem.kriteria" :key="index" class="flex gap-4 items-center mb-4">
            <label class="font-semibold w-1/4">{{ item.level }}</label>
            <Textarea v-model="item.deskripsi" rows="3" class="w-3/4 bg-slate-100 text-slate-700 p-2" />
          </div>
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
  // selectedItem.value = null;
};

const handleSave = () => {
  // alert(`Data disimpan untuk indikator: ${selectedItem.value.indikator}`);
  handleClose();
};

// Grouped Data: per domain
const groupedData = [
  {
    domain: {
      nama: "Kebijakan Internal SPBE",
      aspek: [
        {
          nama: "Kebijakan Internal Tata Kelola",
          items: [
            {
              indikator: "Indikator 1",
              penjelasan:
                "Tingkat Kematangan Kebijakan Internal Arsitektur SPBE",
              indeks: 3,
              target: 5,
              satker: "PUSDATIN",
              substansi: "SPBE",
              tindakLanjut: "Kepmen Arsitektur 303/M/2024",
            },
            {
              indikator: "Indikator 2",
              penjelasan:
                "Tingkat Kematangan Kebijakan Internal Peta Rencana SPBE",
              indeks: 3,
              target: 5,
              satker: "PUSDATIN",
              substansi: "SPBE",
              tindakLanjut: "Kepmen Peta Rencana (Draft) 2024 2025",
            },
          ],
        },
        {
          nama: "Perencanaan Strategis SPBE",
          items: [
            {
              indikator: "Indikator 1",
              penjelasan:
                "Tingkat Kematangan Kebijakan Internal Arsitektur SPBE",
              indeks: 3,
              target: 5,
              satker: "PUSDATIN",
              substansi: "SPBE",
              tindakLanjut: "Kepmen Arsitektur 303/M/2024",
            },
            {
              indikator: "Indikator 2",
              penjelasan:
                "Tingkat Kematangan Kebijakan Internal Peta Rencana SPBE",
              indeks: 3,
              target: 5,
              satker: "PUSDATIN",
              substansi: "SPBE",
              tindakLanjut: "Kepmen Peta Rencana (Draft)",
            },
          ],
        },
      ],
    },
  },
];

watchEffect(() => {
  console.log("isDialogOpen changed to:", isDialogOpen.value);
});
</script>
