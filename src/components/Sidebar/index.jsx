import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ currentPath }) {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const routeMapping = {
      1: "/",
      2: "/discover",
      3: "/chat",
      4: "/experts",
      5: "/community",
      6: "/friends",
      7: "/blog",
    };

    if (routeMapping[e.key]) {
      navigate(routeMapping[e.key]);
    }
  };
  return (
    <Sider width={300} theme="light">
      <Menu
        onClick={handleMenuClick}
        mode="inline"
        defaultSelectedKeys={["5"]}
        style={{
          height: "100%",
          borderRight: 0,
          textAlign: "start",
          fontSize: "16px",
          color: "rgba(126, 96, 191, 1)",
          background: "rgba(205, 193, 255, 1)",
        }}
        items={[
          { key: "1", label: "Về Harmon" },
          { key: "2", label: "Khám Phá" },
          { key: "3", label: "Trò Chuyện" },
          { key: "4", label: "Chuyên Gia" },
          { key: "5", label: "Cộng Đồng" },
          { key: "6", label: "Bạn Bè" },
        ]}
      />
    </Sider>
  );
}

export default Sidebar;
