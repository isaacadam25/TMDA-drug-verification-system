import React, { useState, useEffect } from "react";
import { errorToast, warningToast } from "../../utils/notify";
import {
  getAllintitutions,
  getDestroyedDrugs,
  getSingleintitution,
} from "../../services/medicine.services";
import Content from "../../components/Content";
import TableController from "../../controllers/TableController";
import TableHeadController from "../../controllers/TableHeadController";
import ModalController from "../../controllers/ModalController";
import ViewDestroyedDetails from "../components/ViewDestroyedDetails";

const headCells = [
  { id: 1, title: "Intitute No" },
  { id: 2, title: "Intitute name" },
  { id: 3, title: "Intitute type" },
  { id: 4, title: "Intitute location" },
  { id: 5, title: "Action" },
];

function ExpiryDrugs(props) {
  const [institutions, setInstitutions] = useState([]);
  const [destroyed, setDestroyed] = useState([]);
  const [instituteId, setInstituteId] = useState(0);
  const [show, setShow] = useState(false);

  const { profile } = props;

  const handleClose = () => {
    setShow(false);
  };

  const totalPills = destroyed.reduce((total, item) => {
    return total + item.expired_unit_quantity;
  }, 0);

  const showDialog = (refNo) => {
    setShow(true);
    getDestroyed(refNo);
    singleInstitute(refNo);
  };

  const retrieveIntitutions = async () => {
    try {
      const { data } = await getAllintitutions();
      setInstitutions(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("An unexpected error occurred. Please try again later.");
      } else {
        warningToast("Failed to load institutions. Try after some time.");
      }
      console.log(ex.response);
    }
  };

  const singleInstitute = async (refNo) => {
    try {
      const { data } = await getSingleintitution(refNo);
      setInstituteId(data.id);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("An unexpected error occurred. Please try again later.");
      } else {
        warningToast("Failed to load an institution. Try after some time.");
      }
      console.log(ex.response);
    }
  };

  const getDestroyed = async (refNo) => {
    try {
      const { data } = await getDestroyedDrugs(refNo);
      setDestroyed(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("An unexpected error occurred. Please try again later.");
      } else {
        warningToast("Failed to load data. Try after some time.");
      }
      console.log(ex.response);
    }
  };

  useEffect(() => {
    retrieveIntitutions();
  }, [show]);

  const { actual_user } = profile;

  return (
    <Content title="Expiry Drugs" profile={profile}>
      <div className="row">
        <div className="col-md-12">
          <TableController>
            <TableHeadController headcells={headCells} />
            <tbody>
              {institutions.map((data) => (
                <tr key={data.id}>
                  <td>{data.reference_number}</td>
                  <td>{data.name}</td>
                  <td>{data.institute_type_name}</td>
                  <td>{data.location_region}</td>
                  <td>
                    <button
                      onClick={() => showDialog(data.reference_number)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="fa fa-eye" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableController>
        </div>
        <ModalController setShow={handleClose} show={show} btnText="Cancel">
          <ViewDestroyedDetails
            userId={actual_user}
            instituteId={instituteId}
            total={totalPills}
            destroyed={destroyed}
            handleClose={handleClose}
          />
        </ModalController>
      </div>
    </Content>
  );
}

export default ExpiryDrugs;
