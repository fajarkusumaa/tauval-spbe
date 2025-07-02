<template>
  <NuxtLink to="/admin/konfigurasi-instrumen">
    <Button><- Kembali</Button>
  </NuxtLink>
  <hr class="my-8 border border-slate-300">
  <div class="mb-3">
    <p class="text-xl mb-3">Edit Kriteria Indikator</p>
    <div class="space-y-1">
      <p class="text-slate-600">
        Domain: <strong>Kebijakan Internal SPBE</strong>
      </p>
      <p class="text-slate-600">
        Indikator: <strong>Tingkat Kematangan Kebijakan Internal Arsitektur SPBE</strong>
      </p>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-4 py-4">
    <Card class="col-span-3">
      <CardContent class="grid grid-cols-3 gap-4">
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
          <Label class="mb-2">Prosentase Bobot</Label>
          <Input type="number" />
        </div>
      </CardContent>
    </Card>
    <Card class="col-span-3">
      <CardContent>
        <div class="col-span-3">
          <div class="flex gap-4">
            <label class="font-semibold w-1/4">Tingkat</label>
            <label class="font-semibold w-3/4">Kriteria</label>
          </div>
          <hr class="my-4">
          <div v-for="(item, index) in kriteria" :key="index" class="flex gap-4 mb-8">
            <label class="font-semibold w-1/4">{{ item.level }}</label>
            <div class="w-3/4">
              <Textarea v-model="item.deskripsi" rows="4" class="bg-slate-50 text-slate-700 p-2"
                placeholder="Tulis kriteria disini..." />
              <div class="items-top flex gap-x-2 mt-3">
                <Checkbox :id="`data-dukung-${item.level}`" v-model="item.needDataDukung" />
                <div class="grid gap-1.5 leading-none">
                  <label :for="`data-dukung-${item.level}`"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Butuh data dukung
                  </label>
                </div>
              </div>
              <template v-if="item.needDataDukung">
                <div class="mt-4">
                  <div class="mb-4 flex justify-between items-center">
                    <label class="font-semibold">Input data dukung</label>
                    <Button size="sm" @click="addDataDukung(index)">Tambah</Button>
                  </div>
                  <template v-for="(dataDukung, ddindex) in item.dataDukung" :key="index">
                    <div class="flex mb-4">
                      <div
                        class="h-9 w-9 flex items-center justify-center bg-slate-50 rounded-md rounded-r-none border border-r-0">
                        {{ ddindex + 1 }}
                      </div>
                      <Input type="file" class="mt-0 rounded-l-none rounded-r-none py-1.75"
                        @change="(e: Event) => onFileSelect(e, index, ddindex)" :key="dataDukung.index" />
                      <Button variant="destructive" class="size-9 rounded-l-none"
                        :disabled="item.dataDukung.length !== ddindex + 1 || item.dataDukung.length === 1" @click="removeDataDukung(index, dataDukung.index)">
                        -
                      </Button>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { data } from 'autoprefixer';
import Checkbox from '~/components/ui/checkbox/Checkbox.vue';

definePageMeta({
  layout: "admin",
});
function addDataDukung(kriteriaIndex: number) {
  const target = kriteria.value[kriteriaIndex]
  target.dataDukung.push({
    index: Math.random() * 1000,
    value: null
  })
}

function removeDataDukung(kriteriaIndex: number, dataIndex: number) {
  const target = kriteria.value[kriteriaIndex]
  target.dataDukung = target.dataDukung.filter((item) => item.index !== dataIndex)
}

function onFileSelect(event: Event, kriteriaIndex: number, dataIndex: number) {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    kriteria.value[kriteriaIndex].dataDukung[dataIndex].value = files[0]
  }
}

const kriteria = ref([
  {
    level: "Level 1", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        value: null as File | null
      }
    ]
  },
  {
    level: "Level 2", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        value: null as File | null
      }
    ]
  },
  {
    level: "Level 3", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        value: null as File | null
      }
    ]
  },
  {
    level: "Level 4", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        value: null as File | null
      }
    ]
  },
  {
    level: "Level 5", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        value: null as File | null
      }
    ]
  },
]);
</script>
