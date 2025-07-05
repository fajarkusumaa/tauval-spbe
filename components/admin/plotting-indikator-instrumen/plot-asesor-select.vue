<template>
  <Combobox v-model="value" by="value" class="w-full" @update:model-value="assignAsesor">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="justify-between w-full">
          {{ Boolean(value?.label) ? value.label : 'Pilih asesor' }}
          <HugeiconsIcon :icon="UnfoldMoreIcon" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="w-[--reka-popper-anchor-width]">
      <div class="relative items-center">
        <ComboboxInput class="focus-visible:ring-0 border-0 border-b rounded-none h-10 w-full"
          placeholder="Pilih asesor..." />
      </div>

      <ComboboxEmpty>
        No framework found.
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="asesor in assesorOptions" :key="asesor.value" :value="asesor">
          {{ asesor.label }}
          <ComboboxItemIndicator>
            <HugeiconsIcon :icon="Tick01Icon" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<script setup lang="ts" generic="T">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from '@/components/ui/combobox'
import { Tick01Icon, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import ComboboxInput from '~/components/ui/combobox/ComboboxInput.vue';
import { useToken } from '~/lib/token';
import { toast } from 'vue-sonner';
import type { IndikatorI } from '~/types/instrumen.types';

const props = defineProps<{
  assesorOptions: { label: string, value: string }[] | [];
  indikatorId: number;
  defaultAsesor: IndikatorI['assesor'];
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const config = useRuntimeConfig();
const token = useToken();

const value = toRef({
  label: props.defaultAsesor?.name ?? '',
  value: props.defaultAsesor?.id?.toString() ?? '',
});
const canChange = ref(false);

async function assignAsesor() {
  // isProcessing.value = true;
  // error.value = null;
  // const target = event.target as HTMLFormElement;
  // const formData = new FormData(target);
  if (!value.value) return

  const promise = $fetch(`${config.public.apiBase}/instrumen/assign-asesor`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      assesor_id: parseInt(value.value.value),
      indikator_id: props.indikatorId
    }
  })

  toast.promise(promise, {
    loading: 'Mengupdate...',
    success: () => {

      return 'Berhasil menetapkan asesor'
    },
    error: (err: any) => {
      value.value = { label: "", value: "" }
      return 'Gagal menetapkan asesor' + err.data.error.message
    },
  })
}

// onMounted(() => {
//   if (props.defaultAsesor) {
//     value.value = { label: props.defaultAsesor.name, value: props.defaultAsesor.id.toString() }
//   }
//   canChange.value = true
// })
</script>
