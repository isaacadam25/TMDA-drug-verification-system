import React, { useState, useEffect } from "react";
import {
  getTopManufacturers,
  getTopMedicines,
} from "../../services/report.services";

const ReportsHeader = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [manuError, setManuError] = useState(null);
  const [mediError, setMediError] = useState(null);

  const getTopThreeManufacturers = async () => {
    try {
      const { data } = await getTopManufacturers();
      setManufacturers(data.slice(0, 3));
    } catch (ex) {
      setManuError("Failed to load data. Try to refresh the page.");
    }
  };

  const getTopThreeMedicines = async () => {
    try {
      const { data } = await getTopMedicines();
      setMedicines(data.slice(0, 3));
    } catch (ex) {
      setMediError("Failed to load data. Try to refresh the page.");
    }
  };

  useEffect(() => {
    getTopThreeManufacturers();
    getTopThreeMedicines();
  }, []);

  return (
    <>
      <div className="col-md-6">
        <div className="card mb-2">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src="/images/trending-company.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <h5 className="card-title">Top 3 Manufacturers</h5>
                <ol className="list-group list-group-numbered">
                  {manufacturers &&
                    manufacturers.map((company, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          {company.manufacturer}
                        </div>{" "}
                        <span className="badge bg-info rounded-pill">
                          {company.quantity}
                        </span>
                      </li>
                    ))}
                  {manuError ? (
                    <p style={{ color: "red" }}>{manuError}</p>
                  ) : null}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card mb-2">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src="/images/trending-company.png"
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <h5 className="card-title">Top 3 Medicines</h5>
                <ol className="list-group list-group-numbered">
                  {medicines &&
                    medicines.map((medicine, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">{medicine.medicine}</div>{" "}
                        <span className="badge bg-info rounded-pill">
                          {medicine.batches}
                        </span>
                      </li>
                    ))}
                  {mediError ? (
                    <p style={{ color: "red" }}>{mediError}</p>
                  ) : null}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsHeader;
