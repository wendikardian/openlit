import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { classData } from "../../data/Data";

export default function Class() {
  return (
    <div>
      <ReusableHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="class-title">Class</h1>
        <div className="class-container">
          {classData.map((item) => {
            return (
              <div className="class-card">
                <img
                  src={item.image}
                  alt=""
                />
                <div className="class-desc">
                  <h1>{item.name}</h1>
                  <p>Code class : {item.code}</p>
                  <p>lecturer : {item.lecturer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
