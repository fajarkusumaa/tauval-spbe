<template>
  <AlertDialog :open="deleteState.open" @update:open="(e) => setDeleteState({ open: e })">
    <AlertDialogContent class="w-xs">
      <AlertDialogHeader>
        <div class="mx-auto bg-yellow-100 p-2 rounded-md border border-yellow-400">
          <HugeiconsIcon :icon="Alert02Icon" class="text-yellow-700" />
        </div>
        <AlertDialogTitle class="text-center">Apakah anda yakin?</AlertDialogTitle>
      </AlertDialogHeader>
      <div class="text-center mb-3 w-3/4 mx-auto">
        <p>Anda akan menghapus asesor: <strong>{{ deleteState.data?.nama }}</strong></p>
      </div>
      <AlertDialogFooter class="flex sm:flex-row sm:justify-center">
        <AlertDialogAction class="w-1/2 cursor-pointer" @click="deleteAsesor">Hapus</AlertDialogAction>
        <AlertDialogCancel class="w-1/2 cursor-pointer">Batal</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { Alert02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { toast } from 'vue-sonner';
import { useToken } from '~/lib/token';
import { useKonfigurasiAsesorStore } from '~/store/konfigurasi-asesor-store';

const token = useToken();
const config = useRuntimeConfig();

const store = useKonfigurasiAsesorStore();
const { setDeleteState } = store;
const { deleteState } = storeToRefs(store);

const isProcessing = ref(false);

async function deleteAsesor(event: Event) {
  isProcessing.value = true;

  const promise = $fetch(`${config.public.apiBase}/asesors/${deleteState.value?.data?.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })


  toast.promise(promise, {
    loading: 'Menghapus...',
    success: () => {
      isProcessing.value = false;
      return 'Berhasil menghapus akun asesor'
    },
    error: (err: any) => {
      isProcessing.value = false;
      return 'Gagal menghapus akun asesor'
    },
  })
}
</script>
