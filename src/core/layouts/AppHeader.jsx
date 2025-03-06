import { Menu, Input, Dropdown, Avatar, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { logout } from "../../redux/slice/authSlice";
import { FaBell } from "react-icons/fa6";
import Logo from "../../assets/Harmon_Logo.png";
const { Search } = Input;

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [currentPath, setCurrentPath] = useState("/");
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // const userMenu = (
  //   <Menu
  //     items={[
  //       {
  //         key: "profile",
  //         label: "Trang cá nhân",
  //         onClick: () => navigate("/profile"),
  //       },
  //       {
  //         key: "logout",
  //         label: "Đăng xuất",
  //         onClick: () => dispatch(logout()),
  //       },
  //     ]}
  //     style={{ backgroundColor: "#EAE6FE" }}
  //   />
  // );

  const items = [
    { key: "1", label: "Trò chuyện", path: "/chat" },
    { key: "2", label: "Góc tâm sự", path: "/" },
    { key: "3", label: "Chuyên gia", path: "/expert" },
    { key: "4", label: "Bạn bè", path: "/fsdfds" },
    { key: "5", label: "Premium", path: "/premium" },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        width: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background:
          "linear-gradient(180deg, #C6ACFF 0%, #D19FFF 46%, #E4B1F0 100%)",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: "10px",
        marginBottom: "20px",
        paddingTop: "40px",
        paddingBottom: "40px",
        borderRadius: "25px",
        color: "#8327DE",
      }}
    >
      {/* Logo */}
      <div
        style={{ display: "flex", alignItems: "center" }}
        onClick={() => navigate("/")}
      >
        <div
          className="demo-logo"
          style={{
            color: "#fff",
            fontWeight: "bold",
            width: "60px",
            height: "60px",
            marginRight: "16px",
            cursor: "pointer",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Search Bar */}
        {/* <Search
          placeholder="Search..."
          allowClear
          onSearch={(value) => console.log("Search:", value)}
          style={{ marginLeft: "5%", maxWidth: "400px", flex: 1 }}
        /> */}
      </div>

      {/* Menu */}

      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          textDecoration: "none",
          listStyle: "none",
          width: "50%",
          margin: 0,
          padding: 0,
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "18px",
          lineHeight: "250%",
        }}
      >
        {items.map((item, index) => {
          const isActive = currentPath === item.path;
          return (
            <li
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                borderBottom: isActive ? "1px solid" : "none",
                padding: "5px 10px",
                paddingBottom: "5px",
                borderRadius: "5px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(131, 39, 222, 0.1)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <FaBell style={{ fontSize: "18px", cursor: "pointer" }} />
          <div
            style={{
              backgroundColor: "#BB76FF",
              color: "white",
              width: "10px",
              height: "10px",
              padding: "10px",
              borderRadius: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "10px",
              position: "absolute",
              top: "-13px",
              right: "-13px",
            }}
          >
            10
          </div>
        </div>
        {!user ? (
          <div
            style={{
              background: "transparent",
              color: "#8327DE",
              width: "100%",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "250%",
            }}
          >
            <span
              style={{
                cursor: "pointer",
                color: "#8327DE",
                fontWeight: "bold",
                padding: "10px 15px",
                borderRadius: "5px",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(131, 39, 222, 0.1)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
              onClick={() => navigate("/login")}
            >
              Đăng Nhập
            </span>
          </div>
        ) : (
          <div
            ref={dropdownRef}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              paddingRight: "20px",
              position: "relative",
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {/* Avatar */}
            <img
              src={
                user.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SHQl3YqKukQqCaF62QiWfvT2h1fHXcWmhw&s"
              }
              alt="User Avatar"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />

            <span
              style={{
                color: "#8327DE",
                fontWeight: "bold",
                marginLeft: "10px",
                marginRight: "5px",
              }}
            >
              {user.name}
            </span>

            <span
              style={{
                fontSize: "14px",
                color: "#8327DE",
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.2s ease",
              }}
            >
              ▼
            </span>

            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-170px",
                  right: 0,
                  background:
                    "linear-gradient(180deg, #C6ACFF 0%, #D19FFF 46%, #E4B1F0 100%)",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "5px",
                  padding: "10px",
                  minWidth: "150px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    color: "#8327DE",
                    fontWeight: "bold",
                    borderBottom: "1px solid #eee",
                  }}
                  onClick={() => navigate("/profile")}
                >
                  Hồ sơ
                </span>
                <span
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    dispatch(logout());
                    setIsDropdownOpen(false);
                  }}
                >
                  Đăng xuất
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
