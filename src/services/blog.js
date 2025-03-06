import axiosInstance from "../config/axios/axiosConfig";

export const getBlogs = async () => {
  try {
    const res = await axiosInstance.get("https://harmon.love/api/v1/blog");
    if (res.status === 200) {
      return res.data.data;
    }
    throw new Error(`Unexpected status code: ${res.status}`);
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    throw new Error(error?.response?.data?.message || "Failed to fetch blogs");
  }
};
