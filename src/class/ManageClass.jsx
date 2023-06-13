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
import { useLocation } from "react-router-dom";
import { message } from "antd";

export default function ManageClass() {
  const { id } = useParams();

  const { profile } = useContext(DataCtx);
  const location = useLocation();

  //   const [classData, setClassData] = useState('')
  const classData = location.state.classData;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [bookData, setBookData] = useState([]);

  const [selectedBook, setSelectedBook] = useState("-");
  const [classBook, setClassBook] = useState([]);
  const [allAnswer, setAllAnswer] = useState([]);

  const [first, setFirst] = useState(true);

  useEffect(() => {
    // fetch data 'book' from api
    const fetchDataBook = async () => {
      try {
        axios.get(`${apiUrl}/all_book/`).then((res) => {
          setBookData(res.data);
          fetchClassBook();
        });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchClassBook = async () => {
      try {
        axios.get(`${apiUrl}/class_book/${id}`).then((res) => {
          setClassBook(res.data);
          fetchClassMember();
        });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchClassMember = async () => {
      try {
        axios.get(`${apiUrl}/class_member/${id}`).then((res) => {
          // console.log(res.data);
          setUsers(res.data);
          fetchAllAnswer();
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllAnswer = async () => {
      try {
        axios.get(`${apiUrl}/all_answer/`).then((res) => {
          setAllAnswer(res.data);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataBook();
  }, []);

  function convertToHTML(string) {
    return ReactHtmlParser(string);
  }
  const saveData = () => {
    const data = {
      class_id: id,
      book_id: selectedBook,
    };

    axios.post(`${apiUrl}/class_book/`, data).then((res) => {
      message.success("Book Added");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      //   navigate("/manage_class/"+id);
    });
  };

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

            <h1>
              {" "}
              <span className="bold"> Description : </span>{" "}
            </h1>
            <div>{convertToHTML(classData.description)}</div>
            <div className="form-data" style={{ marginTop: 20 }}>
              <label htmlFor="username">Add Book : </label>
              <select
                name=""
                id=""
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
              >
                <option value="-">Select book to add</option>
                {bookData.map((book) => {
                  const filtered = classBook.filter(
                    (data) => data.book_id == book.id
                  );
                  if (filtered.length == 0) {
                    return <option value={book.id}>{book.title}</option>;
                  }
                })}
              </select>
              <Button onClick={saveData} style={{ marginLeft: 20 }}>
                Add Book
              </Button>
            </div>
            <div className="form-data" style={{ marginTop: 20 }}>
              <Button
                className="ml-10"
                onClick={() => {
                  navigate("/edit_class_photo/" + id);
                }}
              >
                Edit Photo
              </Button>
              <Button
                className="ml-10"
                onClick={() => {
                  navigate("/edit_class/" + id, {
                    state: { classData: classData },
                  });
                }}
              >
                Edit Data
              </Button>
            </div>
          </div>
        </div>
        <div className="book-detail-info column-flex">
          <h1 className="book-detail-title">Student Info</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Activity Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const filtered = allAnswer.filter(
                  (data) => data.user_id == user.fk_user
                );
                console.log(filtered);
                let score = 10 * filtered.length;
                // filtered.map((data) => {
                //   score += 10
                // });
                return (
                  <tr>
                    <td>{user.username}</td>
                    <td>{user.email}</td>

                    <td>{score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
