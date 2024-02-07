<script setup>
import { userConfig } from "@/stores/userConfig";
import { RouterView } from "vue-router";
import router from "./router/index";
import { storeToRefs } from "pinia";

const user_profile = userConfig();
const { currentUser } = storeToRefs(user_profile);
// route guard here
router.beforeEach((to, from, next) => {
  if (to.name == "todo") {
    if (currentUser.value) {
      return next();
    } else {
      return next({ name: "home" });
    }
  } else if (to.name == "login") {
    if (currentUser.value) {
      return next({ name: "home" });
    } else {
      return next();
    }
  }

  return next();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
