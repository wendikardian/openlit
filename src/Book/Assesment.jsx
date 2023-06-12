import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext } from "react";
import moment from "moment";
import { message } from "antd";
import { apiUrl } from "../../data";
import axios from "axios";

export default function Assesment() {
  const { profile } = useContext(DataCtx);
  const navigate = useNavigate();
  const location = useLocation();
  const question = location.state.question;
  const book_id = location.state.book_id;
  const { id } = useParams();
  const [answer, setAnswer] = useState("");
  console.log(question, id);

  const saveData = () => {
    const data = {
      subbook_id: id,
      user_id: profile.id,
      answer: answer,
      date: moment().unix(),
    };

    console.log(data);
    axios
      .post(apiUrl + "/answer", data)
      .then((res) => {
        message.success("Answer Submitted Successfully");
        navigate("/read-book/" + book_id);
      })
      .catch((err) => {
        message.error("Error in submitting answer");
      });
  };

  return (
    <div>
      <ReusableHeader />
      <div className="edit-box-container">
        <h1 className="mb-10 mt-10">Question ! </h1>
        <label htmlFor="username " style={{ marginTop: 40 }}>
          {" "}
          {question}{" "}
        </label>
        <div className="class-input-container">
          <div className="form-data">
            <input
              type="text"
              value={answer}
              style={{ width: "90%" }}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
        <button onClick={saveData}>Answer !</button>
      </div>
    </div>
  );
}
