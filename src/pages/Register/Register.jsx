import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { login } from "../../services/auth";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ username, password });
      if (response) {
        localStorage.setItem("accessToken", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.success("Login successfully");
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
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
            <img
              src="public/logo/logo.png"
              alt="Logo"
              style={{ width: "80px", height: "80px" }}
            />
            <h2
              style={{
                marginTop: "10px",
                color: "#4B0082",
                fontStyle: "italic",
              }}
            >
              Chào mừng đến với Harmon
            </h2>
          </div>
          <form style={{ marginTop: "30px" }} onSubmit={handleLogin}>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập email"
                required
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "40px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: "40%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#9C83E7",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          <p>
            Bạn chưa có tài khoản,{" "}
            <Link to={"/register"} style={{ color: "#4B0082" }}>
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
