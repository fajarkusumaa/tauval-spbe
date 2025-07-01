<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700">Dashboard Admin</h1>

    <div class="wrapper min-h-screen">
      <div class="container mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Pie Chart -->
        <div>
          <div class="title mb-2 font-bold text-primary">Indeks SPBE</div>
          <Card>
            <CardContent>
              <div class="h-[400px]">
                <client-only>
                  <VChart :option="chartOption" autoresize />
                </client-only>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div class="title mb-2 font-bold text-primary">
            Indeks Domain Kebijakan
          </div>
          <Card>
            <CardContent>
              <div class="h-[400px]">
                <client-only>
                  <VChart :option="chartOption" autoresize />
                </client-only>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div class="title mb-2 font-bold text-primary">
            Indeks Domain Kebijakan
          </div>
          <Card>
            <CardContent>
              <div class="h-[400px]">
                <client-only>
                  <VChart :option="chartOption" autoresize />
                </client-only>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div class="title mb-2 font-bold text-primary">
            Indeks Domain Kebijakan
          </div>
          <Card>
            <CardContent>
              <div class="h-[400px]">
                <client-only>
                  <VChart :option="chartOption" autoresize />
                </client-only>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

import { Card, CardContent } from "@/components/ui/card";

import { ref } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { RadarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";

use([
  CanvasRenderer,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

// Pie Chart Option
const chartOption = {
  legend: {
    data: ["Index"],
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "Layanan", max: 5 },
      { name: "Layanan", max: 5 },
      { name: "Layanan", max: 5 },
      { name: "Layanan", max: 5 },
    ],
  },
  series: [
    {
      name: "Chart",
      type: "radar",
      data: [
        {
          value: [4, 4.1, 3.6, 4],
          name: "Index",
        },
      ],
    },
  ],
};
</script>
