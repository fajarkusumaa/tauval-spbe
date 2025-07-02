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
        <div class="col-span-3">
          <Label class="mb-2">Deskripsi</Label>
          <Textarea rows="6" placeholder="Tulis deskripsi indikator disini..."></Textarea>
        </div>
      </CardContent>
    </Card>
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
                <SelectItem value="pusdatin">
                  PUSDATIN
                </SelectItem>
                <SelectItem value="biro-perencanaan">
                  Biro Perencanaan dan Pusdatin
                </SelectItem>
                <SelectItem value="biro-organisasi">
                  Biro Organisasi & Tata Laksana
                </SelectItem>
                <SelectItem value="unitkerja">
                  PUSDATIN & Unit Kerja
                </SelectItem>
                <SelectItem value="itjen">
                  ITJEN
                </SelectItem>
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
                <SelectItem value="data-pendidikan">
                  Data Pendidikan & Data BudBas
                </SelectItem>
                <SelectItem value="paki">
                  PAKI
                </SelectItem>
                <SelectItem value="infra">
                  Infra
                </SelectItem>
                <SelectItem value="data">
                  Data
                </SelectItem>
                <SelectItem value="data">
                  Aplikasi
                </SelectItem>
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
                    <div class="flex mb-4 gap-3">
                      <div class="min-h-9 min-w-9 size-9 flex items-center justify-center bg-slate-50 ">
                        {{ ddindex + 1 }}
                      </div>
                      <div class="w-full">
                        <Label class="mb-2">Nama</Label>
                        <Input type="text" class="mt-0  py-1.75" v-model="item.dataDukung[ddindex].namaFile"
                        :key="dataDukung.index" placeholder="Nama data dukung" />
                      </div>
                      <div class="w-full">
                        <Label class="mb-2">Keterangan</Label>
                        <Input type="text" class="mt-0  py-1.75" v-model="item.dataDukung[ddindex].keterangan"
                          :key="dataDukung.index" placeholder="Beri keterangan" />
                      </div>

                      <Button variant="destructive" class="size-9"
                        :disabled="item.dataDukung.length !== ddindex + 1 || item.dataDukung.length === 1"
                        @click="removeDataDukung(index, dataDukung.index)">
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
import Checkbox from '~/components/ui/checkbox/Checkbox.vue';

definePageMeta({
  layout: "admin",
});
function addDataDukung(kriteriaIndex: number) {
  const target = kriteria.value[kriteriaIndex]
  target.dataDukung.push({
    index: Math.random() * 1000,
    namaFile: "",
    keterangan: ""
  })
}

function removeDataDukung(kriteriaIndex: number, dataIndex: number) {
  const target = kriteria.value[kriteriaIndex]
  target.dataDukung = target.dataDukung.filter((item) => item.index !== dataIndex)
}

const kriteria = ref([
  {
    level: "Level 1", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: ""
      }
    ]
  },
  {
    level: "Level 2", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: ""
      }
    ]
  },
  {
    level: "Level 3", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: ""
      }
    ]
  },
  {
    level: "Level 4", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: ""
      }
    ]
  },
  {
    level: "Level 5", deskripsi: "", needDataDukung: false, dataDukung: [
      {
        index: 1,
        namaFile: "",
        keterangan: ""
      }
    ]
  },
]);
</script>
