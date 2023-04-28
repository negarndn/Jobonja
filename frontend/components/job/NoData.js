import React from "react";

const NoData = () => {
  return (
    <div className="no-results">
      <img
        src="/images/no-data.svg"
        height="450"
        width="450"
        alt="no_data_to_display"
      />

      <h5>اطلاعاتی برای نمایش وجود ندارد.</h5>
    </div>
  );
};

export default NoData;
