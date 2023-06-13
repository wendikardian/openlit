import React from "react";
import ReusableHeader from "../components/ReusableHeader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";
import { apiUrl } from "../../data";
import { DataCtx } from "../DataCtx/Datactx";
import ReactHtmlParser from "react-html-parser";



export default function SummaryBook() {
  const location = useLocation();
  const detail = location.state.detail;
//   limit detail max 3000 characters
    const newDetail = detail.substring(0, 3000);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState("");
  const [first, setFirst ] = useState(true)
    useEffect(() => {
        axios.post(apiUrl + "/summary", { detail: newDetail }).then((res) => {
            console.log(res.data.message);
            setSummary(res.data.message);
            setIsLoading(false);
        });
    }, [])
    function convertToHTML(string) {
      return ReactHtmlParser(string);
    }


  return (
    <div>
      <ReusableHeader />
      <div className="edit-box-container">
        <h1 className="mb-10 mt-10">Summary ! </h1>
        <label htmlFor="username " style={{ marginTop: 40 }}></label>
        {
            isLoading ?
            <Spin size="large" />
            :
            <p>{convertToHTML(summary)
              }</p>
        }
      </div>
    </div>
  );
}
