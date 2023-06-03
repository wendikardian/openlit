import React, { useState } from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { Input } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext } from "react";

const { Search } = Input;

export default function Assistant() {
  const [prompt, setPrompt] = useState("Hello, how can I help you?");
  const [chatLog, setChatLog] = useState([]);
  const { profile, setProfile } = useContext(DataCtx);
  useEffect( () => {
     axios.get(apiUrl + "/chatlog/" + profile.id).then((res) => {
      console.log(res.data);
      setChatLog(res.data);
    });
  }, [chatLog]);

  const handleSubmit = async () => {
    console.log("submit");
    let newChatLog = [...chatLog, { user: "me", message: prompt }];
    setChatLog(newChatLog);
    setPrompt("");
    const data = {
      user_id: profile.id,
      message: prompt,
      date: new Date(),
    };
    const response = await axios.post(apiUrl + "/chat", data).then((res) => {
      console.log(res.data);
    });

    await axios.get(apiUrl + "/chatlog/" + profile.id).then((res) => {
      console.log(res.data);
      setChatLog(res.data);
    });
  };
  return (
    <div>
      <ReusableHeader />
      <div className="virtual-content">
        <h1 className="class-title">Assistant</h1>
        <div className="chat-container">
          {chatLog.map((chat) => {
            return (
              <div className={chat.is_from_user ? "chat-box" : "chat-box bot"}>

                {chat.is_from_user ? <p>{profile.name}</p> : <p>BOT</p>}
                <p></p>
                <p>{chat.message}</p>
              </div>
            );
          })}

          <div className="chat-box">
            <p>Me : </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo
              iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa
              cumque, officiis itaque hic architecto animi facilis maxime
              sapiente veniam quibusdam.
            </p>
          </div>
          <div className="chat-box bot">
            <p>Bot : </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo
              iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa
              cumque, officiis itaque hic architecto animi facilis maxime
              sapiente veniam quibusdam.
            </p>
          </div>
          <div className="chat-box">
            <p>Me : </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo
              iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa
              cumque, officiis itaque hic architecto animi facilis maxime
              sapiente veniam quibusdam.
            </p>
          </div>
          <div className="chat-box bot">
            <p>Me : </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo
              iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa
              cumque, officiis itaque hic architecto animi facilis maxime
              sapiente veniam quibusdam.
            </p>
          </div>
          <div className="chat-box">
            <p>Me : </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo illo
              iste eaque voluptas perspiciatis beatae ea deserunt rerum ipsa
              cumque, officiis itaque hic architecto animi facilis maxime
              sapiente veniam quibusdam.
            </p>
          </div>
        </div>
        <div className="text-form">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Send"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            size="large"
            style={{ backgroundColor: "#06C2FA" }}
            event
            if
            the
            search
            button
            clicked
            onSearch={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
