import React from "react";

import Link from "next/link";
import DataTable from "react-data-table-component";
import eArabic from "../../utils/eArabic";
import moment from "moment";
import "moment/locale/fa";
import encodeFilters from "../../utils/encodeFilters";

const JobsApplied = ({ jobs }) => {
  const columns = [
    {
      name: "عنوان",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "دستمزد",
      sortable: true,
      selector: (row) => eArabic(row.salary),
    },

    {
      name: "میزان تحصیلات",
      sortable: true,
      selector: (row) => row.education,
    },
    {
      name: "میزان تجربه",
      sortable: true,
      selector: (row) => row.experience,
    },
    {
      name: "تاریخ درخواست",
      sortable: true,
      selector: (row) => row.applieOn,
    },
    {
      name: "مشاهده آگهی",
      sortable: true,
      selector: (row) => row.action,
    },
  ];

  const data = [];

  jobs &&
    jobs.forEach((item) => {
      data.push({
        title: item.job.title,
        salary: item.job.salary,
        education: encodeFilters(item.job.education),
        experience: encodeFilters(item.job.experience),
        applieOn: moment(item.appliedAt.substring(0, 10))
          .locale("fa")
          .format("YYYY/M/D"),
        action: (
          <Link href={`/jobs/${item.job.id}`} className="btn btn-primary">
            <i aria-hidden className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5 df">تمام درخواست‌های شغلی شما</h4>
        <DataTable columns={columns} data={data} responsive />
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default JobsApplied;
