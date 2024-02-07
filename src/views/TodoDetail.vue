<template>
  <navbar />
  <div class="w-full bg-slate-900 h-screen p-3 text-white">
    <div class="flex gap-6 justify-between max-w-5xl mx-auto">
      <div>
        <h3 router class="text-[15px] font-bold cursor-pointer">
          {{ singleTodo.title }}
        </h3>
        <p v-if="edit" class="text-[12px]">
          {{ singleTodo.description }}
        </p>
        <input
          v-else
          class="w-full border-2 block bg-transparent py-2 mt-2 rounded-lg placeholder:pl-3"
          type="text"
          :placeholder="singleTodo.description"
          v-model="description"
        />
      </div>
      <div>
        <button
          v-if="edit"
          class="border-2 rounded-md my-3 p-2"
          @click="toggleEditbtn"
        >
          Edit
        </button>
        <button
          v-if="!edit"
          class="border-2 rounded-md ml-3 my-3 p-2"
          @click="toggleEditbtn(), handleEdit()"
        >
          Update
        </button>
        <button
          v-if="edit"
          class="border-2 rounded-md ml-3 my-3 p-2"
          @click="handleDelete"
        >
          Delete
        </button>
        <button
          v-if="!edit"
          class="border-2 rounded-md ml-3 my-3 p-2"
          @click="toggleEditbtn"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTodos } from "@/composables/useTodos";
import { userConfig } from "@/stores/userConfig";
import navbar from "@/components/navbar.vue";
import { useRoute, useRouter } from "vue-router";
const { getSingleTodo, deleteTodo, error, updateTodo } = useTodos();

const props = defineProps(["id"]);
const user_profile = userConfig();
const { currentUser, jwt_token } = user_profile;
const singleTodo = ref("");
let description = ref("");
let edit = ref("true");
const route = useRoute();
const router = useRouter();

const fetchTodo = async () => {
  if (currentUser) {
    const response = await getSingleTodo(jwt_token, route.params.id);
    singleTodo.value = response.item;
  } else {
    console.log(error);
  }
};

function toggleEditbtn() {
  edit.value = !edit.value;
}

const handleEdit = async () => {
  try {
    console.log(description.value);
    const response = await updateTodo(
      jwt_token,
      route.params.id,
      description.value
    );
    console.log(response);
    router.push({ name: "home" });
  } catch (error) {
    console.log(error.message);
  }
};
const handleDelete = async () => {
  try {
    await deleteTodo(jwt_token, route.params.id);
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchTodo();
});
</script>
