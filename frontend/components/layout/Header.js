import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import AuthContext from "../../context/AuthContext";

import dynamic from "next/dynamic";

// const Link = dynamic(() => import("next/link"));
// const Image = dynamic(() => import("next/image"));
// const AuthContext = dynamic(() => import("../../context/AuthContext"));

const Header = () => {
  const { loading, user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };
  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">جاب</span>
            <span className="logo2">اونجا</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="btn btn-outline-success postAJobButton">
              <span>درج آگهی استخدام</span>
            </button>
          </Link>
          {user ? (
            <div className="dropdown ml-3">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i aria-hidden className="fas fa-user"></i>
                {user.first_name && user.last_name ? (
                  <span>{user.first_name + " " + user.last_name}</span>
                ) : (
                  <span>خوش آمدید</span>
                )}
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/employeer/jobs" className="dropdown-item">
                  آگهی‌های شغلی من
                </Link>

                <Link href="/me/applied" className="dropdown-item">
                  درخواست‌های من
                </Link>

                <Link href="/me" className="dropdown-item">
                  تنظیمات حساب کاربری من
                </Link>

                <Link href="/upload/resume" className="dropdown-item">
                  بارگذاری رزومه
                </Link>

                <Link
                  href="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  خروج
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>ورود</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
