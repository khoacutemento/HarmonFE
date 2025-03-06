import React, { useEffect, useState } from "react";
import { AppLayout } from "../../core/layouts/AppLayout";
import Banner from "../../assets/Banner.svg";
import { Layout } from "antd";
import { use } from "react";
import { getBlogs } from "../../services/blog";
import ReactQuill from "react-quill";
function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [size, setSize] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBlogs();
      setBlogs(res.items);
      console.log(res.items);

      // setBlogs(res);
    };
    fetchData();
  }, []);
  const formatContent = (content) => {
    return content
      .replace(/<p>/g, '<p class="blog-paragraph">')
      .replace(/<h1>/g, '<h1 class="blog-heading">')
      .replace(/<h2>/g, '<h2 class="blog-subheading">')
      .replace(/<strong>/g, '<strong class="blog-bold">');
  };

  return (
    <AppLayout
      components={
        <Layout
          style={{
            minHeight: "100vh",
            backgroundColor: "#EAE6FE",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "inline-block",
            }}
          >
            <img src={Banner} style={{ width: "100%", display: "block" }} />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#7E60BF",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "45px", margin: 0 }}>
                Blog
              </p>
              <p style={{ fontSize: "20px", margin: 0 }}>Home &gt; Blog</p>
            </span>
          </div>
          <div style={{ display: "flex", width: "80%", marginTop: "100px" }}>
            <div style={{ width: "70%" }}>
              {blogs && blogs.length > 0 ? (
                <div>
                  {blogs.map((blog, index) => {
                    return (
                      <div
                        style={{
                          maxWidth: "800px",
                          margin: "0 auto",
                          padding: "20px",
                        }}
                        key={index}
                      >
                        <h2
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            marginBottom: "15px",
                            color: "#333",
                          }}
                        >
                          {blog.title}
                        </h2>
                        <div
                          style={{
                            fontSize: "18px",
                            lineHeight: "1.8",
                            color: "#555",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: formatContent(blog.content),
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ color: "#9D74D7", fontSize: "30px" }}>
                  <p style={{ margin: 0 }}>
                    Rất tiếc, hiện tại không có bài viết nào để hiển thị.
                  </p>
                  <p style={{ margin: 0 }}>
                    Xin vui lòng quay lại sau để cập nhật thông tin mới nhất.
                  </p>
                </div>
              )}
            </div>
            <div style={{ width: "30%" }}></div>
          </div>
        </Layout>
      }
    />
  );
}

export default Blog;
