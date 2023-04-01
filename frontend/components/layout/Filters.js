import React from "react";
import { useRouter } from "next/router";

const Filters = () => {
  const router = useRouter();

  let queryParams;
  if (typeof window !== "undefined") {
    queryParams = new URLSearchParams(window.location.search);
  }

  function handleClick(checkbox) {
    if (typeof window !== "undefined") {
      const checkboxes = document.getElementsByName(checkbox.name);

      checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
      });
    }

    if (checkbox.checked === false) {
      // Delete the filter from query
      if (queryParams.has(checkbox.name)) {
        queryParams.delete(checkbox.name);
        router.replace({
          search: queryParams.toString(),
        });
      }
    } else {
      // Set new filter value if it alredy there
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        // Append the new filter
        queryParams.append(checkbox.name, checkbox.value);
      }

      router.replace({
        search: queryParams.toString(),
      });
    }
  }

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  return (
    <div className="sidebar mt-5">
      <h4>دسته‌بندی‌ها</h4>

      <hr />
      <h5 className="filter-heading mb-3">نوع قرارداد</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check1"
          value="Permanent"
          defaultChecked={checkHandler("jobType", "Permanent")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check1">
          تمام‌وقت
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check2"
          value="Temporary"
          defaultChecked={checkHandler("jobType", "Temporary")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check2">
          پاره‌وقت
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check3"
          value="Internship"
          defaultChecked={checkHandler("jobType", "Intership")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check3">
          کارآموزی
        </label>
      </div>

      <hr />
      <h5 className="mb-3">حداقل تحصیلات</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check4"
          value="Bachelors"
          defaultChecked={checkHandler("education", "Bachelors")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check4">
          کارشناسی
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check5"
          value="Masters"
          defaultChecked={checkHandler("education", "Masters")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check5">
          کارشناسی ارشد
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check6"
          value="Phd"
          defaultChecked={checkHandler("education", "Phd")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check6">
          دکتری
        </label>
      </div>

      <hr />

      <h5 className="mb-3">سابقه کار</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check7"
          value="No Experience"
          defaultChecked={checkHandler("experience", "No Experience")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check7">
          بدون محدودیت سابقه کار
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check8"
          value="1 Years"
          defaultChecked={checkHandler("experience", "1 Years")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check8">
          حداقل یک سال
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check9"
          value="2 Years"
          defaultChecked={checkHandler("experience", "2 Years")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check9">
          حداقل دو سال
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check10"
          value="3 Years above"
          defaultChecked={checkHandler("experience", "3 Years above")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check10">
          بیش از سه سال
        </label>
      </div>

      <hr />
      <h5 className="mb-3">حداقل دستمزد</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check11"
          value="1000000"
          defaultChecked={checkHandler("salary", "1000000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check11">
          از یک میلیون تومان
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check12"
          value="3000000"
          defaultChecked={checkHandler("salary", "3000000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check12">
          از سه میلیون تومان
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check13"
          value="5000000"
          defaultChecked={checkHandler("salary", "5000000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check13">
          از پنج میلیون تومان
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="defaultCheck2"
          value="7000000"
          defaultChecked={checkHandler("salary", "7000000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="defaultCheck2">
          از هفت میلیون تومان
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check14"
          value="9000000"
          defaultChecked={checkHandler("salary", "9000000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check14">
          از نه میلیون تومان
        </label>
      </div>

      <hr />
    </div>
  );
};

export default Filters;
