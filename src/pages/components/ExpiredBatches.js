import React, { useState } from "react";
import { CSVLink } from "react-csv";
import Pagination from "../../common/Pagination";
import { Paginate } from "../../utils/Paginate";
import Controller from "../../controllers";

const headers = [
  { label: "Batch No", key: "batch_number" },
  { label: "Drug Name", key: "medicine_name" },
  { label: "Expiry Date", key: "expiry_date" },
  { label: "Used Percent", key: "used" },
];

const ExpiredBatches = (props) => {
  const [paginate, setPaginate] = useState({ pageSize: 8, currentPage: 1 });

  const { title, items } = props;

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };

  /* Paginate data in tables */
  const recordsData = Paginate(items, paginate.currentPage, paginate.pageSize);

  const csvReport = {
    data: items,
    headers: headers,
    filename: "Expired_Report.csv",
  };

  return (
    <div className="row justify-content-center pt-4">
      <div className="col-md-12">
        <div className="card mb-2">
          <div className="row g-0">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="h5 text-center p-1">{title}</h5>
                {items.length > 0 && (
                  <CSVLink
                    className="btn btn-outline-primary btn-sm float-end"
                    {...csvReport}
                    style={{ marginRight: 24 }}
                  >
                    <i className="fa fa-file-excel-o" /> Export
                  </CSVLink>
                )}
                <Controller.TableController>
                  <thead>
                    <tr>
                      <th>Batch No</th>
                      <th>Drug Name</th>
                      <th>Expiry Date</th>
                      <th>Used quantity (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordsData &&
                      recordsData.map((record) => (
                        <tr key={record.id}>
                          <td>{record.batch_number}</td>
                          <td>{record.medicine_name}</td>
                          <td>{record.expiry_date}</td>
                          <td>{record.used}</td>
                        </tr>
                      ))}
                  </tbody>
                </Controller.TableController>
                <Pagination
                  itemsCount={items.length}
                  currentPage={paginate.currentPage}
                  pageSize={paginate.pageSize}
                  onPageChange={handlePageChange}
                />
                {recordsData.length === 0 && (
                  <p className="text-center">
                    <i>No Data Found</i>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiredBatches;
