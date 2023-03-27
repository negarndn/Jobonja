import React from "react";

import JobItem from "./job/JobItem";

const Home = ({ data }) => {
  const { jobs, count, resPerPage } = data;
  return (
    <div className="container container-fluid">
      <div className="row">
        <div className="col-xl-9 col-lg-8 content-left-offset">
          <div className="my-5 page-header">
            <h4 className="page-title">آخرین آگهی‌ها</h4>
            <div className="input-group input-group-sm mb-3 page-search">
              <div className="input-group-prepend">
                <button className="btn btn-secondary">
                  <i className="fas"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="جستجو کنید..."
              />
            </div>
          </div>
          {jobs && jobs.map((job) => <JobItem key={job.id} job={job} />)}
        </div>
        <div className="col-xl-3 col-lg-4">{/* <Filters /> */}</div>
      </div>
    </div>
  );
};

export default Home;
