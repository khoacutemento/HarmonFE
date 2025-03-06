import React from "react";
import { GoSearch } from "react-icons/go";

function Search() {
  return (
    <div style={{ width: "100%", position: "relative" }}>
      <GoSearch
        style={{
          position: "absolute",
          left: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#8327DE",
          fontSize: "20px",
        }}
      />
      <input
        type="text"
        placeholder="Search..."
        style={{
          width: "100%",
          height: "50px",
          borderRadius: "25px",
          border: "1px solid #8327DE",
          paddingLeft: "45px",
          fontSize: "20px",
          color: "#8327DE",
          backgroundColor: "#ECCFFF",
          outline: "none",
          "::placeholder": {
            color: " #8327DE",
            opacity: 1,
          },
        }}
      />
    </div>
  );
}

export default Search;
