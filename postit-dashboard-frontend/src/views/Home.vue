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
  try {
    await axios.post("http://localhost:3000/postits", {
      content: newContent.value === "" ? null : newContent.value,
      user_id: userStore.token, // Send user ID
    });

    newContent.value = "";
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
      <div
        v-for="post in postIts"
        :key="post.id"
        class="bg-yellow-200 w-52 h-52 p-4 rounded-sm shadow-md flex flex-col relative"
        :data-cy="`postit-${post.id}`"
      >
        <h4 class="font-bold uppercase" :data-cy="`postit-author-${post.id}`">
          {{ post.name }}
        </h4>
        <p class="grow overflow-auto" :data-cy="`postit-content-${post.id}`">
          {{ post.content }}
        </p>
        <small class="text-gray-600">
          {{ new Date(post.created_at).toLocaleString() }}
        </small>

        <!-- Show delete button only if the logged-in user owns the post-it -->
        <button
          v-if="post.user_id === userStore.token || userStore.role === 'admin'"
          @click="deletePostIt(post.id)"
          class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
          :data-cy="`postit-delete-${post.id}`"
        >
          ✖
        </button>
      </div>
    </div>
  </div>
</template>
