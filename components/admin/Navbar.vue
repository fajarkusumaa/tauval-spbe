<!-- components/admin/Navbar.vue -->
<template>
  <header
    class="flex items-center justify-end p-4 sticky top-0 backdrop-blur-md"
  >
    <div class="flex items-center gap-4">
      <button class="text-gray-500 hover:text-gray-700">🔔</button>
      <div class="flex items-center gap-2">
        <img
          src="https://i.pravatar.cc/32"
          class="w-8 h-8 rounded-full"
          alt="User"
        />
        <div class="text-sm">
          <div class="font-bold">Mr. User</div>
          <div class="text-gray-500">user@email.com</div>
        </div>
      </div>
    </div>
  </header>
</template>
