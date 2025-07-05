<template>
  <NuxtLink to="/admin/konfigurasi-instrumen">
    <Button><- Kembali</Button>
  </NuxtLink>
  <hr class="my-8 border border-slate-300" />
  <div class="mb-4">
    <p class="text-xl mb-3">Isi Instrumen</p>
    <div class="space-y-1">
      <p class="text-slate-600">
        Domain: <strong>Kebijakan Internal SPBE</strong>
      </p>
      <p class="text-slate-600">
        Indikator:
        <strong>Tingkat Kematangan Kebijakan Internal Arsitektur SPBE</strong>
      </p>
    </div>
  </div>
  <div>
    <Table class="overflow-x-auto mb-0 overflow-hidden border-separate">
      <TableBody>
        <!-- Table Header -->
        <TableRow class="bg-slate-100 text-sm text-gray-600 hover:bg-gray-200">
          <TableHead class="max-w-24 text-center">Tingkat</TableHead>
          <TableHead class="max-w-32">Kriteria</TableHead>
          <TableHead class="max-w-24 text-center">Capaian</TableHead>
        </TableRow>

        <!-- Table Rows -->
        <TableRow
          v-for="(item, index) in rows"
          :key="index"
          class="hover:bg-muted/200"
        >
          <TableCell
            class="w-24 whitespace-normal rounded-sm bg-white text-center"
          >
            {{ item.tingkat }}
          </TableCell>

          <TableCell class="whitespace-normal rounded-sm bg-white">
            {{ item.kriteria }}
          </TableCell>

          <TableCell class="whitespace-normal rounded-sm bg-white text-center">
            <RadioGroup
              v-model="item.selectedLevel"
              :name="'level-' + index"
              class="flex justify-center gap-2"
            >
              <RadioGroupItem
                v-for="n in 5"
                :key="n"
                :value="String(n)"
                :id="`level-${index}-${n}`"
                class="h-4 w-4"
              />
              <!-- Optional: Add label numbers -->
              <!-- <RadioGroupLabel v-for="n in 5" :key="'label-' + n">{{ n }}</RadioGroupLabel> -->
            </RadioGroup>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";

definePageMeta({
  layout: "admin",
});

const rows = ref([
  { tingkat: "a", kriteria: "b", selectedLevel: null },
  { tingkat: "c", kriteria: "d", selectedLevel: null },
]);

const kriteria = ref([
  {
    level: "Level 1",
    deskripsi: "",
    needDataDukung: false,
    dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: "",
      },
    ],
  },
  {
    level: "Level 2",
    deskripsi: "",
    needDataDukung: false,
    dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: "",
      },
    ],
  },
  {
    level: "Level 3",
    deskripsi: "",
    needDataDukung: false,
    dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: "",
      },
    ],
  },
  {
    level: "Level 4",
    deskripsi: "",
    needDataDukung: false,
    dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: "",
      },
    ],
  },
  {
    level: "Level 5",
    deskripsi: "",
    needDataDukung: false,
    dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: "",
      },
    ],
  },
]);
</script>
