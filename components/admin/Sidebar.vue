<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";

import { Attachment01FreeIcons, Attachment01Icon, Compass01Icon, DashboardCircleEditIcon, Edit02Icon, Folder02Icon, ListViewIcon, MessageDone01Icon, Setting06Icon, Settings02Icon, User02Icon } from "@hugeicons/core-free-icons";
</script>

<template>
  <aside class="w-72 bg-[#0F1F35] text-white flex flex-col justify-between h-screen p-6 sticky top-0 left-0 z-50">
    <div>
      <h2 class="text-lg font-bold mb-8">MAESTRO SPBE</h2>
      <nav class="space-y-2">
        <SidebarItem to="/admin" :icon="DashboardCircleEditIcon" text="Dashboard" />
        <SidebarItem to="/admin/referensi-data" :icon="Folder02Icon" text="Referensi Data" />
        <SidebarItem to="/admin/konfigurasi-instrumen" :icon="Setting06Icon" text="Konfigurasi Instrumen" />
        <SidebarItem to="/admin/hasil-respon" :icon="ListViewIcon" text="Hasil Respon Instrumen" />
        <SidebarItem to="/asesor" :icon="Attachment01Icon" text="Penilaian Bukti Dukung" />
        <SidebarItem
          to="/asesor"
          :icon="MessageDone01Icon"
          text="Penilaian Interview"
        />
        <SidebarItem to="/asesor" :icon="Compass01Icon" text="Penilaian Visitasi" />
        <SidebarItem to="/asesor" :icon="Edit02Icon" text="Pelaporan SPBE" />
        <SidebarItem
          to="/admin/manajemen-user"
          :icon="User02Icon"
          text="Manajemen Pengguna"
        />
      </nav>
    </div>

    <div>
      <SidebarItem to="/settings" :icon="Settings02Icon" text="Settings" />
    </div>
  </aside>
</template>
