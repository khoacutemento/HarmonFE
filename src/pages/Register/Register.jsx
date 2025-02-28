import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSkSXuW2Rn2gOPThRo_XmU7LlaXGbceTVJ8hH40XPwjC1oJMBKentQ6xfpfFugoflI16Ld7_2JpqtyhxjqMHUaLSA"
  );
  const [weight, setWeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      setLoading(false);
      return;
    }

    try {
      localStorage.setItem("email", email);
      const response = await axios.post("https://harmon.love/api/v1/user", {
        username,
        password,
        fullName,
        email,
        phone,
        dateOfBirth,
        gender: Number(gender),
        avatarUrl,
        weight: Number(weight),
      });

      if (response.status === 201) {
        toast.success("Đăng ký thành công");
        navigate("/verify-otp");
      } else {
        toast.error("Đăng ký thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#9C83E7",
          paddingTop: "30px",
          paddingBottom: "30px",
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
              Đăng ký tài khoản với Harmon
            </h2>
          </div>
          <form style={{ marginTop: "30px" }} onSubmit={handleRegister}>
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
                placeholder="Nhập tên đăng nhập"
                required
                autoComplete="off"
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
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
                autoComplete="new-password"
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Xác nhận lại mật khẩu
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập xác nhận lại mật khẩu"
                required
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Họ tên
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập họ tên"
                required
              />
            </div>

            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Số điện thoại
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Địa chỉ Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập địa chỉ Email"
                required
                autoComplete="off"
              />
            </div>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Giới tính
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  color: "#4B0082",
                  marginBottom: "15px",
                }}
              >
                Ngày tháng năm sinh
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập ngày tháng năm sinh"
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
                Cân nặng (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                style={{
                  width: "90%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #9C83E7",
                  backgroundColor: "#E0D6FF",
                }}
                placeholder="Nhập cân nặng"
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
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>
          <p>
            Bạn đã có tài khoản?{" "}
            <Link
              to={"/login"}
              style={{ color: "#4B0082", textDecoration: "none" }}
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
