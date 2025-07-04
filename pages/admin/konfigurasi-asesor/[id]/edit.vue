<template>
  <NuxtLink to="/admin/konfigurasi-asesor">
    <Button>
      <HugeiconsIcon :icon="ArrowLeftIcon" /> Kembali
    </Button>
  </NuxtLink>
  <hr class="my-8 border border-slate-300">
  <h1 class="text-2xl font-bold text-slate-700 mb-6">Edit Akun</h1>
  <template v-if="status === 'pending'">
    <LoadingIndicator />
  </template>
  <template v-else>
    <form @submit.prevent="(e) => saveAsesor(e)" autocomplete="off">
      <Card>
        <CardContent>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <Label class="mb-2">Jabatan</Label>
              <Input name="jabatan" :default-value="asesor?.jabatan" placeholder="Masukkan Jabatan" />
            </div>
            <div>
              <Label class="mb-2">Nama</Label>
              <Input name="nama" :default-value="asesor?.nama" placeholder="Masukkan Nama" />
            </div>
          </div>
          <div class="flex justify-between mt-6">
            <div>
            </div>
            <Button type="submit" :disabled="isSubmitting">
              <HugeiconsIcon :icon="FloppyDiskIcon" class="h-4 w-4 shrink-0" v-if="!isSubmitting" />
              <HugeiconsIcon :icon="Loading03Icon" class="h-4 w-4 shrink-0 animate-spin" v-if="isSubmitting" />
              Simpan akun asesor baru
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  </template>

</template>

<script setup lang="ts">
import { ArrowLeftIcon, FloppyDiskIcon, Loading03Icon, Tick01Icon, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { toast } from 'vue-sonner';
import { useToken } from '~/lib/token';
import type { GetAsesorsByIDResponseT } from '~/types/index.types';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const config = useRuntimeConfig();
const token = useToken();
const route = useRoute();


const { data, status, error } = useFetch<GetAsesorsByIDResponseT>(`${config.public.apiBase}/asesors/${route.params.id}`, {
  headers: {
    Authorization: `Bearer ${token.value}`,
  }
});
const asesor = computed(() => data.value?.data);


const value = ref<{ label: string, value: string }>();
const isSubmitting = ref(false);

async function saveAsesor(event: Event) {
  isSubmitting.value = true;
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);

  await $fetch(`${config.public.apiBase}/asesors`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      jabatan: formData.get('jabatan') as string,
      nama: formData.get('nama') as string,
      satker_id: 1,
      user: {
        email: formData.get('email') as string,
        is_active: true,
        name: formData.get('nama') as string,
        password: formData.get('password') as string,
        phone: formData.get('phone') as string,
        role_ids: [
          3
        ],
        satker_id: 1,
        username: formData.get('username') as string
      }
    })
  }).then((res) => {
    isSubmitting.value = false;
    toast.success('Berhasil menambahkan akun asesor baru');
  }).catch((err) => {
    isSubmitting.value = false;
    toast.error('Gagal menambahkan akun asesor baru.');
  })
}
</script>
