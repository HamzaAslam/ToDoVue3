<template>
  <div>
    <form
      class="flex flex-col justify-center"
      @submit.prevent="handleCreateTodo"
    >
      <h1 class="text-2xl bold text-center">Create Your Todo</h1>
      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="text"
        placeholder="Title"
        v-model="title"
      />

      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="text"
        placeholder="Description"
        v-model="description"
      />
      <button
        class="border-2 rounded-md mx-auto my-3 p-2"
        :class="{ 'bg-slate-500 pointer-events-none	 ': spiner }"
      >
        Create Your Todo
      </button>
      <div
        class="border-2 border-rose-500 rounded-lg text-rose-800 my-6 p-3"
        v-if="error"
      >
        {{ error }}
      </div>
    </form>
    <!-- ------------ Create Your Todo Ends------------------------ -->
    <ul>
      <h1 class="text-2xl bold text-center mt-4">Your TODO list</h1>
      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="text"
        placeholder="Search Your Todo Here"
        v-model="search"
      />

      <!-- ----------- search input ends ------- -->
      <li v-for="todo in filteredTodos" key="todo.id">
        <singleTodo :singleTodo="todo" />
      </li>
    </ul>
    <!-- ----------- Showing Todo End------------------------ -->
    <div class="mx-auto max-w-fit mt-6">
      <fwb-pagination
        v-model="currentPage"
        :total-items="todos.total"
        @update:model-value="handleNextPage"
      ></fwb-pagination>
    </div>
    <!-- ------- pagination -------- -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { FwbPagination } from "flowbite-vue";
import { useTodos } from "@/composables/useTodos";
import { userConfig } from "../stores/userConfig.js";
import singleTodo from "./singleTodo.vue";
let currentPage = ref("");
let title = ref("");
let description = ref("");
const { getTodo, createTodo, error, spiner } = useTodos();
const user_profile = userConfig();
const { jwt_token } = user_profile;
let todos = ref("");
let search = ref("");
//Seach the Todo from title
const filteredTodos = computed(() => {
  if (!search.value) {
    return todos.value.data;
  } else {
    return todos.value.data.filter((todo) => todo.title.includes(search.value));
  }
});

// geting All todos available
let fetchAllTodos = async () => {
  const response = await getTodo(jwt_token);
  if (response) {
    todos.value = response.items;
    currentPage.value = response.items.current_page;
  }
};

// creating todos
const handleCreateTodo = async () => {
  const response = await createTodo(title.value, description.value, jwt_token);
  if (response) {
    fetchAllTodos();
    title.value = "";
    description.value = "";
  }
};
// handling pagination
const handleNextPage = async (pgNum) => {
  const response = await getTodo(jwt_token, pgNum);
  if (response) {
    todos.value = response.items;
    currentPage.value = response.items.current_page;
    console.log(currentPage.value);
    console.log(todos.value);
  }
};
// caling function to get all the todos when component is mounted
onMounted(() => {
  fetchAllTodos();
});
</script>

<style></style>
