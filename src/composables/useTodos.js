import { ref } from "vue";
export const useTodos = () => {
  const error = ref(null);
  const spiner = ref(false);
  //getting todos api here
  const getTodo = async (jwt_token, pageNum) => {
    spiner.value = !spiner.value;
    const response = await fetch(
      `http://3.232.244.22/api/items?page=${pageNum}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt_token}`,
        },
      }
    );
    const responseData = await response.json();
    if (responseData.success) {
      error.value = "";
      spiner.value = !spiner.value;
      return responseData;
    } else {
      error.value = response;
      console.log("Get Todo Request failed:", response);
    }
  };
  //getting single todos api here

  const getSingleTodo = async (jwt_token, todoid) => {
    const response = await fetch(`http://3.232.244.22/api/item/${todoid}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      error.value = "";

      return responseData;
    } else {
      error.value = response;
      console.log("Get Single Todo Request failed:", response);
    }
  };
  //handeling create todos api here

  const createTodo = async (title, description, jwt_token) => {
    try {
      spiner.value = !spiner.value;

      const response = await fetch("http://3.232.244.22/api/item", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt_token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      if (response.status != 200) {
        error.value = "Please check Todo Input";
      } else {
        const responseData = await response.json();
        error.value = "";
        spiner.value = !spiner.value;

        return responseData;
      }
    } catch (err) {
      error.value = response;
      console.error("Create Todo Error:", error.value);
    }
  };

  //handeling delete todos api here

  const deleteTodo = async (jwt_token, todoid) => {
    spiner.value = !spiner.value;

    try {
      await fetch(`http://3.232.244.22/api/item/${todoid}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt_token}`,
        },
      });
      error.value = "";
      spiner.value = !spiner.value;
    } catch (err) {
      error.value = err;
      console.error("Delete Todo Error:", error.value);
    }
  };

  //handeling update todos api here

  const updateTodo = async (jwt_token, todoid, description) => {
    try {
      spiner.value = !spiner.value;

      const response = await fetch(`http://3.232.244.22/api/item/${todoid}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${jwt_token}`,
        },
        body: JSON.stringify({
          description: description,
        }),
      });
      const responseData = await response.json();
      error.value = "";
      console.log(responseData);
      spiner.value = !spiner.value;

      return responseData;
    } catch (err) {
      error.value = responseData;
      console.error("Edit Todo Error:", error.value);
    }
  };
  return {
    getTodo,
    getSingleTodo,
    createTodo,
    deleteTodo,
    updateTodo,
    error,
    spiner,
  };
};
