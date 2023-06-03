import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Header() {

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
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              Our Content
            </a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">
              About
            </a>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              class="text-sm font-semibold leading-6 text-gray-900"

            >
              <Link to="/login">
              Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </a>
            <Link to="/register">
              <div class=" ml-20 p-2 rounded-2xl  bg-yellow-400">
                <a href="" class="font-semibold">
                  Sign up for free
                </a>
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
