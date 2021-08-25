import React from "react";

const ReportDetails = (props) => {
  const { title, count } = props;
  return (
    <div className="col-md-3">
      <div className="card border-dark ">
        <div className="card-body text-success">
          <h1 className="card-title text-center">{count}</h1>
        </div>
        <div className="card-footer text-center bg-transparent border-success">
          {title}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
