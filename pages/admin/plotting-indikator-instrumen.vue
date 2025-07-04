<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">
      Plotting Indikator Instrumen
    </h1>

    <LoadingIndicator v-if="fetchInstrumenStatus === 'pending'" />
    <template v-for="(group, index) in instrumenGroups" :key="index">
      <Table class="overflow-x-auto mb-8 overflow-hidden border-separate">
        <TableBody>
          <!-- Header Domain (1x saja per domain) -->
          <TableRow class="hover:bg-slate-800 text-slate-50 font-semibold rounded-sm">
            <TableCell colspan="9" class="bg-slate-800 rounded-sm">
              Domain {{ index + 1 }}: {{ group.nama }}
            </TableCell>
          </TableRow>

          <!-- Loop each Aspek inside this Domain -->
          <template v-for="(aspek, aspekIndex) in group.aspeks" :key="aspekIndex">
            <!-- Header Aspek -->
            <TableRow class="text-slate-50 font-semibold">
              <TableCell colspan="9" class="hover:bg-slate-700 bg-slate-600 rounded-sm">
                Aspek {{ aspekIndex + 1 }}. {{ aspek.aspek }}
              </TableCell>
            </TableRow>

            <!-- Table Header -->
            <TableRow class="bg-slate-100 text-sm text-gray-600 hover:bg-gray-200">
              <TableHead class="max-w-32">Indikator</TableHead>
              <TableHead class="max-w-32 ">Penjelasan</TableHead>
              <TableHead class="max-w-18 text-center">Aksi</TableHead>
            </TableRow>

            <!-- Rows per Indikator -->
            <TableRow v-for="(item, i) in aspek.indikators" :key="i" class="hover:bg-muted/200">
              <TableCell class="max-w-32 whitespace-normal rounded-sm bg-white">
                <div>
                  {{ item.indikator }}
                </div>
              </TableCell>
              <TableCell class="max-w-32 whitespace-normal rounded-sm bg-white">
                <div>
                  {{ item.indikator }}
                </div>
              </TableCell>
              <TableCell class="max-w-18 whitespace-normal rounded-sm bg-white text-center">
                <div>
                  <PlotAssesorSelect :assesor-options="assesorOptions ? assesorOptions : []" />
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useToken } from "~/lib/token";
import type { GetAsesorsResponseT, GetInstrumenResponseT } from "~/types/index.types";
import PlotAssesorSelect from "~/components/admin/plotting-indikator-instrumen/plot-asesor-select.vue";

definePageMeta({
  layout: "admin",
  middleware: 'auth',
});

const config = useRuntimeConfig();
const token = useToken();

// daftar asesor
const { data: asesors } = useFetch<GetAsesorsResponseT>(`${config.public.apiBase}/asesors`, {
  headers: {
    Authorization: `Bearer ${token.value}`,
  }
});
const assesorOptions = computed(() => asesors.value?.data.map(item => {
  return {
    label: item.nama,
    value: item.id.toString()
  }
}));

// instrumen
const { data: instrumens, status: fetchInstrumenStatus } = useFetch<GetInstrumenResponseT>(`${config.public.apiBase}/instrumen/indikator`, {
  headers: {
    Authorization: `Bearer ${token.value}`,
  }
});
const instrumenGroups = computed(() => instrumens.value?.data);
</script>
