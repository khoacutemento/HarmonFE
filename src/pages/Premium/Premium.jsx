import React from "react";


const Premium = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {/* Owner Family Plan */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1c1c1c",
            borderRadius: "12px",
            padding: "25px",
            textAlign: "left",
            boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.1)",
          }}
        >
          <h2 style={{ color: "#A6FF00", fontSize: "1.7rem", fontWeight: "bold" }}>Owner Family</h2>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "15px" }}>1,090,000 ₫ cho 12 tháng</p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Tối đa 6 tài khoản Premium hoặc Kids</li>
            <li>Kiểm soát nội dung rõ ràng</li>
            <li>Truy cập Spotify Kids</li>
          </ul>
          <button
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              backgroundColor: "#A6FF00",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Mua Owner Family
          </button>
        </div>

        {/* Individual Plan */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#2a1b1b",
            borderRadius: "12px",
            padding: "25px",
            textAlign: "left",
            boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.1)",
          }}
        >
          <h2 style={{ color: "#FFB6C1", fontSize: "1.7rem", fontWeight: "bold" }}>Individual</h2>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "15px" }}>390,000 ₫ cho 12 tháng</p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Sử dụng tài khoản cá nhân riêng tư</li>
            <li>Âm thanh chất lượng cao</li>
            <li>Ổn định và an toàn</li>
          </ul>
          <button
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              backgroundColor: "#FFB6C1",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Mua Premium Individual
          </button>
        </div>

        {/* Member of Family Plan */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#3D1A5D",
            borderRadius: "12px",
            padding: "25px",
            textAlign: "left",
            boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.1)",
          }}
        >
          <h2 style={{ color: "#D8BFD8", fontSize: "1.7rem", fontWeight: "bold" }}>Member of Family</h2>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "15px" }}>299,000 ₫ cho 12 tháng</p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Riêng tư trên tài khoản chính chủ</li>
            <li>Mức giá hợp lý</li>
            <li>Bảo hành trọn gói</li>
          </ul>
          <button
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "12px",
              backgroundColor: "#D8BFD8",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Mua Member of Family
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;