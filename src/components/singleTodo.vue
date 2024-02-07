<template>
  <div class="rounded-md border-2 p-3 my-3">
    <div>
      <!-- --------- using router link to component name to todo detail------- -->
      <router-link :to="{ name: 'todo', params: { id: singleTodo.id } }"
        ><h3 router class="text-[15px] font-bold cursor-pointer text-center">
          {{ singleTodo.title }}
        </h3></router-link
      >
      <p class="text-[12px] text-center">{{ singleTodo.description }}</p>
    </div>
  </div>
</template>

<script setup>
// -----------  defining props---------
const props = defineProps(["singleTodo"]);
</script>
