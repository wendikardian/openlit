import React from "react";
import BookReading from "../assets/landing.png";
import { Link } from "react-router-dom";

export default function Jumbotron() {
  return (
    <div class="w-full flex justify-around p-20 mt-10 jumb-dash">
      <div class="text-left max-w-md">
        <h1 class="font-bold text-2xl">Learn with your personal assistant</h1>
        <p class="text-6xl font-bold mt-16 mb-16 ">
          Your future <br /> Library !
        </p>
        <p class="font-semibold mb-10">
          Openlit: Web-Based AI and Interactive Virtual Assistant to Increase
          People's Reading Motivation
        </p>
        <div>
          <Link to="/register"><a href="" class="btn-su">Sign Up for free</a>
          </Link>
        </div>
      </div>
      <div>
        <img src={BookReading} alt="" class="max-w-lg" />
      </div>
    </div>
  );
}
