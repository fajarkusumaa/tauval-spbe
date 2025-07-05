<template>
  <Dialog :open="editState.open" @update:open="(val) => (setEditState({ open: val }))" class="w-4xl">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User</DialogTitle>
        <DialogDescription>Edit informasi user</DialogDescription>
      </DialogHeader>
      <form ref="form" class="" @submit.prevent="(e) => updateUser(e)">
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-3">
            <Label class="mb-2" for="nama">Nama</Label>
            <Input id="nama" name="name" type="text" placeholder="Masukkan nama"
              :default-value="editState.data?.name" />
          </div>
          <div class="mb-3">
            <Label class="mb-2" for="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Masukkan email"
              :default-value="editState.data?.email" />
          </div>
          <div class="mb-3">
            <Label class="mb-2" for="phone">Telephone</Label>
            <Input id="phone" name="phone" type="text" placeholder="Masukkan nomor telepon"
              :default-value="editState.data?.phone" />
          </div>
          <div></div>
          <!-- <div class="mb-3">
            <Label class="mb-2" for="username">Username</Label>
            <Input id="username" name="username" type="text" placeholder="Masukkan nomor telepon" />
          </div>
          <div class="mb-3">
            <Label class="mb-2" for="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Masukkan nomor telepon" />
          </div> -->
          <div class="mb-3">
            <Label class="mb-2" for="role">Role</Label>

            <Select name="role" class="w-full" ref="roleSelect" v-model="roleValue">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent class="w-full">
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <template v-for="role in roleList" :key="role.id">
                    <SelectItem :value="role.id">
                      {{ role.name }}
                    </SelectItem>
                  </template>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="mb-3">
            <Label class="mb-2" for="role">Satker</Label>
            <Combobox v-model="satkerValue" by="value" class="w-full">
              <ComboboxAnchor as-child>
                <ComboboxTrigger as-child>
                  <Button variant="outline" class="justify-between w-full flex">
                    <span class="flex-1 overflow-hidden text-start">
                      {{ Boolean(satkerValue?.label) ? satkerValue?.label : 'Pilih asesor' }}
                    </span>
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
                  <ComboboxItem v-for="asesor in satkerOptions" :key="asesor.value" :value="asesor">
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
      </form>
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">Batal</Button>
        </DialogClose>
        <Button :disabled="isSubmitting" @click="form?.requestSubmit()">
          <HugeiconsIcon :icon="Loading03Icon" class="h-4 w-4 shrink-0 animate-spin" v-if="isSubmitting" />
          <HugeiconsIcon :icon="FloppyDiskIcon" class="h-4 w-4 shrink-0" v-else />
          Simpan
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { FloppyDiskIcon, Loading03Icon, Tick01Icon, UnfoldMoreIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/vue';
import { toast } from 'vue-sonner';
import { useToken } from '~/lib/token';
import { useAPI } from '~/lib/use-api';
import { useManajemenUserStore } from '~/store/manajemen-user-store';
import type { ErrorResponseT, GetRolesResponseT, GetSatkerRefResponseT } from '~/types/index.types';

const emit = defineEmits<{
  success: [void]
}>();

const config = useRuntimeConfig();
const token = useToken();

const { data: roles, status: fetchRoleStatus } = useAPI<GetRolesResponseT>(`${config.public.apiBase}/roles`);
const roleList = computed(() => roles.value?.data);

const { data: satkers, status: fetchSatkerStatus } = useAPI<GetSatkerRefResponseT>(`${config.public.apiBase}/ref/satuan-kerja`);
const satkerOptions = computed(() => satkers.value?.data.map((item) => {
  return {
    label: item.nama,
    value: item.id
  }
}));

const form = useTemplateRef("form");
const satkerValue = ref<{ label: string, value: number }>();

const store = useManajemenUserStore();
const { setEditState } = store;
const { editState } = storeToRefs(store);

const isSubmitting = ref(false);
const error = ref<ErrorResponseT | null>(null);
const roleValue = ref();

watch(() => editState.value, () => {
  roleValue.value = editState.value.data?.roles[0].id;
})

async function updateUser(event: Event) {
  isSubmitting.value = true;
  error.value = null;
  const target = event.target as HTMLFormElement;
  const formData = new FormData(target);
  const promise = $fetch(`${config.public.apiBase}/users/${editState.value?.data?.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: {
      email: formData.get('email') as string,
      is_active: true,
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      role_ids: [
        parseInt(formData.get('role') as string)
      ],
      // satker_id: satkerValue.value?.value,
    }
  })

  toast.promise(promise, {
    loading: 'Memperbarui...',
    success: () => {
      isSubmitting.value = false;
      setTimeout(() => {
        target.reset();
        satkerValue.value = undefined;
      }, 100);
      emit('success');
      setEditState({ open: false });
      return 'Berhasil memperbarui user baru'
    },
    error: (err: any) => {
      isSubmitting.value = false;
      error.value = err.data;
      return 'Gagal memperbarui user baru'
    },
  })
}

</script>
