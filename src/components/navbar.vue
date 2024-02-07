<template>
  <nav class="bg-slate-900 text-white w-full border-b-[1px]">
    <div class="max-w-5xl flex justify-between mx-auto items-center">
      <router-link :to="{ name: 'home' }">
        <h1 class="text-xl py-6">LOGO</h1>
      </router-link>
      <div v-if="!currentUser" class="flex gap-4">
        <router-link :to="{ name: 'signup' }">
          <button class="border-2 rounded-md ml-auto my-3 p-2">
            Sign Up
          </button></router-link
        >
        <router-link :to="{ name: 'login' }">
          <button class="border-2 rounded-md ml-auto my-3 p-2">
            Log In
          </button></router-link
        >
      </div>
      <button
        v-else
        @click="handleLogout"
        class="border-2 rounded-md ml-auto my-3 p-2"
      >
        Log Out
      </button>
    </div>
  </nav>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { userConfig } from "../stores/userConfig.js";
const user_profile = userConfig();
const { currentUser } = storeToRefs(user_profile);
const router = useRouter();

const handleLogout = async () => {
  try {
    user_profile.logout();
    router.push({ name: "login" }); // Redirect to login after logout
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>
