import { Menu, Input, Dropdown, Avatar, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { logout } from "../../redux/slice/authSlice"; // Import action logout

const { Search } = Input;

const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const userMenu = (
    <Menu
      items={[
        {
          key: "profile",
          label: "Trang cá nhân",
          onClick: () => navigate("/profile"),
        },
        {
          key: "logout",
          label: "Đăng xuất",
          onClick: () => dispatch(logout()),
        },
      ]}
      style={{ backgroundColor: "#EAE6FE" }}
    />
  );

  const items = [
    { key: "1", label: "Giới Thiệu", onClick: () => navigate("/home") },
    { key: "2", label: "Premium", onClick: () => navigate("/about") },
    { key: "3", label: "Hỗ Trợ", onClick: () => navigate("/services") },
    { key: "4", label: "Đặt Lịch", onClick: () => navigate("/contact") },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 9999,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background:
          "linear-gradient(180deg, #C6ACFF 0%, #D19FFF 46%, #E4B1F0 100%)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <div
          className="demo-logo"
          style={{
            color: "#fff",
            fontWeight: "bold",
            width: "50px",
            height: "50px",
            marginRight: "16px",
          }}
        >
          <img
            src="public/logo/logo.png"
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Search Bar */}
        <Search
          placeholder="Search..."
          allowClear
          onSearch={(value) => console.log("Search:", value)}
          style={{ marginLeft: "5%", maxWidth: "400px", flex: 1 }}
        />
      </div>

      {/* Menu */}
      <Menu
        style={{
          flex: 0.3,
          minWidth: "300px",
          background:
            "linear-gradient(180deg, #C6ACFF 0%, #D19FFF 46%, #E4B1F0 100%)",
          color: "#433878",
        }}
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
      />

      {!user ? (
        <Menu
          style={{
            flex: 0.1,
            background: "transparent",
            color: "#433878",
            width: "100%",
          }}
          mode="horizontal"
          items={[
            { key: "5", label: "Đăng Nhập", onClick: () => navigate("/login") },
          ]}
        />
      ) : (
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <Space style={{ cursor: "pointer", paddingRight: "20px" }}>
            <Avatar
              size={40}
              src={
                user.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6SHQl3YqKukQqCaF62QiWfvT2h1fHXcWmhw&s"
              }
              style={{ objectFit: "cover" }}
            />

            <span style={{ color: "#433878", fontWeight: "bold", marginRight: "5px" }}>
              {user.name}
            </span>
            <DownOutlined style={{ color: "#433878" }} />
          </Space>
        </Dropdown>
      )}
    </Header>
  );
};

export default AppHeader;
