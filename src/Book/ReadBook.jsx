import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../data";
import { useState, useEffect } from "react";
import { Image, Button } from "antd";
import ReactHtmlParser from "react-html-parser";
import { DataCtx } from "../DataCtx/Datactx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { message } from "antd";
import { Collapse } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const { Panel } = Collapse;

export default function ReadBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [subBook, setSubBook] = useState([{}]);
  const [title, setTitle] = useState("");
  const { profile } = useContext(DataCtx);
  const [content, setContent] = useState("");
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${apiUrl}/book/${id}`);
        // console.log(response.data);
        setBook(response.data);
        fetchSubBook();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSubBook = async () => {
      try {
        const response = await axios.get(`${apiUrl}/sub_book/${id}`);
        console.log(response.data);
        setSubBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const showModal = (id) => {
    setVisible(true);
    setSelectedId(id);
  };

  const handleOk = () => {
    // Handle the OK button click
    setVisible(false);
    deleteSubBook(selectedId);
  };

  const deleteSubBook = (id) => {
    axios
      .delete(`${apiUrl}/sub_book/${id}`)
      .then((res) => {
        console.log(res.data);
        message.success("Data deleted");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCancel = () => {
    // Handle the Cancel button click
    setVisible(false);
  };

  return (
    <div>
      <ReusableHeader />
      <div className="book-detail-info">
        <Image src={book.image} width={300} />
        <div className="book-detail-desc">
          <Modal
            title="Example Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Are You sure you wanna delete it </p>
          </Modal>
          <h1 className="book-detail-title">Book Detail</h1>
          <h1>
            <span className="bold">Title </span> : {book.title}
          </h1>
          <p>
            {" "}
            <span className="bold"> Author </span> : {book.author}
          </p>
          <p>
            {" "}
            <span className="bold"> Genre </span> : {book.genre}
          </p>
          <h1>
            {" "}
            <span className="bold"> synopsis : </span>{" "}
          </h1>
          <p>{convertToHTML(book.description)}</p>
        </div>
      </div>
      <div className="book-detail-info center-box j-left">
        <Collapse width={3400}>
          {subBook.map((item, index) => {
            return (
              <Panel header={item.title} key={index}>
                {convertToHTML(item.detail)}
                <Button
                  style={{ margin: 30, backgroundColor: "yellow" }}
                  onClick={() => {
                    navigate(`/summary_book/${item.id}`, {
                      state: { detail: item.detail },
                    });
                  }}
                >
                  Create Summary
                </Button>
                {profile.role == 1 ? (
                  <>
                    <Button
                      style={{ margin: 30 }}
                      onClick={() => {
                        navigate(`/assesment/${item.id}`, {
                          state: { question: item.question, book_id: id },
                        });
                      }}
                    >
                      Check Your Knowledge
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      style={{ margin: 30 }}
                      onClick={() => {
                        navigate(`/answer/${item.id}`, {
                          state: { question: item.question },
                        });
                      }}
                    >
                      See Answer
                    </Button>
                    <Button
                      style={{ margin: 30 }}
                      onClick={() => {
                        showModal(item.id);
                      }}
                    >
                      Delete Materials
                    </Button>
                  </>
                )}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}
