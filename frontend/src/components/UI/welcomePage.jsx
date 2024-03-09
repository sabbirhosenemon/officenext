import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  return (
    <div>
      <section className="w-full px-8 text-gray-700 bg-white">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-col md:flex-row">
            <a
              href="#"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                Office <span className="text-blue-600">Next</span>
                <span className="text-teal-600"></span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center px-8 mx-auto xl:px-5">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Revolutionize & Simplify.</span>
            <br />
            <span className="block text-blue-600 xl:inline">
              Your Virtual Office Environment.
            </span>
          </h1>
          <div className="container flex flex-col flex-wrap items-center py-5 mx-auto md:flex-row max-w-7xl">
            <div className="inline-flex items-center ml-5 lg:justify-end">
              {!isLogged ? (
                <Link
                  to="/admin/auth/login"
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  Try Now
                </Link>
              ) : (
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
