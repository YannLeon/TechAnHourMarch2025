<script setup>
import { useUserStore } from "./store/userStore.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

// Redirect to /authent if not logged in
if (!userStore.token) {
  router.push("/authent");
} else {
  router.push("/home");
}
</script>

<template>
  <div
    class="h-screen w-screen bg-gray-200 text-gray-800 flex flex-col items-center"
  >
    <router-view />
  </div>
</template>
