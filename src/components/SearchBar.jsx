import React from "react";

const SearchBar = ({ input, onChange, onSearchClick }) => {
  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem"
  };
  return (
    <div>
      <input
        style={BarStyling}
        key="random1"
        value={input}
        placeholder={"請輸入關鍵字搜尋"}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      />
      <button onClick={onSearchClick && onSearchClick}>搜尋</button>
    </div>
  );
};

export default SearchBar;
