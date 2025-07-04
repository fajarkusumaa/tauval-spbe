<template>
  <Combobox v-model="value" by="label" class="w-full">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="justify-between w-full">
          {{ value?.label ?? 'Pilih asesor' }}

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

defineProps<{
  assesorOptions: { label: string, value: string }[] | []
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()


const value = ref<{ label: string, value: string }>()
</script>
