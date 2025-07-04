<template>
  <NuxtLink to="/admin/konfigurasi-asesor">
    <Button>
      <HugeiconsIcon :icon="ArrowLeftIcon" /> Kembali
    </Button>
  </NuxtLink>
  <hr class="my-8 border border-slate-300">
  <h1 class="text-2xl font-bold text-slate-700 mb-6">Tambah Akun Asesor</h1>
  <form @submit.prevent="(e) => saveAsesor(e)" autocomplete="off">
    <Card>
      <CardContent>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <Label class="mb-2">Kedudukan dalam tim</Label>
            <Input name="jabatan" placeholder="Kedudukan dalam tim" />
          </div>
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

<script setup lang="ts">
import { ArrowLeftIcon, FloppyDiskIcon, Loading03Icon, Tick01Icon, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { toast } from 'vue-sonner';
import { useToken } from '~/lib/token';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const config = useRuntimeConfig();
const token = useToken();

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
