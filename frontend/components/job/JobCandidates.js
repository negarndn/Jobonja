import React from "react";

import Link from "next/link";
import DataTable from "react-data-table-component";
import eArabic from "./../../utils/eArabic";
import moment from "moment";
import "moment/locale/fa";
import NoData from "./NoData";

const JobCandidates = ({ candidatesApplied }) => {
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
          <Link
            href={`https://storage.jobinjacdn.com/records/files/uploads/documents/8b2bf974-5f1f-449d-8020-05731f5be933.pdf?requester=33312e372e3131392e3431&resource=753a32313037313839&from=63765f7472616e73&X-Amz-Content-Sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=oetSom924MQvtCRu9N6vvQ4bt8cG9HSpRnxWU756SyWy5NVt6nTpmfA9aV2b%2F20230421%2F%2Fs3%2Faws4_request&X-Amz-Date=20230421T095311Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=84f2740823359edf0518b5095031651fa0a87bc7a2200f8f3620f2db3f1963c4`}
            className="text-success text-center ml-4"
            rel="noreferrer"
            target="_blank"
          >
            <b>
              <i aria-hidden className="fas fa-download"></i> دریافت رزومه
            </b>
          </Link>
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
