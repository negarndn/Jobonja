import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import eArabic from "./../../utils/eArabic";
import moment from "moment";
import "moment/locale/fa";
import NoData from "./NoData";
import AuthContext from "../../context/AuthContext";

const JobCandidates = ({ candidatesApplied, access_token }) => {
  const { downloadResume } = useContext(AuthContext);

  const columns = [
    {
      name: "عنوان آگهی",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "شناسه کاربر",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "رزومه متقاضی",
      sortable: true,
      selector: (row) => row.resume,
    },
    {
      name: "تاریخ درخواست",
      sortable: true,
      selector: (row) => row.appliedAt,
    },
  ];

  const data = [];

  const downloadResumeHandler = () => {
    downloadResume(access_token);
  };

  function generateText(candidatesLength) {
    if (candidatesLength === 0) return "فهرست متقاضیان";
    if (candidatesLength == 1) return "متقاضی برای این آگهی درخواست داده است.";
    else return "متقاضی برای این آگهی درخواست داده‌اند.";
  }

  candidatesApplied &&
    candidatesApplied.forEach((item) => {
      data.push({
        title: item.job.title,
        id: eArabic(item.user),
        salary: eArabic(item.salary),
        resume: (
          <button
            className="text-success text-center ml-4 downloadButton"
            onClick={downloadResumeHandler}
          >
            <b>
              <i aria-hidden className="fas fa-download"></i> دریافت رزومه
            </b>
          </button>
        ),
        appliedAt: moment(item.appliedAt.substring(0, 10))
          .locale("fa")
          .format("YYYY/M/D"),
      });
    });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5 df">
          {`${
            candidatesApplied.length != 0
              ? eArabic(candidatesApplied.length)
              : ""
          } ${generateText(candidatesApplied.length)}`}
        </h4>
        <DataTable
          columns={columns}
          data={data}
          responsive
          noDataComponent={<NoData />}
        />
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default JobCandidates;
