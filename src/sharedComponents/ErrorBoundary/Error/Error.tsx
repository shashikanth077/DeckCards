import React from "react";
// import { history } from "../../redux/store";

interface ErrorPageProps {
  error?: string;
  description?: string;
}

function ErrorPage (props:ErrorPageProps) {

  const {error,description} = props;
  return (
    <div className="container">
      <div className="d-flex">
        <h2 title={error} className="">
          {error}
        </h2>
        <p color="">{description}</p>
        <button
          className=""
        //   onClick={() => history.push("/")}
        >
          Back to Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
