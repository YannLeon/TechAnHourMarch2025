<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/userStore.js";
import { useRouter } from "vue-router";

const name = ref("");
const password = ref("");
const isLogin = ref(true);
const userStore = useUserStore();
const router = useRouter();

const handleAuth = async () => {
  console.log("auth launch");
  const success = isLogin.value
    ? await userStore.login(name.value, password.value)
    : await userStore.register(name.value, password.value);

  if (success) {
    router.push("/home");
  }
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <div
    class="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-100"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center mb-4">
        {{ isLogin ? "Login" : "Register" }}
      </h2>
      <form @submit.prevent="handleAuth" class="space-y-4">
        <input
          v-model="name"
          placeholder="Name"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {{ isLogin ? "Login" : "Register" }}
        </button>
      </form>
      <p class="text-center mt-4">
        <button @click="toggleMode" class="text-blue-600 hover:underline">
          {{
            isLogin
              ? "Need an account? Register"
              : "Already have an account? Login"
          }}
        </button>
      </p>
    </div>
  </div>
</template>
