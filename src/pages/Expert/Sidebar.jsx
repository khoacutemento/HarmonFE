import React from "react";
import { RiFilter3Line } from "react-icons/ri";
function Sidebar() {
  const items = [
    { key: "1", label: "Stress Lo Âu" },
    { key: "2", label: "Trầm Cảm" },
    { key: "4", label: "Công Việc Học Tập" },
    { key: "5", label: "Tự Tin Giá Trị Bản Thân" },
    { key: "6", label: "Kiểm Soát Cảm Xúc" },
    { key: "7", label: "Mất Mát Tổn Thương" },
    { key: "8", label: "Rối Loạn Giấc Ngủ" },
    { key: "9", label: "Định Hướng Cuộc Sống" },
    { key: "10", label: "Kỹ Năng Giao Tiếp" },
  ];
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#ECCFFF",
        paddingTop: "10px",
        paddingBottom: "20px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          paddingLeft: "20px",
          gap: "20px",
          paddingBottom: "10px",
          color: "#8327DE",
          fontSize: "20px",
          fontWeight: "bold",
          borderBottom: "1px solid",
        }}
      >
        <RiFilter3Line style={{ fontSize: "30px" }} />
        <span>Bộ lọc tìm kiếm</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          paddingLeft: "20px",
        }}
      >
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <p
            style={{
              margin: 0,
              color: "#8327DE",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Đề tài
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {items.map((item) => (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  gap: "10px",
                  color: "#8327DE",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                <input
                  type="checkbox"
                  id={item.label}
                  style={{
                    cursor: "pointer",
                    border: "2px solid #8327DE",
                    accentColor: "#8327DE",
                    padding: "5px",
                    borderRadius: "5px",
                    marginLeft: "-10px",
                    width: "15px",
                    height: "15px",
                  }}
                />
                <label htmlFor={item.label} style={{ cursor: "pointer" }}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
