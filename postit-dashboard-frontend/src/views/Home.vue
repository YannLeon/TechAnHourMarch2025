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
  <div class="grow flex items-start justify-center bg-gray-100">
    <div
      class="bg-white grow p-4 rounded-lg shadow-lg w-96 text-center flex flex-row"
    >
      <h2 class="text-2xl grow font-bold mb-4">
        Welcome, {{ userStore.user?.name }}
      </h2>
      <button
        @click="logoutUser"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  </div>
</template>
