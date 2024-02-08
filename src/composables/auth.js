import { ref } from "vue";

export const useAuth = () => {
  const error = ref(null);
  const spiner = ref(false);
  //handeling signup api
  const signUp = async (email, password, password_confirmation) => {
    try {
      spiner.value = !spiner.value;
      const response = await fetch("http://3.232.244.22/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        }),
      });
      const responseData = await response.json();
      error.value = "";
      spiner.value = !spiner.value;
      return responseData;
    } catch (err) {
      error.value = err.message;
      console.error("Signup Auth Error:", error.value);
    }
  };
  //handeling log in api

  const logIn = async (email, password) => {
    try {
      spiner.value = !spiner.value;
      const response = await fetch("http://3.232.244.22/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status != 200) {
        error.value = "Please check Email/Password";
      } else {
        const responseData = await response.json();
        spiner.value = !spiner.value;
        return responseData;
      }
    } catch (err) {
      error.value = err;

      console.error("Login Auth Error:", error.value);
    }
  };

  return { logIn, signUp, error, spiner };
};
