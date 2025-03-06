import React, { useEffect, useState } from "react";
import { AppLayout } from "../../core/layouts/AppLayout";
import { Layout } from "antd";
import ExpertDetail from "./ExpertDetail";
import { useParams } from "react-router-dom";
import { getExpertById } from "../../services/expert";
import Calendar from "./Calendar";
import Content from "./Content";

function Booking() {
  const { id } = useParams();
  const [expert, setExpert] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await getExpertById(id);
      setExpert(res.data);
    };
    fetchData();
  }, []);
  return (
    <AppLayout
      components={
        <Layout
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "row",
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
              width: "30%",
            }}
          >
            <ExpertDetail expert={expert} />
            <Calendar />
          </div>
          <div style={{ width: "70%" }}>
            <Content />
          </div>
        </Layout>
      }
    />
  );
}

export default Booking;
