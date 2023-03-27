import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/fa";
import FromNow from "./../../utils/FromNow";
import eArabic from "./../../utils/eArabic";

const JobDetails = ({ job, candidates }) => {
  const [lastDate, setLastDate] = useState("");

  useEffect(() => {
    setLastDate(moment(job.lastDate).locale("fa").format("YYYY/M/D"));
  }, [job]);

  return (
    <div className="job-details-wrapper">
      <div className="container container-fluid">
        <div className="row details-row">
          <div className="col-xl-9 col-lg-8">
            <div className="job-details p-3">
              <div className="job-header p-4">
                <h2>{job.title}</h2>
                <span className="ml-4">
                  <i aria-hidden className="fas fa-building"></i>
                  <span> {job.company}</span>
                </span>
                <span>
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <span> {job.address}</span>
                </span>

                <div className="mt-3">
                  <span>
                    <button className="btn btn-primary px-4 py-2 apply-btn ml-4">
                      ارسال رزومه
                    </button>
                    <span className="text-success">
                      <b>{eArabic(candidates)}</b> نفر براین شغل درخواست
                      داده‌اند.
                    </span>
                  </span>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4>توضیحات</h4>
                <p>{job.description}</p>
              </div>

              <div className="job-summary">
                <h4 className="mt-5 mb-4">شرح موقعیت شغلی</h4>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>نوع همکاری</td>
                      <td>:</td>
                      <td>{job.jobType}</td>
                    </tr>

                    <tr>
                      <td>دسته‌بندی شغلی</td>
                      <td>:</td>
                      <td>{job.industry}</td>
                    </tr>

                    <tr>
                      <td>حقوق</td>
                      <td>:</td>
                      <td>{job.salary} تومان </td>
                    </tr>

                    <tr>
                      <td>حداقل سابقه کار</td>
                      <td>:</td>
                      <td>{job.education}</td>
                    </tr>

                    <tr>
                      <td>حداقل سابقه کار</td>
                      <td>:</td>
                      <td>{job.experience}</td>
                    </tr>

                    <tr>
                      <td>نام شرکت</td>
                      <td>:</td>
                      <td>{job.company}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="job-contact-details p-3">
              <h4 className="my-4">اطلاعات بیش‌تر</h4>
              <hr />
              <h5>پست الکترونیک:</h5>
              <p>{job.email}</p>

              <h5>تاریخ انتشار:</h5>
              <p>{FromNow(job.createAt)}</p>

              <h5>آخرین مهلت ارسال رزومه:</h5>
              <p>{lastDate}</p>
            </div>

            <div className="mt-5 p-0">
              <div className="alert alert-danger">
                <h5>اخطار:</h5>
                دیگر نمی توانید برای این شغل درخواست دهید. این آگهی منقضی شده
                است. آخرین مهلت درخواست برای این شغل: <b>{lastDate}</b>
                <br /> برای اطلاع از آخرین آگهی‌ها به جاب‌اونجا سر بزنید.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
