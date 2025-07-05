<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">
      Konfigurasi Instrumen
    </h1>
    <LoadingIndicator v-if="fetchInstrumenStatus === 'pending'" />
    <template v-for="(group, index) in instrumenGroups" :key="index">
      <div class="mb-4">
        <!-- accordion domain -->
        <Accordion type="single" collapsible default-value="item-1">
          <AccordionItem value="item-1">
            <!-- nama domain -->
            <AccordionTrigger
              class="bg-slate-800 text-slate-50 font-semibold rounded-md p-4 w-full hover:no-underline cursor-pointer mb-1 [&_svg]:text-white"
            >
              Domain {{ index + 1 }}: {{ group.nama }}
            </AccordionTrigger>
            <!-- domain content -->
            <AccordionContent class="pb-0">
              <!-- Loop each Aspek inside this Domain -->
              <template
                v-for="(aspek, aspekIndex) in group.aspeks"
                :key="aspekIndex"
              >
                <!-- accordion aspek -->
                <Accordion type="single" collapsible default-value="item-1">
                  <AccordionItem value="item-1">
                    <!-- nama aspek -->
                    <AccordionTrigger
                      class="bg-slate-700 text-sm text-white p-4 rounded-md hover:no-underline cursor-pointer mb-1 [&_svg]:text-white"
                    >
                      Aspek {{ aspekIndex + 1 }}. {{ aspek.aspek }}
                    </AccordionTrigger>
                    <!-- list aspek -->
                    <AccordionContent class="pb-1">
                      <Table
                        class="overflow-x-auto mb-0 overflow-hidden border-separate"
                      >
                        <TableBody>
                          <!-- Table Header -->
                          <TableRow
                            class="bg-slate-100 text-sm text-gray-600 hover:bg-gray-200"
                          >
                            <TableHead class="max-w-32">Indikator</TableHead>
                            <TableHead class="max-w-32">Penjelasan</TableHead>
                            <TableHead class="max-w-24 text-center"
                              >Indeks 2024</TableHead
                            >
                            <TableHead class="max-w-24 text-center"
                              >Target</TableHead
                            >
                            <TableHead class="max-w-24 text-center"
                              >Satker</TableHead
                            >
                            <!-- <TableHead>Substansi</TableHead> -->
                            <!-- <TableHead class="w-4">Tindak Lanjut 2024</TableHead> -->
                            <TableHead class="max-w-24 text-center"
                              >Aksi</TableHead
                            >
                          </TableRow>

                          <!-- Rows per Indikator -->
                          <TableRow
                            v-for="(item, i) in aspek.indikators"
                            :key="i"
                            class="hover:bg-muted/200"
                          >
                            <TableCell
                              class="max-w-64 whitespace-normal rounded-sm bg-white"
                              >{{ item.indikator }}</TableCell
                            >
                            <TableCell
                              class="max-w-64 whitespace-normal rounded-sm bg-white"
                              >{{ item.indikator }}</TableCell
                            >
                            <TableCell
                              class="max-w-24 whitespace-normal rounded-sm bg-white text-center"
                              >{{ item.index_before }}</TableCell
                            >
                            <TableCell
                              class="max-w-24 whitespace-normal rounded-sm bg-white text-center"
                              >{{ item.index_target }}</TableCell
                            >
                            <TableCell
                              class="max-w-24 whitespace-normal rounded-sm bg-white"
                              >{{ item.satker?.name }}
                            </TableCell>
                            <!-- <TableCell class="max-w-64 whitespace-normal rounded-sm bg-white text-center">{{
            item.substansi
          }}</TableCell> -->

                            <TableCell
                              class="max-w-64 whitespace-normal rounded-sm bg-white text-center"
                            >
                              <Button as-child>
                                <NuxtLink
                                  :to="`/admin/pengisian-instrumen/${
                                    i + 1
                                  }/submit`"
                                >
                                  Isi
                                </NuxtLink>
                              </Button>
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
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { GetInstrumenResponseT } from "~/types/index.types";
import { useToken } from "~/lib/token";

const config = useRuntimeConfig();
const token = useToken();

const { data: instrumens, status: fetchInstrumenStatus } =
  useFetch<GetInstrumenResponseT>(
    `${config.public.apiBase}/instrumen/indikator`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }
  );
const instrumenGroups = computed(() => instrumens.value?.data);
</script>
