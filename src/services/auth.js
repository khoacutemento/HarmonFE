import axios from "axios";

const login = async ({ username, password }) => {
  try {
    const rs = await axios.post("https://harmon.love/api/v1/auth", {
      username: username,
      password: password,
    });
    return rs;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export { login };
