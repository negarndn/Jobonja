import React, { useState } from "react";

import { useRouter } from "next/router";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    if (keyword) {
      let searchQuery = `/?keyword=${keyword}`;

      router.push(searchQuery);
      //   setKeyword("");
    } else router.push("/");
  };

  return (
    <div className="input-group input-group-sm mb-3 page-search">
      <div className="input-group-prepend inputBox">
        <button className="btn btn-secondary" onClick={submitHandler}>
          <i className="fas fa-search"></i>
        </button>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        placeholder="جستجو کنید..."
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
    </div>
  );
};

export default Search;
