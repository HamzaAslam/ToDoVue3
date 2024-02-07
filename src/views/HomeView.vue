<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <navbar />
    <main class="max-w-xl mx-auto py-12">
      <h1 class="text-2xl bold text-center">Welcome to TODO</h1>
      <p class="py-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        officia quibusdam temporibus porro dicta ex eaque atque tenetur sed eum
        praesentium tempore corporis sequi optio, unde perspiciatis odit!
        Expedita, reiciendis.
      </p>
      <section v-if="currentUser">
        <Todo />
      </section>
    </main>
  </div>
</template>
<script setup>
import navbar from "@/components/navbar.vue";
import Todo from "@/components/Todo.vue";
import { storeToRefs } from "pinia";
import { userConfig } from "../stores/userConfig";
const user_profile = userConfig();
const { currentUser } = storeToRefs(user_profile);
</script>
