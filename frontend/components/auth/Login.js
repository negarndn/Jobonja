import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, login, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, error, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    login({ username: email, password });
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image
              src="/images/login.svg"
              alt="login"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2>ورود</h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="آدرس ایمیل خود را وارد نمایید"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="\S+@\S+\.\S+"
                    title="آدرس ایمیل معتبر نمی‌باشد."
                    required
                  />
                </div>
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="رمز عبور خود را وارد نمایید"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="loginButtonWrapper">
                <button
                  type="submit"
                  className="loginButton"
                  data-testid="submit-button"
                >
                  {loading ? "احراز هویت..." : "ورود"}
                </button>
              </div>
              <p style={{ textDecoration: "none" }} className="signup">
                حساب کاربری ندارید؟&nbsp;
                <Link href="/register">ثبت‌نام کنید</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
