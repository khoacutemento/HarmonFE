import React from "react";
import Search from "./Search";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Content({ expertList }) {
  const navigate = useNavigate();

  const handleBooking = (id) => {
    navigate(`${id}`);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "20px",
      }}
    >
      <h1 style={{ marginTop: 0, marginBottom: 0, color: "#8327DE" }}>
        Danh sách các chuyên gia
      </h1>
      <Search />
      <p
        style={{
          color: "#8327DE",
          fontSize: "18px",
          fontWeight: "600",
          fontStyle: "italic",
        }}
      >
        Tìm thấy {expertList.length} kết quả
      </p>
      <div style={{ width: "100%" }}>
        {expertList.length > 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
            }}
          >
            {expertList.map((expert, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: "#ECCFFF",
                    padding: "15px",
                    borderRadius: "10px",
                    width: "25%",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="https://storage.googleapis.com/wellcare-user-profile/611b638537ecda5dbfb44efa/c4b3fb27844b52150b5a.jpg"
                    alt={expert.fullName}
                    style={{
                      height: "200px",
                      width: "100%",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      //   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      color: "#8327DE",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}
                    >
                      Chuyên gia:
                    </p>
                    <p
                      style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}
                    >
                      {expert.fullName}
                    </p>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      color: "#8327DE",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}
                    >
                      Giới tính:
                    </p>
                    <p
                      style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}
                    >
                      {expert.gender === "Male"
                        ? "Nam"
                        : expert.gender === "Female"
                        ? "Nữ"
                        : "Khác"}
                    </p>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      color: "#8327DE",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}
                    >
                      Điểm đánh giá:
                    </p>
                    <p
                      style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}
                    >
                      <FaStar />
                      <FaStar />
                      <CiStar />
                      <CiStar />
                      <CiStar />
                    </p>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                      color: "#8327DE",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}
                    >
                      Giá tư vấn:
                    </p>
                    <p
                      style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}
                    >
                      {expert.price.toLocaleString("vi-VN")} &#x20AB;
                    </p>
                  </span>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "#BB76FF",
                      color: "white",
                      padding: "10px 20px",
                      marginTop: "20px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleBooking(expert.id)}
                  >
                    Chi tiết
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{ color: "#8327DE", fontSize: "20px", fontWeight: "bold" }}
          >
            Không tìm thấy chuyên gia nào
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
