<!-- components/admin/Sidebar.vue -->
<template>
  <aside
    class="w-72 bg-[#0F1F35] text-white flex flex-col justify-between max-h-screen p-6 sticky top-0 left-0"
  >
    <div>
      <h2 class="text-lg font-bold mb-8">MAESTRO SPBE</h2>
      <nav class="space-y-2">
        <!-- <SidebarItem icon="DashboardCircleEditIcon" text="Dashboard" /> -->
        <SidebarItem icon="📁" text="Referensi Data" />
        <SidebarItem icon="👥" text="Persiapan Tim Asesor & Instrumen" />
        <SidebarItem icon="📊" text="Hasil Respon Instrumen" />
        <SidebarItem icon="📎" text="Penilaian Bukti Dukung" />
        <SidebarItem icon="🗣️" text="Penilaian Interview" />
        <SidebarItem icon="🧭" text="Penilaian Visitasi" />
        <SidebarItem icon="📝" text="Pelaporan SPBE" />
        <SidebarItem icon="👤" text="Manajemen Pengguna" />
      </nav>
    </div>

    <div>
      <SidebarItem icon="⚙️" text="Settings" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
</script>
