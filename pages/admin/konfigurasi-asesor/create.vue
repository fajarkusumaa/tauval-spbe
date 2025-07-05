<template>
  <NuxtLink to="/admin/konfigurasi-asesor">
    <Button>
      <HugeiconsIcon :icon="ArrowLeftIcon" /> Kembali
    </Button>
  </NuxtLink>
  <hr class="my-8 border border-slate-300">
  <h1 class="text-2xl font-bold text-slate-700 mb-6">Tambah Akun Asesor</h1>
  <Alert variant="destructive" class="border-destructive bg-destructive/10 mb-4" v-if="error">
    <AlertTitle>Galat!</AlertTitle>
    <AlertDescription>
      {{ error?.error.message.join(', ') }}
    </AlertDescription>
  </Alert>
  <form @submit.prevent="(e) => saveAsesor(e)" autocomplete="off">
    <Card>
      <CardContent>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <Label class="mb-2">Kedudukan dalam tim</Label>
            <Input name="jabatan" placeholder="Masukkan kedudukan dalam tim" required :disabled="isSubmitting" />
          </div>
          <div>
            <Label class="mb-2">Nama</Label>
            <Input name="nama" placeholder="Masukkan Nama" required :disabled="isSubmitting" />
          </div>
          <div>
            <Label class="mb-2">Email</Label>
            <Input name="email" type="email" placeholder="Masukkan Email" required :disabled="isSubmitting" />
          </div>
          <div>
            <Label class="mb-2">Nomor Telepon</Label>
            <Input name="phone" placeholder="Masukkan Nomor Telepon" required :disabled="isSubmitting" />
          </div>
          <div>
            <Label class="mb-2">Username</Label>
            <Input name="username" placeholder="Masukkan Username" autocomplete="off" required
              :disabled="isSubmitting" />
          </div>
          <div>
            <Label class="mb-2">Password</Label>
            <Input name="password" type="password" placeholder="Masukkan Password" autocomplete="off" required
              :disabled="isSubmitting" />
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
import type { ErrorResponseT } from '~/types/index.types';

definePageMeta({
  middleware: 'auth',
  layout: 'admin',
})

const config = useRuntimeConfig();
const token = useToken();

const isSubmitting = ref(false);
const error = ref<ErrorResponseT | null>(null);

async function saveAsesor(event: Event) {
  isSubmitting.value = true;
  error.value = null; 
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);
  const promise = $fetch(`${config.public.apiBase}/asesors`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      jabatan: formData.get('jabatan') as string,
      nama: formData.get('nama') as string,
      user: {
        email: formData.get('email') as string,
        is_active: true,
        name: formData.get('nama') as string,
        password: formData.get('password') as string,
        phone: formData.get('phone') as string,
        role_ids: [
          3
        ],
        // satker_id: 0,
        username: formData.get('username') as string
      }
    })
  })

  toast.promise(promise, {
    loading: 'Menyimpan...',
    success: () => {
      isSubmitting.value = false;
      setTimeout(() => {
        target.reset();
      }, 100);
      return 'Berhasil menambahkan akun asesor baru'
    },
    error: (err: any) => {
      isSubmitting.value = false;
      error.value = err.data;
      return 'Gagal menambahkan akun asesor baru'
    },
  })
}
</script>
