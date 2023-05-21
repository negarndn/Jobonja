import React from "react";

const NoResults = () => {
  return (
    <div className="no-results">
      <img
        src="/images/no-results.svg"
        height="450"
        width="450"
        alt="no_results_found"
      />

      <h5>متاسفانه‌ برای فیلتر‌های اعمال شده نتیجه‌ای یافت نشد.</h5>
    </div>
  );
};

export default NoResults;
