import React from "react";
import Link from "next/link";

const JobItem = () => {
  return (
    <Link href="/jobdetail">
      <div className="job-listing">
        <div className="job-listing-details">
          <div className="job-listing-description">
            <h4 className="job-listing-company">فرادرس</h4>
            <h3 className="job-listing-title">
              استخدام برنامه‌نویس Laravel) PHP-دورکاری)
            </h3>
            <p className="job-listing-text">
              ما در مجموعه علمی آموزشی «فرادرس»، در حال جذب همکار برای موقعیت
              شغلی «برنامه‌نویس PHP/Laravel» هستیم.اگر به فعالیت در یک محیط
              علمی، جوان و پویا علاقه‌مند هستید. و برای خود یک مسیر حرفه‌ای
              همراه با رشد و پیشرفت را در نظر گرفته‌اید، از شما دعوت می‌کنیم به
              تیم خلاق، جوان و پویای ما بپیوندید.
            </p>
          </div>
        </div>

        <div className="job-listing-footer">
          <ul>
            <li>
              <i className="fas fa-industry"></i> کامپیوتر، فناوری اطلاعات و
              اینترنت
            </li>
            <li>
              <i className="fas fa-briefcase"></i> تمام وقت
            </li>
            <li>
              <i className="fas fa-money-check-alt"></i>توافقی
            </li>
            <li>
              <i className="far fa-clock"></i> تاریخ انتشار: 2 ماه پیش
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
