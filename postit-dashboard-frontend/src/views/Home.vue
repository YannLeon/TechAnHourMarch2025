<script setup>
import { useUserStore } from "../store/userStore.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const userStore = useUserStore();
const router = useRouter();

const logoutUser = () => {
  userStore.logout();
  router.push("/authent");
};

// State for post-its
const postIts = ref([]);
const newContent = ref("");

// Fetch Post-its from API
const fetchPostIts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/postits");
    postIts.value = response.data;
  } catch (error) {
    console.error("Error fetching post-its:", error);
  }
};

// Create a new Post-it
const createPostIt = async () => {
  if (!newContent.value.trim()) return;

  try {
    await axios.post("http://localhost:3000/postits", {
      content: newContent.value,
      user_id: userStore.token, // Send user ID instead of name
    });

    newContent.value = "";
    fetchPostIts(); // Refresh post-it list
  } catch (error) {
    console.error("Error creating post-it:", error);
  }
};

// Fetch post-its when the component is mounted
onMounted(fetchPostIts);
</script>

<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-100 p-5">
    <!-- Welcome Bar -->
    <div
      class="bg-white w-full max-w-4xl p-4 rounded-lg shadow-lg text-center flex justify-between items-center mb-6"
    >
      <h2 class="text-2xl font-bold">Welcome, {{ userStore.user?.name }}</h2>
      <button
        @click="logoutUser"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>

    <!-- New Post-it Form -->
    <div class="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mb-5">
      <h3 class="text-lg font-semibold mb-2">Create a new Post-it</h3>
      <input
        v-model="newContent"
        placeholder="Write your note..."
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        @click="createPostIt"
        class="w-full bg-blue-500 text-white py-2 mt-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add Post-it
      </button>
    </div>

    <!-- Display Post-its -->
    <div class="w-full max-w-lg space-y-3">
      <div
        v-for="post in postIts"
        :key="post.id"
        class="bg-yellow-200 p-4 rounded-lg shadow-md"
      >
        <h4 class="font-bold">{{ post.name }}</h4>
        <p>{{ post.content }}</p>
        <small class="text-gray-600">{{
          new Date(post.created_at).toLocaleString()
        }}</small>
      </div>
    </div>
  </div>
</template>
