import React from "react";
import Link from "next/link";

import FromNow from "../../utils/FromNow";
import encodeFilters from "../../utils/encodeFilters";
import eArabic from "../../utils/eArabic";

const JobItem = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="job-listing">
        <div className="job-listing-details">
          <div className="job-listing-description">
            <h4 className="job-listing-company">{job.company}</h4>
            <h3 className="job-listing-title">{job.title}</h3>
            <p className="job-listing-text">
              {job.description.substring(0, 200)}...
            </p>
          </div>
        </div>

        <div className="job-listing-footer">
          <ul>
            <li>
              <i className="fas fa-industry"></i>
              {encodeFilters(job.industry)}
            </li>
            <li>
              <i className="fas fa-briefcase"></i>
              {encodeFilters(job.jobType)}
            </li>
            <li>
              <i className="fas fa-money-check-alt"></i>
              {eArabic(job.salary)}
            </li>
            <li>
              <i className="far fa-clock"></i>
              {FromNow(job.createAt)}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
