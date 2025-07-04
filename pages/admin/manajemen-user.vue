<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-700 mb-6">Manajemen User</h1>

    <!-- Tombol Tambah -->
    <div class="flex justify-end mb-4">
      <Button @click="() => setCreateState({ open: true })">
        <HugeiconsIcon :icon="PlusSignIcon" /> Tambah User
      </Button>
    </div>
    <!-- Table ShadVue -->
    <Table class="border-separate">
      <TableHeader class="!bg-transparent">
        <TableRow class="text-slate-50 font-semibold">
          <TableHead class="text-center w-10 p-0">
            <div class="bg-slate-800 text-white rounded-sm h-full w-full flex justify-center items-center">
              No
            </div>
          </TableHead>
          <TableHead class="p-0">
            <div class="bg-slate-800 text-white rounded-sm h-full w-full flex justify-center items-center">
              Nama
            </div>
          </TableHead>
          <TableHead class="p-0">
            <div class="bg-slate-800 text-white rounded-sm h-full w-full flex justify-center items-center">
              Email
            </div>
          </TableHead>
          <TableHead class="text-center p-0">
            <div class="bg-slate-800 text-white rounded-sm h-full w-full flex justify-center items-center">
              Role
            </div>
          </TableHead>
          <TableHead class="text-center p-0">
            <div class="bg-slate-800 text-white rounded-sm h-full w-full flex justify-center items-center">
              Status
            </div>
          </TableHead>
          <TableHead class="text-center p-0">
            <div class="bg-slate-800 text-white rounded-sm h-full w-full flex justify-center items-center">
              Aksi
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="status === 'pending'">
          <TableRow>
            <TableCell colspan="9" class="text-center text-muted-foreground">
              <div class="flex items-center justify-center gap-1">
                <HugeiconsIcon :icon="Loading03Icon" class="animate-spin" /> Memuat...
              </div>
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="status === 'error'">
          <TableRow>
            <TableCell colspan="9" class="text-center text-muted-foreground">
              <div class="flex items-center justify-center gap-1 text-destructive">
                <HugeiconsIcon :icon="CancelCircleHalfDotIcon" /> Galat...
              </div>
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="status === 'success'">
          <TableRow v-for="(user, index) in usersList" :key="user.id" class="hover:bg-muted/50 transition-colors">
            <TableCell class="text-center">{{ index + 1 }}</TableCell>
            <TableCell>{{ user.name }}</TableCell>
            <TableCell>{{ user.email }}</TableCell>
            <TableCell class="capitalize text-center">
              <template v-for="role in user.roles" :key="role.id">
                <Badge variant="outline">{{ role.name }}</Badge>
              </template>
            </TableCell>
            <TableCell class="text-center">
              <Badge :variant="user.is_active ? 'default' : 'secondary'">
                {{ user.is_active ? "Aktif" : "Tidak Aktif" }}
              </Badge>
            </TableCell>
            <TableCell class="text-center space-x-2">
              <Button variant="outline" size="sm" @click="handleEdit(user)">Edit</Button>
              <Button variant="destructive" size="sm">
                Hapus
              </Button>
            </TableCell>
          </TableRow>

          <TableRow v-if="usersList?.length === 0">
            <TableCell colspan="5" class="text-center text-muted-foreground">
              Tidak ada user.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>

    <CreateDialog />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

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
import { CancelCircleHalfDotIcon, Loading03Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import type { GetUsersResponseT } from "~/types/index.types";
import { useToken } from "~/lib/token";
import { useManajemenUserStore } from "~/store/manajemen-user-store";
import CreateDialog from "~/components/admin/manajemen-user/create-dialog.vue";

const config = useRuntimeConfig();
const token = useToken();

const store = useManajemenUserStore()
const { setCreateState } = store
const { createState } = storeToRefs(store)

const { data: users, status } = useFetch<GetUsersResponseT>(`${config.public.apiBase}/users`, {
  headers: {
    Authorization: `Bearer ${token.value}`,
  }
});
const usersList = computed(() => users.value?.data);


const handleEdit = (user: any) => {
  alert(`Edit user: ${user.name}`);
};

// const handleDelete = (user: any) => {
//   if (confirm(`Yakin hapus user ${user.name}?`)) {
//     users.value = users.value.filter((u) => u.id !== user.id);
//   }
// };
</script>
