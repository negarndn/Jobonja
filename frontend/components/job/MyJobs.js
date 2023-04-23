import React, { useEffect, useContext } from "react";

import Link from "next/link";
import DataTable from "react-data-table-component";

import JobContext from "../../context/JobContext";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import eArabic from "./../../utils/eArabic";
import NoData from "./NoData";

const MyJobs = ({ jobs, access_token }) => {
  const { clearErrors, error, loading, deleted, deleteJob, setDeleted } =
    useContext(JobContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (deleted) {
      setDeleted(false);
      router.push(router.asPath);
      toast.success("آگهی با موفقیت حذف شد.");
    }
  }, [error, deleted]);

  const deleteJobHandler = (id) => {
    deleteJob(id, access_token);
  };

  const columns = [
    {
      name: "شناسه آگهی",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "عنوان آگهی",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "دستمزد",
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: "عملیات‌ها",
      sortable: true,
      selector: (row) => row.action,
    },
  ];

  const data = [];

  jobs &&
    jobs.forEach((job) => {
      data.push({
        id: eArabic(job.id),
        title: job.title,
        salary: eArabic(job.salary),
        action: (
          <>
            <Link href={`/jobs/${job.id}`} className="btn btn-primary mx-1">
              <i aria-hidden className="fa fa-eye"></i>
            </Link>
            <Link
              href={`/employeer/jobs/candidates/${job.id}`}
              className="btn btn-success my-2 mx-1"
            >
              <i aria-hidden className="fa fa-users"></i>
            </Link>
            <Link
              href={`/employeer/jobs/${job.id}`}
              className="btn btn-warning my-2 mx-1"
            >
              <i aria-hidden className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger mx-1"
              onClick={() => deleteJobHandler(job.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5 df">آگهی‌های شغلی من</h4>
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

export default MyJobs;
