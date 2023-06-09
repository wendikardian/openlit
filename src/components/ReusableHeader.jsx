import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import {
  BookOutlined,
  CommentOutlined,
  FileTextOutlined,
  RobotOutlined,
  SearchOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Modal, Menu } from "antd";
import { useState } from "react";

function ReusableHeader() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const showMenu = () => {
    setIsMenuVisible(true);
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    // Check if the cookie email exist or not if not redirec
    const email = Cookies.get("email");
    if (email === undefined) {
      navigate("/login");
    }
  }, []);

  const items = [
    {
      label: (
        <Link to="/profile">
          <a target="_blank" rel="noopener noreferrer">
            See Profile
          </a>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <a
          onClick={() => {
            Cookies.remove("email");
            window.location.reload();
            // navigate("/login");
          }}
        >
          Log out
        </a>
      ),
      key: "1",
    },
  ];
  return (
    <div>
      <header
        class="bg-white  bs-header shadow-lg "
        style={{ position: "fixed", width: "100%", top: 0, zIndex: 100 }}
      >
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
          {/* create burger button that only shown on mobile */}
          <div className="burger-button">
            <MenuOutlined style={{ fontSize: "24px" }} onClick={showMenu} />
          </div>
          <Modal
            visible={isMenuVisible}
            title="Application Menu"
            onCancel={hideMenu}
            footer={null}
          >
            <Menu>
              {/* Add your menu items here */}
              <Menu.Item key="1">
                <Link to="/book/dashboard">
                  <BookOutlined size={30} className="mr-5" />
                  <a
                    href="#"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Book
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/class/list">
                  <FileTextOutlined size={30} className="mr-5" />
                  <a
                    href="#"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Class
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/community">
                  <CommentOutlined size={30} className="mr-5" />
                  <a
                    href="#"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Community
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                {" "}
                <Link to="/assistant">
                  <RobotOutlined size={30} className="mr-5" />
                  <a
                    href="#"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Virtual Assistant
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/profile">
                  <a target="_blank" rel="noopener noreferrer">
                    See Profile
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                {" "}
                <a
                  onClick={() => {
                    Cookies.remove("email");
                    window.location.reload();
                    // navigate("/login");
                  }}
                >
                  Log out
                </a>
              </Menu.Item>
            </Menu>
          </Modal>
          <div class="hidden lg:flex lg:gap-x-12 mr-40 ">
            <div class="flex-row ">
              <Link to="/book/dashboard">
                <BookOutlined size={30} className="mr-5" />
                <a
                  href="#"
                  class="text-sm font-semibold leading-6 text-gray-900"
                >
                  Book
                </a>
              </Link>
            </div>
            <div class="flex-row ">
              <Link to="/class/list">
                <FileTextOutlined size={30} className="mr-5" />
                <a
                  href="#"
                  class="text-sm font-semibold leading-6 text-gray-900"
                >
                  Class
                </a>
              </Link>
            </div>
            <div class="flex-row ">
              <Link to="/community">
                <CommentOutlined size={30} className="mr-5" />
                <a
                  href="#"
                  class="text-sm font-semibold leading-6 text-gray-900"
                >
                  Community
                </a>
              </Link>
            </div>
            <div class="flex-row ">
              <Link to="/assistant">
                <RobotOutlined size={30} className="mr-5" />
                <a
                  href="#"
                  class="text-sm font-semibold leading-6 text-gray-900"
                >
                  Virtual Assistant
                </a>
              </Link>
            </div>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <Dropdown
              menu={{
                items,
              }}
            >
              <Link to="/profile">
                <div class=" ml-20 p-2 rounded-2xl  bg-yellow-400">
                  <UserOutlined />
                  <a href="" class="font-semibold"></a>
                </div>
              </Link>
            </Dropdown>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default ReusableHeader;
