import { defineStore } from "pinia";
import { ref } from "vue";

export const userConfig = defineStore(
  "userConfig",
  () => {
    const jwt_token = ref("");
    const currentUser = ref("");

    // -------------actions-------------
    function setJwtToken(token) {
      jwt_token.value = token;
    }
    function setUser(user) {
      currentUser.value = user;
    }

    function logout() {
      jwt_token.value = null;
      currentUser.value = null;
    }
    return { setJwtToken, setUser, jwt_token, currentUser, logout };
  },
  {
    persist: true,
  }
);
