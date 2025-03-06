import axiosInstance from "../config/axios/axiosConfig";

export const getExperts = async () => {
  try {
    const res = await axiosInstance.get("https://harmon.love/api/v1/listener");

    if (res.status === 200) {
      return res.data;
    }

    throw new Error("Lỗi khi lấy dữ liệu chuyên gia");
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu chuyên gia:", error);
    throw new Error("Lỗi khi lấy dữ liệu chuyên gia");
  }
};

export const getExpertById = async (id) => {
  try {
    const res = await axiosInstance.get(
      `https://harmon.love/api/v1/listener/${id}`
    );

    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Lỗi khi lấy dữ liệu chuyên gia");
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu chuyên gia:", error);
    throw new Error("Lỗi khi lấy dữ liệu chuyên gia");
  }
};
