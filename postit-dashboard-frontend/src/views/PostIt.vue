<script setup>
import { defineProps } from "vue";

const props = defineProps({
  post: Object,
  userRole: String,
  userId: String,
  deletePostIt: Function,
});
</script>

<template>
  <div
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

    <!-- Delete button appears if user is the author or an admin -->
    <button
      v-if="post.user_id === userId || userRole === 'admin'"
      @click="deletePostIt(post.id)"
      class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
      :data-cy="`postit-delete-${post.id}`"
    >
      ✖
    </button>
  </div>
</template>
