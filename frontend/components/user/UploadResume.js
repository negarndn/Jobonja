import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

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
  } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (uploaded) {
      setUploaded(false);
      toast.success("رزومه شما با موفقیت بارگذاری شد.");
    }
  }, [error, uploaded]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);

    uploadResume(formData, access_token);
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
                  <Link
                    className="text-success text-center ml-4"
                    rel="noreferrer"
                    target="_blank"
                    href={`https://storage.jobinjacdn.com/records/files/uploads/documents/8b2bf974-5f1f-449d-8020-05731f5be933.pdf?requester=33312e372e3131392e3431&resource=753a32313037313839&from=63765f7472616e73&X-Amz-Content-Sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=oetSom924MQvtCRu9N6vvQ4bt8cG9HSpRnxWU756SyWy5NVt6nTpmfA9aV2b%2F20230421%2F%2Fs3%2Faws4_request&X-Amz-Date=20230421T095311Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=84f2740823359edf0518b5095031651fa0a87bc7a2200f8f3620f2db3f1963c4`}
                  >
                    <b>
                      <i aria-hidden className="fas fa-download"></i>دریافت
                      رزومه
                    </b>
                  </Link>
                </>
              )}

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
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
