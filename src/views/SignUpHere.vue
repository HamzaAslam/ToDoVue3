<template>
  <div class="w-full bg-slate-900 text-white h-screen flex justify-center">
    <form
      class="mt-24 max-w-2xl w-full flex flex-col items-center"
      @submit.prevent="handleSingnup"
    >
      <h1 class="text-2xl bold text-center">Sign Up Here</h1>
      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="text"
        placeholder="Email"
        v-model="email"
        autocomplete="off"
      />
      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="password"
        placeholder="Password"
        v-model="password"
        autocomplete="off"
      />
      <input
        class="w-full border-2 block bg-transparent py-2 mt-4 rounded-lg placeholder:pl-3"
        type="password"
        placeholder="Confirm Password"
        v-model="password_confirmation"
        autocomplete="off"
      />
      <button
        @submit.prevent="handleSingnup()"
        class="border-2 rounded-md mx-auto mt-8 p-2 px-4"
        :class="{ 'bg-slate-500 pointer-events-none	 ': spiner }"
      >
        Sign Up!
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
const router = useRouter();
const { signUp, error, spiner } = useAuth();
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
//handle signup api
const handleSingnup = async () => {
  if (password.value.trim() == password_confirmation.value.trim()) {
    if (
      email.value.trim() !== "" &&
      password.value.trim() !== "" &&
      password_confirmation.value.trim() !== ""
    ) {
      const response = await signUp(
        email.value,
        password.value,
        password_confirmation.value
      );
      //For success
      if (response.success) {
        router.push({ path: "/login" });
      }
    } else {
      error.value = "Please check if you have entered email, password";
    }
  } else {
    error.value = "Confirm password does not match";
  }
};
</script>

<style scoped></style>
