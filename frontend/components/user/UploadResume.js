import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const UploadResume = ({ access_token }) => {
  const [resume, setResume] = useState(null);

  const router = useRouter();

  const {
    loading,
    user,
    uploaded,
    error,
    clearErrors,
    uploadResume,
    setUploaded,
    downloadResume,
  } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (uploaded) {
      setUploaded(false);
      toast.success("رزومه شما با موفقیت بارگذاری شد.");
      router.push(router.asPath);
    }
  }, [error, uploaded]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);

    uploadResume(formData, access_token);
  };

  const downloadResumeHandler = () => {
    downloadResume(access_token);
  };

  const onChange = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/resume-upload.svg" alt="resume" layout="fill" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3>تنظیمات رزومه‌ شما</h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    data-testid="file-input"
                    type="file"
                    name="resume"
                    id="customFile"
                    accept="application/pdf"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              {user && user.resume && (
                <>
                  <h5 className="text-center my-3">یا</h5>
                  <button
                    data-testid="download-button"
                    className="text-success text-center ml-4 downloadButton"
                    onClick={downloadResumeHandler}
                  >
                    <b>
                      <i aria-hidden className="fas fa-download"></i> دریافت
                      رزومه
                    </b>
                  </button>
                </>
              )}
              <div className="uploadButtonWrapper">
                <button
                  type="submit"
                  className="uploadButton"
                  data-testid="upload-button"
                >
                  {loading ? "در حال بارگذاری..." : "بارگذاری"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
