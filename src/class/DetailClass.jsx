import React from "react";
import { useParams } from "react-router-dom";
import ReusableHeader from "../components/ReusableHeader";
import { Button, Image } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import ReactHtmlParser from "react-html-parser";

export default function DetailClass() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  console.log(id);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/class/${id}`);
        console.log(response.data);
        setClassData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/${classData.lecture_id}`);
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClassData();
    fetchUserData();
    console.log(classData);
  }, []);

  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }

  return (
    <div>
      <ReusableHeader />
      <div className="container mx-auto">
        <div className="book-detail-info .wrap">
          <Image
            src={
              "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
            }
            width={500}
          />
          <div className="book-detail-desc">
            <h1 className="book-detail-title">Class Detail</h1>
            <h1>
              <span className="bold">Class Name </span> : {classData.class_name}
            </h1>
            <p>
              {" "}
              <span className="bold"> Class Code </span> :{" "}
              {classData.class_code}
            </p>
            <p>
              {" "}
              <span className="bold"> Lecture </span> : {users.name}
            </p>
            <h1>
              {" "}
              <span className="bold"> Description : </span>{" "}
            </h1>
            <div>{convertToHTML(classData.description)}</div>

            <Button type="primary" className="btn-book-detail">
              Read
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
