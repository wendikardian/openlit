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
import { useEffect } from "react";

export default function Answer() {
  const { profile } = useContext(DataCtx);
  const navigate = useNavigate();
  const location = useLocation();
  const question = location.state.question;
  const book_id = location.state.book_id;
  const { id } = useParams();
  const [answer, setAnswer] = useState([]);
  console.log(question, id);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await axios.get(`${apiUrl}/answer/${id}`);
        console.log(response.data);
        setAnswer(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnswer();
  }, []);

  return (
    <div>
      <ReusableHeader />
      <div className="edit-box-container">
        <h1 className="mb-10 mt-10">See Answer ! </h1>
        <label htmlFor="username " style={{ marginTop: 40 }}>
          {" "}
          {question}{" "}
        </label>
        {answer.map((item) => (
            <div className="profile-feeds flex-center mt-10">
              <div className="comment-box">
                <div className="flex space-evenly">

                <p style={{ marginLeft: 30 }} className="comment-username ">
                  {" "}
                  {item.name}{" "}
                </p>
                <p>
                    {moment.unix(item.date).format("DD-MM-YYYY")}{" "}
                </p>
                </div>
                <p style={{ marginLeft: 30 }}>{item.answer}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
