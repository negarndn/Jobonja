import React from "react";
import Link from "next/link";

import Layout from "./Layout";

const NotFound = () => {
  return (
    <Layout title="صفحه یافت نشد.">
      <div className="page-not-found-wrapper">
        <img
          src="/images/404.svg"
          height="550"
          width="550"
          alt="404_not_found"
        />

        <h5>
          صفحه مورد نظر پیدا نشد. بازگشت به
          <Link href="/"> صفحه اصلی </Link>
        </h5>
      </div>
    </Layout>
  );
};

export default NotFound;
