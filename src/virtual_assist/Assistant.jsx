import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { Input } from "antd";

const { Search } = Input;

export default function Assistant() {
  return (
    <div>
      <ReusableHeader />
      <div className="virtual-content">
        <h1 className="class-title">Assistant</h1>
        <div className="text-form">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Send"
            size="large"
            style={{backgroundColor: "#06C2FA"}}
          />
        </div>
      </div>
    </div>
  );
}
