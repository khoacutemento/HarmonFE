import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://harmon.love/api/v1/user/verify-otp",
        {
          email: localStorage.getItem("email"),
          otp: otp.join(""),
        }
      );

      if (response.status === 200) {
        toast.success("Xác thực thành công");
        navigate("/login");
      } else {
        toast.error("Mã OTP không đúng");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "https://harmon.love/api/v1/user/resend-otp",
        JSON.stringify(email),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Mã OTP đã được gửi lại");
      } else {
        toast.error("Không thể gửi lại mã OTP");
      }
    } catch (error) {
      toast.error("Không thể gửi lại mã OTP");
      console.log(error);
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
          <img
            src="public/logo/logo.png"
            alt="Logo"
            style={{ width: "80px", height: "80px" }}
          />
          <h2 style={{ color: "#4B0082", fontStyle: "italic" }}>
            Xác thực OTP
          </h2>
          <p style={{ color: "#4B0082" }}>
            Nhập mã OTP đã gửi đến email của bạn
          </p>

          <form style={{ marginTop: "30px" }} onSubmit={handleVerify}>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              {otp.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  maxLength="1"
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "20px",
                    borderRadius: "5px",
                    border: "1px solid #9C83E7",
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              style={{
                marginTop: "20px",
                width: "50%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#9C83E7",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Đang xác thực..." : "Xác nhận"}
            </button>
          </form>

          <p style={{ marginTop: "20px", color: "#4B0082" }}>
            Bạn vẫn chưa nhận được mã OTP? <br />
            <br />
            <span
              style={{
                color: "#4B008",
                cursor: "pointer",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              onClick={handleResendOtp}
            >
              Bấm vào đây để gửi lại
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
