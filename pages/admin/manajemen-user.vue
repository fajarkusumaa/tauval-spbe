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
              Akun
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
              <div class="flex items-center justify-center gap-1 h-96">
                <HugeiconsIcon :icon="Loading03Icon" class="animate-spin" /> Memuat...
              </div>
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="status === 'error'">
          <TableRow>
            <TableCell colspan="9" class="text-center text-muted-foreground">
              <div class="flex items-center justify-center gap-1 text-destructive h-96">
                <HugeiconsIcon :icon="CancelCircleHalfDotIcon" /> Galat...
              </div>
            </TableCell>
          </TableRow>
        </template>
        <template v-else-if="status === 'success'">
          <TableRow v-for="(user, index) in usersList" :key="user.id" class="hover:bg-muted/50 transition-colors">
            <TableCell class="text-center">{{ index + 1 }}</TableCell>
            <TableCell>
              {{ user.name }}
            </TableCell>
            <TableCell>
              <div>
                <span class="flex text-base">
                  <HugeiconsIcn :icon="User02Icon" class="size-6" />
                  {{ user.username }}
                </span>
                <hr class="my-1">
                <div class="flex gap-4">
                  <span class="flex gap-1 items-center text-muted-foreground">
                    <HugeiconsIcon :icon="MailAtSignIcon" class="size-4" />{{ user.email }}
                  </span>
                  <span class="flex gap-1 items-center text-muted-foreground">
                    <HugeiconsIcon :icon="TelephoneIcon" class="size-4" />
                    {{ user.phone }}
                  </span>
                </div>
              </div>
            </TableCell>
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
              <Button variant="outline" size="sm" @click="() => setEditState({ open: true, data: user })">
                <HugeiconsIcon :icon="EditIcon" /> Edit
              </Button>
              <Button variant="destructive" size="sm" @click="() => setDeleteState({ open: true, data: user })">
                <HugeiconsIcon :icon="Delete02Icon" /> Hapus
              </Button>
            </TableCell>
          </TableRow>

          <TableRow v-if="usersList?.length === 0">
            <TableCell colspan="9" class="text-center text-muted-foreground">
              Tidak ada user.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <div class="py-3 flex">
      <Pagination class="ml-auto w-fit" v-slot="{ page }" :items-per-page="users?.meta.perPage ?? 10"
        :total="users?.meta.totalData" :default-page="1" @update:page="(page) => router.push({ query: { page } })">
        <PaginationContent v-slot="{ items }">
          <PaginationPrevious />
          <template v-for="(item, index) in items" :key="index">
            <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">
              {{ item.value }}
            </PaginationItem>
          </template>
          <PaginationNext />
        </PaginationContent>
      </Pagination>
    </div>

    <CreateDialog @success="() => refresh()" />
    <EditDialog @success="() => refresh()" />
    <DeleteDialog @success="() => refresh()" />
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
import { CancelCircleHalfDotIcon, Delete02Icon, EditIcon, Loading03Icon, MailAtSignIcon, PlusSignIcon, TelephoneIcon, User02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import type { GetUsersResponseT } from "~/types/index.types";
import { useManajemenUserStore } from "~/store/manajemen-user-store";
import CreateDialog from "~/components/admin/manajemen-user/create-dialog.vue";
import { useAPI } from "~/lib/use-api";
import DeleteDialog from "~/components/admin/manajemen-user/delete-dialog.vue";
import EditDialog from "~/components/admin/manajemen-user/edit-dialog.vue";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter()

const store = useManajemenUserStore()
const { setCreateState, setDeleteState, setEditState } = store

const tablePage = computed(() => route.query.page)

const { data: users, status, refresh } = useAPI<GetUsersResponseT>(() => `${config.public.apiBase}/users?page=${tablePage.value}`);
const usersList = computed(() => users.value?.data);

const handleEdit = (user: any) => {
  alert(`Edit user: ${user.name}`);
};
</script>
