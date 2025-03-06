import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const PrivateRoute = ({ element, allowedRoles }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    toast.error("Bạn cần đăng nhập để truy cập trang này");
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const tokenNotExpired = decodedToken.exp * 1000 > Date.now();

    if (!tokenNotExpired) {
      toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      localStorage.removeItem("accessToken");
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(decodedToken.role)) {
      toast.error("Bạn không có quyền truy cập trang này");
      return <Navigate to="/" replace />;
    }

    return element;
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
