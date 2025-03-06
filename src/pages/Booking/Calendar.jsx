import React from "react";

const Calendar = () => {
  const calendarStyle = {
    width: "250px",
    padding: "15px",
    backgroundColor: "#eacaff",
    borderRadius: "10px",
    boxShadow: "0 0 8px #4a59ff",
    textAlign: "center",
  };

  const headerStyle = {
    margin: "0",
    fontWeight: "bold",
    color: "#5a3c84",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
    marginTop: "10px",
    color: "#5a3c84",
  };

  const selectedDayStyle = {
    backgroundColor: "#9156c7",
    color: "white",
    borderRadius: "50%",
    padding: "5px",
  };

  return (
    <div style={calendarStyle}>
      <p style={headerStyle}>Tháng 1 2025 ▼</p>
      <div style={gridStyle}>
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sa</span>
        <span>Sn</span>
      </div>
      <div style={gridStyle}>
        <span></span>
        <span></span>
        <span></span>
        <span>01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
        <span>05</span>
        <span>06</span>
        <span>07</span>
        <span>08</span>
        <span style={selectedDayStyle}>09</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
        <span>14</span>
        <span>15</span>
        <span>16</span>
        <span>17</span>
        <span>18</span>
        <span>19</span>
        <span>20</span>
        <span>21</span>
        <span>22</span>
        <span>23</span>
        <span>24</span>
        <span>25</span>
        <span>26</span>
        <span>27</span>
        <span>28</span>
        <span>29</span>
        <span>30</span>
        <span>31</span>
      </div>
    </div>
  );
};

export default Calendar;
