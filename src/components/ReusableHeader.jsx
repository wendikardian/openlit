import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { BookOutlined, CommentOutlined, FileTextOutlined, RobotOutlined, SearchOutlined , UserOutlined } from "@ant-design/icons";

function ReusableHeader() {
  return (
    <div>
      <header class="bg-white  bs-header shadow-lg">
        <nav
          class="mx-auto flex max-w-7xl items-center justify-between p-6 w-full flex-grow "
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5 flex">
              <img class="h-8 w-auto" src={Logo} alt="" />
              <h1 class="ml-4 text-lg font-weight">OPENLIT</h1>
            </a>
          </div>
          <div class="hidden lg:flex lg:gap-x-12 mr-40 ">
            <div class="flex-row ">
              <BookOutlined size={30} className="mr-5" />
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
                Book
              </a>
            </div>
            <div class="flex-row ">
              <FileTextOutlined size={30} className="mr-5" />
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
                Class
              </a>
            </div>
            <div class="flex-row ">
              <CommentOutlined  size={30} className="mr-5"/>
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
                Community
              </a>
            </div>
            <div class="flex-row ">
              <RobotOutlined size={30} className="mr-5" />
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
                Virtual Assistant
              </a>
            </div>
            <div class="flex-row ">
              <SearchOutlined size={30} className="mr-5" />
              <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
                Find Book
              </a>
            </div>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/register">
              <div class=" ml-20 p-2 rounded-2xl  bg-yellow-400">
                <UserOutlined />
                <a href="" class="font-semibold">
                </a>
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default ReusableHeader;
