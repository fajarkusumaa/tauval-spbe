<template>
  <NuxtLink to="/admin/konfigurasi-asesor">
    <Button>
      <HugeiconsIcon :icon="ArrowLeftIcon" /> Kembali
    </Button>
  </NuxtLink>
  <hr class="my-8 border border-slate-300">
  <h1 class="text-2xl font-bold text-slate-700 mb-6">Tambah Akun Asesor</h1>
  <form @submit.prevent="(e) => saveAsesor(e)" autocomplete="off">
    <Card class="mb-5">
      <CardContent>
        <strong class="mb-3 block">Informasi Asesor</strong>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <Label class="mb-2">Jabatan</Label>
            <Input name="jabatan" placeholder="Masukkan Jabatan" />
          </div>
          <div>
            <Label class="mb-2">Satker</Label>
            <Combobox v-model="value" by="label" class="w-full" name="satker">
              <ComboboxAnchor as-child>
                <ComboboxTrigger as-child>
                  <Button variant="outline" class="justify-between w-full">
                    <span class="flex-1 overflow-x-hidden text-start">
                      {{ value?.label ?? 'Pilih satker' }}
                    </span>

                    <HugeiconsIcon :icon="UnfoldMoreIcon" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </ComboboxTrigger>
              </ComboboxAnchor>

              <ComboboxList class="w-[--reka-popper-anchor-width]">
                <div class="relative items-center">
                  <ComboboxInput class="focus-visible:ring-0 border-0 border-b rounded-none h-10 w-full"
                    placeholder="Pilih satker..." />
                </div>

                <ComboboxEmpty>
                  No framework found.
                </ComboboxEmpty>

                <ComboboxGroup>
                  <ComboboxItem v-for="asesor in refSatkerOptions" :key="asesor.value" :value="asesor">
                    {{ asesor.label }}
                    <ComboboxItemIndicator>
                      <HugeiconsIcon :icon="Tick01Icon" />
                    </ComboboxItemIndicator>
                  </ComboboxItem>
                </ComboboxGroup>
              </ComboboxList>
            </Combobox>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <strong class="mb-3 block">Akun User</strong>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <Label class="mb-2">Nama</Label>
            <Input name="nama" placeholder="Masukkan Nama" />
          </div>
          <div>
            <Label class="mb-2">Email</Label>
            <Input name="email" type="email" placeholder="Masukkan Email" />
          </div>
          <div>
            <Label class="mb-2">Nomor Telepon</Label>
            <Input name="phone" placeholder="Masukkan Nomor Telepon" />
          </div>
          <div>
            <Label class="mb-2">Username</Label>
            <Input name="username" placeholder="Masukkan Username" autocomplete="off" />
          </div>
          <div>
            <Label class="mb-2">Password</Label>
            <Input name="password" type="password" placeholder="Masukkan Password" autocomplete="off" />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <Button type="submit">
            <HugeiconsIcon :icon="FloppyDiskIcon" class="h-4 w-4 shrink-0" />
            Simpan akun asesor baru
          </Button>
        </div>
      </CardContent>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, FloppyDiskIcon, Tick01Icon, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { useToken } from '~/lib/token';
import type { GetSatkerRefResponseT } from '~/types/index.types';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const config = useRuntimeConfig();
const token = useToken();

const { data, status, error } = useFetch<GetSatkerRefResponseT>(`${config.public.apiBase}/ref/satuan-kerja`, {
  headers: {
    Authorization: `Bearer ${token.value}`,
  }
});
const refSatkerOptions = computed(() => data.value?.data.map(item => {
  return {
    value: item.id,
    label: item.nama,
  };
}));

const value = ref<{ label: string, value: string }>();

async function saveAsesor(event: Event) {
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);
  console.log(formData);

  await $fetch(`${config.public.apiBase}/asesors`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      jabatan: formData.get('jabatan') as string,
      nama: formData.get('nama') as string,
      satker_id: value.value?.value,
      user: {
        email: formData.get('email') as string,
        is_active: true,
        name: formData.get('nama') as string,
        password: formData.get('password') as string,
        phone: formData.get('phone') as string,
        role_ids: [
          3
        ],
        satker_id: value.value?.value,
        username: formData.get('username') as string
      }
    })
  });
}
</script>
