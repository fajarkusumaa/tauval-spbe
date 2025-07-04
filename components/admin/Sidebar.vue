<script setup lang="ts">
import { useUser } from "~/lib/token";
import SidebarItem from "./SidebarItem.vue";
import { Attachment01Icon, Compass01Icon, DashboardCircleEditIcon, Edit02Icon, EditUser02Icon, Folder02Icon, ListViewIcon, MessageDone01Icon, Setting06Icon, Settings02Icon, TabletPenIcon, User02Icon } from "@hugeicons/core-free-icons";

const user = useUser();
const userRoles = user.value?.roles.map(role => role.id) || [];

// Role IDs:
// 1 - Admin
// 2 - Koordinator SPBE
// 3 - Assesor Internal
// 4 - Satuan Kerja

const sidebarMenu = [
  {
    to: '/admin',
    icon: DashboardCircleEditIcon,
    text: 'Dashboard',
    roleAccess: [1, 2, 3, 4]
  },
  {
    to: '/admin/referensi-data',
    icon: Folder02Icon,
    text: 'Referensi Data',
    roleAccess: [1]
  },
  {
    to: '/admin/konfigurasi-asesor',
    icon: Setting06Icon,
    text: 'Konfigurasi Asesor',
    roleAccess: [1, 2]
  },
  {
    to: '/admin/plotting-indikator-instrumen',
    icon: EditUser02Icon,
    text: 'Plotting Indikator Instrumen',
    roleAccess: [1, 2]
  },
  {
    to: '/admin/konfigurasi-instrumen',
    icon: Setting06Icon,
    text: 'Konfigurasi Instrumen',
    roleAccess: [1, 3]

  },
  {
    to: '/admin/hasil-respon',
    icon: ListViewIcon,
    text: 'Hasil Respon Instrumen',
    roleAccess: [1, 3]

  },
  {
    to: '/admin/asesor',
    icon: Attachment01Icon,
    text: 'Penilaian Bukti Dukung',
    roleAccess: [1]
  },
  {
    to: '/admin/asesor',
    icon: TabletPenIcon,
    text: 'Pengisian Instrumen',
    roleAccess: [1]

  },
  {
    to: '/admin/asesor',
    icon: MessageDone01Icon,
    text: 'Penilaian Interview',
    roleAccess: [1]

  },
  {
    to: '/admin/asesor',
    icon: Compass01Icon,
    text: 'Penilaian Visitasi',
    roleAccess: [1]

  },
  {
    to: '/admin/asesor',
    icon: Edit02Icon,
    text: 'Pelaporan SPBE',
    roleAccess: [1]
  },
  {
    to: '/admin/manajemen-user',
    icon: User02Icon,
    text: 'Manajemen Pengguna',
    roleAccess: [1]
  },
]

function hasAccess(userRoles: number[], roleAccess: number[]): boolean {
  return roleAccess.some(roleId => userRoles.some(role => role === roleId))
}

</script>

<template>
  <aside class="w-72 bg-[#0F1F35] text-white flex flex-col justify-between h-screen p-6 sticky top-0 left-0 z-50">
    <div>
      <h2 class="text-lg font-bold mb-8">MAESTRO SPBE</h2>
      <nav class="space-y-2">
        <template v-for="menu in sidebarMenu">
          <SidebarItem :to="menu.to" :icon="menu.icon" :text="menu.text" v-if="hasAccess(userRoles, menu.roleAccess)" />
        </template>
      </nav>
    </div>

    <div>
      <SidebarItem to="/settings" :icon="Settings02Icon" text="Settings" />
    </div>
  </aside>
</template>
