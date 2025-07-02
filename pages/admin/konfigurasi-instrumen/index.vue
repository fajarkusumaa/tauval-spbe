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
                <Button as-child>
                  <NuxtLink :to="`/admin/konfigurasi-instrumen/${i + 1}/edit`">
                    Edit
                  </NuxtLink>
                </Button>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </template>
  </div>
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
</script>
