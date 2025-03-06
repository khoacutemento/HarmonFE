import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

function ExpertDetail({ expert }) {
  console.log(expert);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
        backgroundColor: "#ECCFFF",
        borderRadius: "10px",
        padding: "20px",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "start",
          gap: "10px",
          width: "100%",
        }}
      >
        <img
          src="https://storage.googleapis.com/wellcare-user-profile/611b638537ecda5dbfb44efa/c4b3fb27844b52150b5a.jpg"
          alt={expert.fullName}
          style={{ height: "150px", width: "150px", borderRadius: "10px " }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            marginLeft: "20px",
          }}
        >
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
            <p style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}>
              Chuyên gia:
            </p>
            <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
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
            <p style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}>
              Giới tính:
            </p>
            <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
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
            <p style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}>
              Điểm đánh giá:
            </p>
            <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
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
            <p style={{ fontSize: "15px", fontWeight: "400", margin: 0 }}>
              Giá tư vấn:
            </p>
            <p style={{ fontSize: "16px", fontWeight: "600", margin: 0 }}>
              {expert.price?.toLocaleString("vi-VN")} &#x20AB;
            </p>
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "10px",
          color: "#8327DE",
          width: "100%",
        }}
      >
        <h3 style={{ margin: 0, fontSize: "18px" }}>Mô tả</h3>
        <p
          style={{
            margin: 0,
            textAlign: "left",
            fontSize: "15px",
            fontWeight: "400",
          }}
        >
          Chuyên gia {expert.fullName} là Coach có chuyên môn cao, luôn tận tâm
          và chuyên nghiệp trong công việc. Hiện tại, chuyên gia
          {expert.fullName} đang đảm nhiệm vai trò là Giám đốc Trung tâm Tâm lý
          trị liệu NHC Việt Nam chi nhánh Phan Chu Trinh.
        </p>
      </div>
    </div>
  );
}

export default ExpertDetail;
