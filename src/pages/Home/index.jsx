import React, { useState } from "react";
import Harmon_Banner from "../../assets/Harmon_Banner.png";
import Harmon_Logo from "../../assets/Harmon_Logo.png";
import { Layout } from "antd";
import { AppLayout } from "../../core/layouts/AppLayout";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button.jsx";
import { HiOutlineGif } from "react-icons/hi2";
import { CiHashtag } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
function Home() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <AppLayout
      components={
        <Layout style={{ minHeight: "100vh" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={Harmon_Banner}
              alt="Harmon_Banner"
              style={{ width: "70%", height: "70%" }}
            />
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }} // Bắt đầu từ dưới và mờ
              animate={inView ? { opacity: 1, y: 0 } : {}} // Khi thấy sẽ hiện lên
              transition={{ duration: 0.8, ease: "easeOut" }} // Mượt hơn
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "200px",
                marginTop: "50px",
                marginBottom: "50px",
                width: "70%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <img
                  src={Harmon_Logo}
                  alt="Harmon_Logo"
                  style={{ width: "250px", height: "250px" }}
                />
                <h1
                  style={{
                    color: "#9854DB",
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "50px",
                  }}
                >
                  HARMON
                </h1>
                <h4
                  style={{
                    color: "#BA56E9",
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  Nơi cảm xúc được lắng nghe
                </h4>
                <div
                  style={{ color: "#B467FF", width: "70%", fontSize: "18px" }}
                >
                  Harmon là không gian an toàn để bạn chia sẻ cảm xúc mà không
                  lo lắng về quyền riêng tư. Tại đây, bạn có thể trò chuyện với
                  chuyên gia tâm lý, kết nối với những người bạn đồng trang lứa
                  hoặc tìm lời khuyên sâu sắc từ các Tarot reader. Dù bạn đang
                  cần sự thấu hiểu hay chỉ muốn ai đó lắng nghe, Harmon luôn là
                  chốn dừng chân bình yên để bạn tìm lại cân bằng và sức mạnh
                  nội tâm.
                </div>
                <Button
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                  text={"Trải nghiệm ngay"}
                  onClick={() => navigate("/chat")}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <h4
                  style={{
                    color: "#9854DB",
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  Thấu hiểu chính mình
                </h4>
                <div
                  style={{ color: "#B467FF", width: "70%", fontSize: "18px" }}
                >
                  Bạn có bao giờ tự hỏi cảm xúc của mình đang ở trạng thái nào
                  hay tâm lý của bạn đang chịu ảnh hưởng bởi điều gì? Bài test
                  cảm xúc và tâm lý là công cụ giúp bạn hiểu rõ hơn về thế giới
                  nội tâm của mình — từ mức độ căng thẳng, lo âu, đến sức khỏe
                  tinh thần tổng quát. Thông qua những câu hỏi khoa học, bài
                  test sẽ cung cấp cái nhìn sâu sắc về tâm trạng hiện tại, giúp
                  bạn nhận diện cảm xúc và tìm ra hướng đi để chăm sóc bản thân
                  tốt hơn. Hãy dành một chút thời gian để kết nối với chính
                  mình!
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <h4
                  style={{
                    color: "#9854DB",
                    margin: 0,
                    fontWeight: "bold",
                    fontSize: "35px",
                  }}
                >
                  Hòm thư cảm xúc
                </h4>
                <div
                  style={{ color: "#B467FF", width: "70%", fontSize: "18px" }}
                >
                  Đôi khi, chỉ cần nói ra cũng là bước đầu tiên để cảm thấy nhẹ
                  lòng hơn. Hãy thoải mái chia sẻ những vướng mắc của bạn — dù
                  là căng thẳng, rối bời hay những câu hỏi chưa tìm được lời
                  giải. Dựa trên những tâm sự ấy, chúng tôi sẽ kết nối bạn với
                  chuyên gia tâm lý, người lắng nghe đồng cảm hoặc Tarot reader
                  phù hợp nhất. Đừng ngại mở lòng, vì luôn có ai đó sẵn sàng
                  lắng nghe và đồng hành cùng bạn trên hành trình tìm lại sự cân
                  bằng.
                </div>
                <Button
                  isHovered={isHovered}
                  setIsHovered={setIsHovered}
                  text={"Khám phá ngay"}
                  onClick={() => navigate("/")}
                />
                <div
                  style={{
                    backgroundColor: "#ECCFFF",
                    width: "70%",
                    borderRadius: "15px",
                    marginTop: "30px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                    }}
                  >
                    <img
                      src="https://t3.ftcdn.net/jpg/05/70/71/06/360_F_570710660_Jana1ujcJyQTiT2rIzvfmyXzXamVcby8.jpg"
                      alt="None_Avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                      }}
                    />
                    <textarea
                      type="text"
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        width: "100%",
                        outline: "none",
                        color: "#B467FF",
                        fontSize: "18px",
                        padding: "10px",
                        borderRadius: "10px",
                        marginLeft: "10px",
                        rowGap: "5",
                        "::placeholder": { color: " #B467FF" },
                      }}
                      placeholder="Đây là nơi để bạn chia sẻ tất cả mọi thứ"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      padding: "10px",
                    }}
                  >
                    <HiOutlineGif
                      style={{ fontSize: "25px", color: "#BA56E9F5" }}
                    />
                    <CiHashtag
                      style={{ fontSize: "25px", color: "#BA56E9F5" }}
                    />
                    <FaRegComment
                      style={{ fontSize: "25px", color: "#BA56E9F5" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Layout>
      }
    />
  );
}

export default Home;
