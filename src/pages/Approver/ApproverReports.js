import React, { useState, useEffect } from "react";
import { errorToast } from "../../utils/notify";
import {
  getDeclinedBatches,
  getApprovedBatches,
  getUnapprovedBatches,
  getExpiredBatches,
} from "../../services/batch.services";
import Content from "../../components/Content";
import ReportsHeader from "../components/ReportsHeader";
import ExpiredBatches from "../components/ExpiredBatches";
import DeclinedBatchesTable from "../components/DeclinedBatchesTable";
import ReportDetails from "../components/ReportDetails";
import { Tab, Tabs } from "react-bootstrap";
import ApprovedBatchesTable from "../components/ApprovedBatchesTable";

const ApproverReports = (props) => {
  const [declinedBatches, setDeclinedBatches] = useState([]);
  const [approvedBatches, setApprovedBatches] = useState([]);
  const [expiredBatches, setExpiredBatches] = useState([]);
  const [declinedCount, setDeclinedCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [unapprovedCount, setUnapprovedCount] = useState(0);
  const [key, setKey] = useState("approved");

  const { profile } = props;

  const retrieveApprovedBatches = async () => {
    try {
      const { data } = await getApprovedBatches();
      const response = await getUnapprovedBatches();
      setApprovedBatches(data);
      setApprovedCount(data.length);
      setUnapprovedCount(response.data.length);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("Unexpected error occurred. Please try again.");
      } else {
        errorToast(
          "Failed to load batches information. Try to reload the page."
        );
      }
    }
  };

  const retrieveDeclinedBatches = async () => {
    try {
      const { data } = await getDeclinedBatches();
      setDeclinedBatches(data);
      setDeclinedCount(data.length);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("Unexpected error occurred. Please try again.");
      } else {
        errorToast(
          "Failed to load batches information. Try to reload the page."
        );
      }
    }
  };

  const retrieveExpiredBatches = async () => {
    try {
      const { data } = await getExpiredBatches();
      setExpiredBatches(data);
    } catch (ex) {
      if (ex.response.status >= 500) {
        errorToast("Unexpected error occurred. Please try again.");
      } else {
        errorToast(
          "Failed to load batches information. Try to reload the page."
        );
      }
    }
  };

  useEffect(() => {
    retrieveDeclinedBatches();
    retrieveApprovedBatches();
    retrieveExpiredBatches();
  }, []);

  return (
    <Content title="Reports" profile={profile}>
      <ReportDetails title="Approved Batches" count={approvedCount} />
      <ReportDetails title="Unapproved Batches" count={unapprovedCount} />
      <ReportDetails title="Declined Batches" count={declinedCount} />
      <ReportDetails
        title="Total Batches"
        count={approvedCount + declinedCount + unapprovedCount}
      />
      <hr style={{ marginTop: 16 }} />
      <ReportsHeader />
      <hr className="mt-2" />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 mt-2"
        variant="pills"
      >
        <Tab eventKey="approved" title="Approved Batches">
          <ApprovedBatchesTable
            title="Approved Batches"
            items={approvedBatches}
          />
        </Tab>
        <Tab eventKey="declined" title="Declined Batches">
          <DeclinedBatchesTable
            title="Declined Batches"
            items={declinedBatches}
          />
        </Tab>
        <Tab eventKey="expired" title="Expired Batches">
          <ExpiredBatches items={expiredBatches} title="Expired Batches" />
        </Tab>
      </Tabs>
    </Content>
  );
};

export default ApproverReports;
