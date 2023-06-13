import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { useEffect, useState, useContext } from "react";
import { DataCtx } from "../DataCtx/Datactx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiUrl } from "../../data";
import { Input, Button, Modal } from "antd";
const { TextArea } = Input;
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import { Spin } from "antd";
import { message } from "antd";
import { Image } from "antd";

export default function Comment() {
  const { profile } = useContext(DataCtx);
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);
  const [item, setItem] = useState("");
  const [first, setFirst] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();
  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    // Handle the OK button click
    setVisible(false);
  };

  const handleCancel = () => {
    // Handle the Cancel button click
    setVisible(false);
  };

  useEffect(() => {
    const fetchFeedsData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/feeds/${id}`);
        setItem(response.data);
        console.log(response.data);
        // setFirst(false);

        if (response.data.image != "") {
          fetchImageFeeds();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchImageFeeds = async () => {
      try {
        const response = await axios.get(`${apiUrl}/image_feeds/${id}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "image/png" });
        const url = URL.createObjectURL(blob);
        setItem({ ...item, image: url });
        setIsLoading(false);
        setFirst(false);

        // fetchComment();
      } catch (error) {
        console.error(error);
      }
    };
    if (first) {
      fetchFeedsData();
    }
  }, [item]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comment/${id}`);
        setComment(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComment();
  }, []);

  const submitComment = () => {
    const data = {
      user_id: profile.id,
      feed_id: id,
      comment: commentText,
      // moment right now int value
      date: moment().unix(),
    };
    console.log(data);
    axios
      .post(apiUrl + "/comment", data)
      .then((res) => {
        console.log(res.data);
        setCommentText("");
        message.success("Comment posted");
        setTimeout(() => {
          navigate("/comment/" + id);

          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <ReusableHeader />
      <div className="feed-card mt-120">
        {isLoading ? (
          <Spin />
        ) : (
          <div>
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
            <Modal
              title="Example Modal"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are You sure you wanna delete it </p>
            </Modal>
            <div className="feed-content">
              {isLoading ? (
                <Spin />
              ) : (
                <div>
                  <Image
                    src={item.image}
                    style={{ marginBottom: 30 }}
                    width={500}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "";
                    }}
                  />
                </div>
              )}
              {/* <Image width={400} src={item.profile} /> */}
              {convertToHTML(item.caption)}
              <Button
                style={{ margin: 30, backgroundColor: "yellow" }}
                onClick={() => {
                  navigate(`/summary_book/${item.id}`, {
                    state: { detail: item.caption },
                  });
                }}
              >
                Summary
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="header-input-upload w-100persen">
        <img
          src="https://img.freepik.com/free-icon/user_318-159711.jpg"
          className="profile-img"
        />
        <div className="upload-input-data ">
          <TextArea
            rows={12}
            placeholder="Insert your caption"
            // maxLength={12}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          onClick={submitComment}
          style={{ backgroundColor: "darkblue", marginTop: 40 }}
          shape="circle"
          icon={<SendOutlined />}
        />
      </div>
      {
        <div className="feed-card mt-120">
          {comment.map((item) => (
            <div className="profile-feeds flex-center">
              <div className="comment-box">
                <p style={{ marginLeft: 30 }} className="comment-username">
                  {" "}
                  {item.username}{" "}
                </p>
                <p style={{ marginLeft: 30 }}>{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
}
