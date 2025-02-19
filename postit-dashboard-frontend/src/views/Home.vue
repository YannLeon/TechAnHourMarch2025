<script setup>
import { useUserStore } from "../store/userStore.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logoutUser = () => {
  userStore.logout();
  router.push("/authent");
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
      <h2 class="text-2xl font-bold mb-4">
        Welcome, {{ userStore.user?.name }}
      </h2>
      <button
        @click="logoutUser"
        class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
</template>
