import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { formatDate } from "../../services/utilities.services";
import Pagination from "../../common/Pagination";
import { Paginate } from "../../utils/Paginate";
import Controller from "../../controllers";

const headers = [
  { label: "Batch No", key: "batch_number" },
  { label: "Drug Name", key: "drug_name" },
  { label: "Production Date", key: "production_date" },
  { label: "Expiry Date", key: "expiry_date" },
  { label: "Reg Date", key: "reg_date" },
  { label: "Reason", key: "description" },
];

const ApprovedBatchesTable = (props) => {
  const [paginate, setPaginate] = useState({ pageSize: 5, currentPage: 1 });

  const { title, items } = props;

  /* handle page change during pagination */
  const handlePageChange = (page) => {
    setPaginate({ ...paginate, currentPage: page });
  };
  console.log(items);

  /* Paginate data in tables */
  const recordsData = Paginate(items, paginate.currentPage, paginate.pageSize);

  const csvReport = {
    data: items,
    headers: headers,
    filename: "Approved_Report.csv",
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
                      <th>Prod Date</th>
                      <th>Exp Date</th>
                      <th>Reg Date</th>
                      <th>Approve Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recordsData &&
                      recordsData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.batch_number}</td>
                          <td>{item.drug_name}</td>
                          <td>{item.production_date}</td>
                          <td>{item.expiry_date}</td>
                          <td>{formatDate(item.reg_date)}</td>
                          <td>{item.date_approved}</td>
                          <td>
                            <em className="text-success">
                              {item.status ? "Approved" : "Pending"}
                            </em>
                          </td>
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

export default ApprovedBatchesTable;
