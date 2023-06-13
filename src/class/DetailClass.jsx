import React from "react";
import { useParams } from "react-router-dom";
import ReusableHeader from "../components/ReusableHeader";
import { Button, Image } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import { useContext } from "react";
import { DataCtx } from "../DataCtx/Datactx";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

export default function DetailClass() {
  const { id } = useParams();
  const { profile } = useContext(DataCtx);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  console.log(id);
  const [classData, setClassData] = useState([]);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/class/${id}/${profile.id}`);
        // console.log(response.data);
        setClassData(response.data);
        fetchImageClass();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchImageClass = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/class_image/${classData.class_code}`,
          {
            responseType: "blob",
          }
        );
        const blob = new Blob([response.data], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        setClassData({ ...classData, image: url });
        fetchUserData();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/user/${classData.lecture_id}`
        );
        setUsers(response.data);
        // console.log(response.data);
        setFirst(false);

        // fetchIsEnrolled();
      } catch (error) {
        console.error(error);
      }
    };

    if (first) {
      fetchClassData();
    }

    console.log(classData);
  }, [classData]);

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
              classData.image
                ? classData.image
                : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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

            {(classData.is_enrolled && profile.role == 1) || profile.role == 2 ? (
              <Button
                // type="primary"
                style={{
                  backgroundColor: "yellow",
                  borderColor: "yellow",
                  color: "black",
                }}
                className="btn-book-detail"
                onClick={() => {
                  navigate(`/class/${classData.id}`, {
                    state: {
                      classData: classData,
                    },
                  });
                }}
              >
                Go to Class
              </Button>
            ) : profile.role == 1 ? (
              <Button
                type="primary"
                className="btn-book-detail"
                onClick={() => {
                  navigate(`/enroll/${classData.id}`);
                }}
              >
                Enroll This class
              </Button>
            ) : null}
            {profile.role == 2 ? (
              <Button
                type="primary"
                className="btn-book-detail"
                onClick={() => {
                  navigate(`/manage_class/${classData.id}`, {
                    state: {
                      classData: classData,
                    },
                  });
                }}
              >
                Manage Class
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
