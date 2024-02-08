<template>
  <div class="w-full bg-slate-900 text-white h-screen flex justify-center">
    <form
      class="mt-24 max-w-2xl w-full flex flex-col items-center"
      @submit.prevent="handleLogin"
    >
      <h1 class="text-2xl bold text-center">Sign In Here</h1>
      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="text"
        placeholder="Email"
        v-model="email"
      />
      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="password"
        placeholder="Password"
        v-model="password"
        autocomplete="off"
      />

      <button
        @submit.prevent="handleLogin"
        class="border-2 rounded-md mx-auto mt-8 p-2 px-4"
        :class="{ 'bg-slate-500 pointer-events-none	 ': spiner }"
      >
        Sign In
      </button>
      <div
        class="border-2 border-rose-500 rounded-lg text-rose-800 my-6 p-3"
        v-if="error"
      >
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/auth";
import { userConfig } from "../stores/userConfig.js";
const user_profile = userConfig();
const { setJwtToken, setUser } = user_profile;
const router = useRouter();
const { logIn, error, spiner } = useAuth();

const email = ref("");
const password = ref("");
// handle login api
const handleLogin = async () => {
  if (email.value.trim() !== "" && password.value.trim() !== "") {
    const response = await logIn(email.value, password.value);
    if (response) {
      setJwtToken(response.user.token);
      setUser(response.user);
      router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped></style>
