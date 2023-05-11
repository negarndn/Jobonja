import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/router";

import JobContext from "../../context/JobContext";

import {
  jobTypeOptions,
  educationOptions,
  industriesOptions,
  experienceOptions,
} from "./data";
import encodeFilters from "../../utils/encodeFilters";

const UpdateJob = ({ job, access_token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [jobType, setJobType] = useState("Permanent");
  const [education, setEducation] = useState("Bachelors");
  const [industry, setIndustry] = useState("Business");
  const [experience, setExperience] = useState("No Experience");
  const [salary, setSalary] = useState("");
  const [positions, setPositions] = useState("");
  const [company, setCompany] = useState("");

  const router = useRouter();

  const { clearErrors, error, loading, updated, updateJob, setUpdated } =
    useContext(JobContext);

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setEmail(job.email);
      setAddress(job.address);
      setJobType(job.jobType);
      setEducation(job.education);
      setIndustry(job.industry);
      setExperience(job.experience);
      setSalary(job.salary);
      setPositions(job.positions);
      setCompany(job.company);
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (updated) {
      setUpdated(false);
      router.push("/employeer/jobs");
    }
  }, [error, updated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      email,
      address,
      jobType,
      education,
      industry,
      experience,
      salary,
      positions,
      company,
    };
    // console.log(data);
    updateJob(job.id, data, access_token);
  };

  return (
    <div className="newJobcontainer">
      <div className="formWrapper">
        <div className="headerWrapper">
          <div className="headerLogoWrapper"></div>
          <h2>بروزرسانی آگهی</h2>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="boxWrapper">
                <h5>نوع قرارداد</h5>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    {jobTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {encodeFilters(option)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h5>میزان تحصیلات</h5>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  >
                    {educationOptions.map((option) => (
                      <option key={option} value={option}>
                        {encodeFilters(option)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h5>دسته‌بندی شغلی</h5>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    {industriesOptions.map((option) => (
                      <option key={option} value={option}>
                        {encodeFilters(option)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="boxWrapper">
                <h5>میزان تجربه</h5>
                <div className="selectWrapper">
                  <select
                    className="classic"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    {experienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {encodeFilters(option)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
              <div className="inputWrapper">
                <div className="inputBoxAuth">
                  <i aria-hidden className="fab fa-tumblr"></i>
                  <input
                    type="text"
                    placeholder="عنوان آگهی شغلی را وارد کنید"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-file-medical-alt"></i>
                  <textarea
                    className="description"
                    type="text"
                    placeholder="توضیحات آگهی شغلی را وارد کنید"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="آدرس ایمیل خود را وارد کنید"
                    pattern="\S+@\S+\.\S+"
                    title="Your email is invalid"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <input
                    type="text"
                    placeholder="آدرس شرکت را وارد کنید"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-dollar-sign"></i>
                  <input
                    type="number"
                    placeholder="میزان دستمزد را وارد کنید"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-users"></i>
                  <input
                    type="number"
                    placeholder="تعدا موقعیت باز را وارد کنید"
                    value={positions}
                    onChange={(e) => setPositions(e.target.value)}
                    required
                  />
                </div>
                <div className="inputBoxAuth">
                  <i aria-hidden className="fas fa-building"></i>
                  <input
                    type="text"
                    placeholder="نام شرکت را وارد کنید"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col text-center mt-3">
              <button className="createButton">
                {loading ? "در حال بروزرسانی..." : "بروزرسانی آگهی"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
