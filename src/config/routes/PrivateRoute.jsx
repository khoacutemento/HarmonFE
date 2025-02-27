import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

const PrivateRoute = ({ element, allowedRoles }) => {
  const accessToken = localStorage.getItem("accessToken");
  let isAuthenticated = false;

  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      const tokenNotExpired = decodedToken.exp * 1000 > Date.now();

      if (tokenNotExpired) {
        if (decodedToken.role === allowedRoles) {
          isAuthenticated = true;
        } else {
          toast.error("Bạn không có quyền truy cập trang này");
          return <Navigate to="/" replace />;
        }
      } else {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
        localStorage.removeItem("accessToken");
        return <Navigate to="/login" replace />;
      }
    } catch (error) {
      console.error("Token không hợp lệ:", error);
      localStorage.removeItem("accessToken");
    }
  }

  if (!isAuthenticated) {
    toast.error("Bạn cần đăng nhập để truy cập trang này");
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
