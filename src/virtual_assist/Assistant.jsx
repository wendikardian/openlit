import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { Input } from "antd";
import { useEffect } from "react";

const { Search } = Input;

export default function Assistant() {
  return (
    <div>
      <ReusableHeader />
      <div className="virtual-content">
        <h1 className="class-title">Assistant</h1>
        <div className="chat-container">
          <div className="chat-box">
            <p>Me : </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa cumque, officiis itaque hic architecto animi facilis maxime sapiente veniam quibusdam.</p>
          </div>
          <div className="chat-box bot">
            <p>Bot : </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa cumque, officiis itaque hic architecto animi facilis maxime sapiente veniam quibusdam.</p>
          </div>
          <div className="chat-box">
            <p>Me : </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa cumque, officiis itaque hic architecto animi facilis maxime sapiente veniam quibusdam.</p>
          </div>
          <div className="chat-box bot">
            <p>Me : </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa cumque, officiis itaque hic architecto animi facilis maxime sapiente veniam quibusdam.</p>
          </div>
          <div className="chat-box">
            <p>Me : </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa cumque, officiis itaque hic architecto animi facilis maxime sapiente veniam quibusdam.</p>
          </div>
        </div>
        <div className="text-form">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Send"
            size="large"
            style={{ backgroundColor: "#06C2FA" }}
          />
        </div>
      </div>
    </div>
  );
}
