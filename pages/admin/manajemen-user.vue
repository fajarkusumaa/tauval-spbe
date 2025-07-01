<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">Manajemen User</h1>

    <!-- Tombol Tambah -->
    <div class="flex justify-end mb-4">
      <Button @click="handleAddUser">+ Tambah User</Button>
    </div>

    <!-- Table ShadVue -->
    <Table class="bg-white rounded shadow-sm">
      <TableHeader>
        <TableRow
          class="hover:bg-slate-800 bg-slate-800 text-slate-50 font-semibold"
        >
          <TableHead class="text-center w-10">#</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead class="text-center"> Role</TableHead>
          <TableHead class="text-center">Status</TableHead>
          <TableHead class="text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="user in users"
          :key="user.id"
          class="hover:bg-muted/50 transition-colors"
        >
          <TableCell class="text-center">{{
            users.indexOf(user) + 1
          }}</TableCell>
          <TableCell>{{ user.name }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell class="capitalize text-center">{{ user.role }}</TableCell>
          <TableCell class="text-center">
            <Badge
              :variant="user.status === 'active' ? 'default' : 'secondary'"
            >
              {{ user.status }}
            </Badge>
          </TableCell>
          <TableCell class="text-center space-x-2">
            <Button variant="outline" size="sm" @click="handleEdit(user)"
              >Edit</Button
            >
            <Button variant="destructive" size="sm" @click="handleDelete(user)">
              Hapus
            </Button>
          </TableCell>
        </TableRow>

        <TableRow v-if="users.length === 0">
          <TableCell colspan="5" class="text-center text-muted-foreground">
            Tidak ada user.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>

  <Dialog
    :open="isDialogOpen"
    @update:open="(val) => (isDialogOpen = val)"
    class="w-4xl"
  >
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
        <Button @click="handleSave">Simpan</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

import { ref } from "vue";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Dialog from "~/components/ui/dialog/Dialog.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const isDialogOpen = ref(false);

const users = ref([
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi@email.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    email: "siti@email.com",
    role: "editor",
    status: "inactive",
  },
]);

const handleAddUser = () => {
  isDialogOpen.value = true;
};

const handleEdit = (user: any) => {
  alert(`Edit user: ${user.name}`);
};

const handleSave = () => {
  // Simulasi penyimpanan data
  alert("Data user telah disimpan.");
  isDialogOpen.value = false;
};

const handleDelete = (user: any) => {
  if (confirm(`Yakin hapus user ${user.name}?`)) {
    users.value = users.value.filter((u) => u.id !== user.id);
  }
};
</script>
