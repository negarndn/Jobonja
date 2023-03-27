import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
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

          <Link href="/login">
            <button className="loginButtonHeader">
              <span>ورود</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
