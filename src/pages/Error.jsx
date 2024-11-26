import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  return (
    <div
      id="error-page"
      className="h-screen flex flex-col items-center justify-center text-2xl gap-5 "
    >
      <h1>Oops! Something went wrong. ❌ 🚫 </h1>
      <p>Sorry, an unexpected error has occurred. 🤔</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </div>
  );
};

export default Error;
