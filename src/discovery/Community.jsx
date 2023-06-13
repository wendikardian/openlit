import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { SendOutlined } from "@ant-design/icons";
import "./style.css";
import { Input, Button } from "antd";
import { posting } from "../../data/Data";
import { Image } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../data";
import { DataCtx } from "../DataCtx/Datactx";
import { useContext } from "react";
import { Spin, Modal } from "antd";
import { ButtonComponent } from "../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { message } from "antd";
import moment from "moment";
import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

export default function Community() {
  const { TextArea } = Input;
  const [post, setPost] = useState([]);
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const { profile } = useContext(DataCtx);
  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }

  const deleteFeeds = (id) => {
    axios
      .delete(`${apiUrl}/feeds/${id}`)
      .then(() => {
        message.success("Post Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        message.error("Error deleting feed");
      });
  };

  const showModal = (id) => {
    setVisible(true);
    setSelectedId(id);
  };

  const handleOk = () => {
    // Handle the OK button click
    setVisible(false);
    deleteFeeds(selectedId);
  };

  const handleCancel = () => {
    // Handle the Cancel button click
    setVisible(false);
  };
  useEffect(() => {
    console.log("working");
    if (post.length === 0 && first) {
      axios
        .get(apiUrl + "/feeds")
        .then((res) => {
          setPost(res.data);
          setFirst(false);
          // console.log(post);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    const fetchImageData = async () => {
      if (post.length !== 0 && !first && second) {
        try {
          const newData = await Promise.all(
            post.map(async (item) => {
              console.log("HEIII");
              const response = await axios.get(
                `${apiUrl}/image_feeds/${item.id}`,
                {
                  responseType: "blob",
                }
              );
              const blob = new Blob([response.data], { type: "image/png" });
              const url = URL.createObjectURL(blob);
              console.log(url);
              item.imageData = url;
              console.log(item);
              // check if this is the last data
              if (item.id === post[post.length - 1].id) {
                setIsLoading(false);
              }

              return item;
            })
          );
          setPost(newData);
          console.log(post);
          setSecond(false);

          console.log(classData);
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      }
    };

    fetchImageData();
  }, [post]);
  return (
    <div>
      <ReusableHeader />
      <ButtonComponent
        text="Create Posting"
        style={{ marginTop: 150 }}
        onClick={() => navigate("/create-posting")}
      />
      <Modal
        title="Example Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are You sure you wanna delete it </p>
      </Modal>
      <div className="feed-cont">
        {isLoading ? (
          <div className="loading">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            {post.map((item) => {
              // console.log(item);
              return (
                <div className="feed-card">
                  <div className="profile-feeds">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                        className="profile-img"
                      />
                      <p style={{ marginLeft: 30 }}>{item.username}</p>
                    </div>
                    <p>
                      {/* covert date moment to actual date */}
                      {moment(item.created_at).format("DD MMMM YYYY")}
                    </p>
                  </div>
                  <div className="feed-content">
                    <Image
                      src={item.imageData}
                      style={{ marginBottom: 30 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                    {/* <Image width={400} src={item.profile} /> */}
                    {convertToHTML(item.caption)}
                  </div>

                  <div className="box-comment">
                    <CommentOutlined
                      className="icon"
                      onClick={() => {
                        navigate(`/comment/${item.id}`);
                      }}
                    />
                    {profile.id == item.fk_user ? (
                      <div className="edit-option">
                        <DeleteOutlined
                          style={{ marginRight: 30 }}
                          className="icon"
                          onClick={() => {
                            showModal(item.id);
                          }}
                        />
                        <EditOutlined
                          className="icon"
                          onClick={() => {
                            navigate(`/edit-posting/${item.id}`);
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
