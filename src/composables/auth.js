import { ref } from "vue";

export const useAuth = () => {
  const error = ref(null);
  const signUp = async (email, password, password_confirmation) => {
    try {
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
      return responseData;
    } catch (err) {
      error.value = err.message;
      console.error("Signup Auth Error:", error.value);
    }
  };

  const logIn = async (email, password) => {
    try {
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
      console.log(response);
      if (response.status != 200) {
        error.value = "Please check Email/Password";
      } else {
        const responseData = await response.json();

        return responseData;
      }
    } catch (err) {
      error.value = err;

      console.error("Login Auth Error:", error.value);
    }
  };

  return { logIn, signUp, error };
};
