import React from "react";

import JobItem from "./job/JobItem";
import Search from "./Search";
import { useRouter } from "next/router";

const Home = ({ data }) => {
  const { jobs, count, resPerPage } = data;

  const router = useRouter();

  let { keyword } = router.query;

  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-9 col-lg-8 content-left-offset">
          <div className="my-5 page-header">
            <h4 className="page-title">
              {keyword
                ? `${jobs.length} فرصت ‌شغلی فعال یافت شد:`
                : "آخرین آگهی‌ها"}
            </h4>
            <Search />
          </div>
          {jobs && jobs.map((job) => <JobItem key={job.id} job={job} />)}
        </div>
        <div className="col-xl-3 col-lg-4">{/* <Filters /> */}</div>
      </div>
    </div>
  );
};

export default Home;
