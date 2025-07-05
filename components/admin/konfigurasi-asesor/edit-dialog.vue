<template>
  <Dialog :open="editState.open" @update:open="(e) => setEditState({ open: e })">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Asesor</DialogTitle>
        <DialogDescription>
          Edit informasi asesor.
        </DialogDescription>
      </DialogHeader>
      <form class="grid gap-4 py-4" ref="form" @submit.prevent="(e) => updateAsesor(e)">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="nama" class="text-right inline-block">
            Nama
          </Label>
          <Input id="nama" name="nama" :default-value="editState.data?.nama" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="kedudukan" class="text-right inline-block">
            Kedudukan dalam tim
          </Label>
          <Input id="kedudukan" name="jabatan" :default-value="editState.data?.jabatan" class="col-span-3" />
        </div>
        <button type="submit" hidden></button>
      </form>
      <DialogFooter>
        <Button type="submit" :disabled="isProcessing" @click="() => formRef?.requestSubmit()">
          <HugeiconsIcon :icon="Loading03Icon" class="animate-spin" v-if="isProcessing" />
          <HugeiconsIcon :icon="FloppyDiskIcon" v-else />
          Simpan
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FloppyDiskIcon, Loading03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { toast } from 'vue-sonner'
import { useToken } from '~/lib/token'
import { useKonfigurasiAsesorStore } from '~/store/konfigurasi-asesor-store'
import type { ErrorResponseT } from '~/types/index.types'


const emit = defineEmits<{
  success: [void]
}>()

const token = useToken()
const config = useRuntimeConfig()

const store = useKonfigurasiAsesorStore()
const { setEditState } = store
const { editState } = storeToRefs(store)

const isProcessing = ref(false);
const error = ref<ErrorResponseT | null>(null);
const formRef = useTemplateRef('form');

async function updateAsesor(event: Event) {
  isProcessing.value = true;
  error.value = null;
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);
  const promise = $fetch(`${config.public.apiBase}/asesors/${editState.value?.data?.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({
      jabatan: formData.get('jabatan') as string,
      nama: formData.get('nama') as string,
    })
  })

  toast.promise(promise, {
    loading: 'Mengupdate...',
    success: () => {
      isProcessing.value = false;
      setTimeout(() => {
        target.reset();
      }, 100);
      emit('success');
      return 'Berhasil mengupdate akun asesor'
    },
    error: (err: any) => {
      isProcessing.value = false;
      error.value = err.data;
      return 'Gagal mengupdate akun asesor'
    },
  })
}
</script>
