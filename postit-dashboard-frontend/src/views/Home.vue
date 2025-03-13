<script setup>
import { useUserStore } from "../store/userStore.js";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import PostIt from "./PostIt.vue";

const userStore = useUserStore();
const router = useRouter();

const logoutUser = () => {
  userStore.logout();
  router.push("/authent");
};

// State for post-its
const postIts = ref([]);
const newContent = ref("");
const errorMessage = ref(""); // State for error message

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
  if (!newContent.value.trim()) {
    errorMessage.value = "Post-it content cannot be empty!";
    return;
  }

  try {
    await axios.post("http://localhost:3000/postits", {
      content: newContent.value,
      user_id: userStore.token, // Send user ID
    });

    newContent.value = "";
    errorMessage.value = ""; // Clear error after successful creation
    fetchPostIts(); // Refresh post-it list
  } catch (error) {
    console.error("Error creating post-it:", error);
  }
};

// Delete a Post-it (Only if User Created It)
const deletePostIt = async (postId) => {
  try {
    await axios.delete(`http://localhost:3000/postits/${postId}`, {
      data: { user_id: userStore.token }, // Send user ID in the request body
    });

    fetchPostIts(); // Refresh post-it list
  } catch (error) {
    console.error(
      "Error deleting post-it:",
      error.response?.data || error.message
    );
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
      <h2 class="text-2xl font-bold" data-cy="welcome-message">
        Welcome, {{ userStore.user?.name.toUpperCase() }}
      </h2>
      <button
        @click="logoutUser"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        data-cy="logout-btn"
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
        data-cy="postit-input"
      />
      <!-- Error Message -->
      <p
        v-if="errorMessage"
        class="text-red-500 text-sm mt-1"
        data-cy="error-message"
      >
        {{ errorMessage }}
      </p>
      <button
        @click="createPostIt"
        class="w-full bg-blue-500 text-white py-2 mt-2 rounded-lg hover:bg-blue-600 transition"
        data-cy="add-postit-btn"
      >
        Add Post-it
      </button>
    </div>

    <!-- Display Post-its -->
    <div class="w-full space-y-3 flex gap-2 flex-wrap justify-center">
      <PostIt
        v-for="post in postIts"
        :key="post.id"
        :post="post"
        :user-role="userStore.role"
        :user-id="userStore.token"
        :delete-post-it="deletePostIt"
      />
    </div>
  </div>
</template>
