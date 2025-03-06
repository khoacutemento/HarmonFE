import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { BsBook } from "react-icons/bs";
import { PiNotePencilDuotone } from "react-icons/pi";
function Content() {
  const times = [
    { key: "1", startTime: "8:00", endTime: "11:30" },
    { key: "2", startTime: "13:30", endTime: "17:00" },
    { key: "3", startTime: "19:00", endTime: "22:30" },
  ];
  const rentalPeriod = [
    { key: "1", label: "30 phút", value: "30 minutes" },
    { key: "2", label: "1 tiếng", value: "1 hour" },
    { key: "3", label: "2 tiếng", value: "2 hours" },
  ];

  const problemEncountered = [
    {
      key: "1",
      label: "Rối loạn lo âu",
      value: "Rối loạn lo âu",
    },
    {
      key: "2",
      label: "Trầm cảm",
      value: "Trầm cảm",
    },
    {
      key: "3",
      label: "PTSD",
      value: "PTSD",
    },
    {
      key: "4",
      label: "OCD",
      value: "OCD",
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "50px",
        width: "100%",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "50px",
          width: "70%",
        }}
      >
        {times.map((time, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "#ECCFFF",
                padding: "20px",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  color: "#8327DE",
                }}
              >
                {time.startTime} - {time.endTime}
              </span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
          width: "70%",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#8327DE",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <IoCalendarOutline /> Thời gian cho thuê
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "20px",
          }}
        >
          {rentalPeriod.map((period, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  color: "#8327DE",
                  fontSize: "16px",
                }}
              >
                <input
                  type="radio"
                  id={period.label}
                  name="rentalPeriod"
                  style={{
                    border: "2px solid #8327DE",
                    accentColor: "#8327DE",
                    cursor: "pointer",
                  }}
                />
                <label htmlFor={period.label} style={{ cursor: "pointer" }}>
                  {period.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
          width: "70%",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#8327DE",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <BsBook /> Vấn đề gặp phải
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "20px",
          }}
        >
          {problemEncountered.map((problem, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  color: "#8327DE",
                  fontSize: "16px",
                }}
              >
                <input
                  type="radio"
                  id={problem.label}
                  name="problemEncountered"
                  style={{
                    border: "2px solid #8327DE",
                    accentColor: "#8327DE",
                    cursor: "pointer",
                  }}
                />
                <label htmlFor={problem.label} style={{ cursor: "pointer" }}>
                  {problem.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "20px",
          width: "70%",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#8327DE",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <PiNotePencilDuotone /> Yêu cầu của bạn (Nếu có)
        </span>
        <textarea
          placeholder="Hãy viết về yêu cầu của bạn ở đây nhé"
          style={{
            backgroundColor: "#ECCFFF",
            border: "none",
            outline: "none",
            width: "100%",
            padding: "20px",
            color: "#B467FF9E",
            borderRadius: "10px",
            fontSize: "16px",
          }}
          rows={8}
        />
      </div>
      <button
        style={{
          backgroundColor: "#ECCFFF",
          color: "#8A55D4",
          border: "none",
          padding: "20px 100px",
          borderRadius: "10px",
          fontSize: "18px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        Đặt lịch
      </button>
    </div>
  );
}

export default Content;
