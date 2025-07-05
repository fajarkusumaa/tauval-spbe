<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">
      Plotting Indikator Instrumen
    </h1>

    <LoadingIndicator v-if="fetchInstrumenStatus === 'pending'" />
    <template v-for="(group, index) in instrumenGroups" :key="index">
      <Accordion type="single" collapsible default-value="item-1">
        <AccordionItem value="item-1">
          <!-- domain -->
          <AccordionTrigger
            class="bg-slate-800 text-slate-50 font-semibold rounded-md p-4 w-full hover:no-underline cursor-pointer mb-1 [&_svg]:text-white">
            Domain {{ index + 1 }}: {{ group.nama }}</AccordionTrigger>
          <AccordionContent class="pb-0">
            <!-- accordion aspek -->
            <!-- Loop each Aspek inside this Domain -->
            <template v-for="(aspek, aspekIndex) in group.aspeks" :key="aspekIndex">
              <Accordion type="single" collapsible default-value="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    class="bg-slate-700 text-sm text-white p-4 rounded-md hover:no-underline cursor-pointer mb-1 [&_svg]:text-white">
                    Aspek {{ aspekIndex + 1 }}. {{ aspek.aspek }}</AccordionTrigger>
                  <AccordionContent class="pb-1">
                    <Table class="overflow-x-auto overflow-hidden border-separate">
                      <TableBody>
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
                              <PlotAssesorSelect :assesor-options="assesorOptions ? assesorOptions : []"
                                :indikator-id="item.id" :defaultAsesor="item.assesor" />
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </template>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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
