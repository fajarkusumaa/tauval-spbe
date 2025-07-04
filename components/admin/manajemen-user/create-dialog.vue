<template>
  <Dialog :open="createState.open" @update:open="(val) => (setCreateState({ open: val }))" class="w-4xl">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl mb-3">Tambah User</DialogTitle>
      </DialogHeader>

      <div class="grid gap-4 pb-4">
        <div class="flex gap-4 items-center">
          <div class="grid w-2/3 max-w-sm items-center gap-1.5">
            <Label for="nama">Nama</Label>
            <Input id="nama" type="text" placeholder="Masukkan nama" />
          </div>
          <div class="grid w-1/3 max-w-sm items-center gap-1.5">
            <Label for="role">Role</Label>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin"> Admin </SelectItem>
                  <SelectItem value="common"> Common User </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <DialogFooter>
        <!-- <Button variant="outline" @click="handleClose">Batal</Button> -->
        <Button>Simpan</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { useManajemenUserStore } from '~/store/manajemen-user-store';

const store = useManajemenUserStore()
const { setCreateState } = store
const { createState } = storeToRefs(store)
</script>
