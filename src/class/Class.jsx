import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import "./style.css";
import { classData } from "../../data/Data";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { apiUrl } from "../../data";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DataCtx } from "../DataCtx/Datactx";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";

export default function Class() {
  const [classData, setClassData] = useState([]);
  const { profile } = useContext(DataCtx);
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (classData.length === 0 && first) {
      axios.get(`${apiUrl}/all_classes/`).then((res) => {
        // console.log(res.data);
        setClassData(res.data);
        setFirst(false);
      });
    }

    const fetchImageData = async () => {
      if (classData.length !== 0 && !first && second) {
        try {
          const newData = await Promise.all(
            classData.map(async (item) => {
              console.log("HEIII");
              const response = await axios.get(
                `${apiUrl}/class_image/${item.class_code}`,
                {
                  responseType: "blob",
                }
              );
              const blob = new Blob([response.data], { type: "image/png" });
              const url = URL.createObjectURL(blob);
              item.image = url;
              console.log(item);
              return item;
            })
          );

          setClassData(newData);
          setSecond(false);
          console.log(classData);
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      }
    };

    fetchImageData();
  }, [classData]);

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
            // console.log(item);
            return (
              // link to /class/detail/id

              <div className="class-card"
              onClick={() => {
                navigate(`/class/detail/${item.id}`);
              }}
              >
                <img src={item.image} alt="" />
                <div className="class-desc">
                  <h1>{item.class_name}</h1>
                  <p>Code class : {item.class_code}</p>
                  <p>lecturer : {item.lecturer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/add-class">
        <div className="add-class">
          <PlusOutlined />
        </div>
      </Link>
    </div>
  );
}
