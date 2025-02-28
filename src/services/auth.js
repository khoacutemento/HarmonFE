import axios from "axios";

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "https://harmon.love/api/v1/auth/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const newAccessToken = response.data.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Lỗi khi làm mới token:", error);
    return null;
  }
};

export { refreshToken };
