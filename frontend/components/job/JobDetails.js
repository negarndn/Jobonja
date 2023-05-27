import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import "moment/locale/fa";
import FromNow from "./../../utils/FromNow";
import eArabic from "./../../utils/eArabic";

import JobContext from "../../context/JobContext";
import { toast } from "react-toastify";
import encodeFilters from "../../utils/encodeFilters";

const JobDetails = ({ job, candidates, access_token }) => {
  const { applyToJob, checkJobApplied, applied, clearErrors, error, loading } =
    useContext(JobContext);
  const [lastDate, setLastDate] = useState("");

  useEffect(() => {
    setLastDate(moment(job.lastDate).locale("fa").format("YYYY/M/D"));

    if (error) {
      toast.error(error);
      clearErrors();
    }

    checkJobApplied(job.id, access_token);
  }, [job, error]);

  const applyToJobHandler = () => {
    applyToJob(job.id, access_token);
  };

  const d1 = moment(job.lastDate);
  const d2 = moment(Date.now());
  const isLastDatePassed = d1.diff(d2, "days") < 0 ? true : false;

  function generateText(candidatesLength) {
    if (candidatesLength === 0)
      return "تا کنون درخواستی برای این آگهی ثبت نشده است.";
    if (candidatesLength == 1) return "نفر برای این آگهی درخواست داده است.";
    else return "نفر برای این آگهی درخواست داده‌اند.";
  }

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
                    {loading ? (
                      "در حال بارگذاری..."
                    ) : applied ? (
                      <button
                        className="btn btn-success px-4 py-2 apply-btn ml-4"
                        disabled
                      >
                        <i aria-hidden className="fas fa-check"></i>{" "}
                        {loading ? "در حال بارگذاری..." : "درخواست داده شده"}
                      </button>
                    ) : (
                      <button
                        onClick={applyToJobHandler}
                        disabled={isLastDatePassed}
                        className="btn btn-primary px-4 py-2 apply-btn ml-4"
                      >
                        {loading ? "در حال بارگذاری..." : "ارسال رزومه"}
                      </button>
                    )}
                    <span className="text-success">
                      {candidates != 0 ? <b>{eArabic(candidates)}</b> : ""}{" "}
                      {generateText(candidates)}
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
                      <td>{encodeFilters(job.jobType)}</td>
                    </tr>

                    <tr>
                      <td>دسته‌بندی شغلی</td>
                      <td>:</td>
                      <td>{encodeFilters(job.industry)}</td>
                    </tr>

                    <tr>
                      <td>دستمزد</td>
                      <td>:</td>
                      <td>{eArabic(job.salary)} تومان </td>
                    </tr>

                    <tr>
                      <td>حداقل میزان تحصیلات</td>
                      <td>:</td>
                      <td>{encodeFilters(job.education)}</td>
                    </tr>

                    <tr>
                      <td>حداقل سابقه کار</td>
                      <td>:</td>
                      <td>{encodeFilters(job.experience)}</td>
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
            {isLastDatePassed && (
              <div className="mt-5 p-0">
                <div
                  className="alert alert-danger"
                  data-testid="warning-message"
                >
                  <h5>اخطار:</h5>
                  مهلت ارسال درخواست برای این آگهی تمام شده است. آخرین مهلت
                  درخواست برای این شغل: <b>{lastDate}</b>
                  <br /> برای اطلاع از آخرین آگهی‌ها به جاب‌اونجا سر بزنید.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
