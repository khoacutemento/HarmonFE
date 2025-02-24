import React from "react";

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#9C83E7",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#B3A2F3",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <div>
          <img src="public/logo/logo.png" alt="Logo" style={{ width: "80px", height: "80px" }} />
          <h2 style={{ marginTop: "10px", color: "#4B0082", fontStyle: "italic" }}>
            Chào mừng đến với Harmon
          </h2>
        </div>
        <form style={{ marginTop: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", color: "#4B0082", marginBottom: "5px" }}>
              Email
            </label>
            <input
              type="email"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #9C83E7",
                backgroundColor: "#E0D6FF",
              }}
              placeholder="Nhập email"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "#4B0082", marginBottom: "5px" }}>
              Password
            </label>
            <input
              type="password"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #9C83E7",
                backgroundColor: "#E0D6FF",
              }}
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#9C83E7",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;