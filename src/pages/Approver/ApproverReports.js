import React from 'react';
import Content from "../../components/Content";
import ReportsHeader from "../components/ReportsHeader";
import ExpiredBatches from "../components/ExpiredBatches";

const ApproverReports = (props) => {
    const { profile } = props;

    return (
        <Content title="Reports" profile={profile} >
            <ReportsHeader />
            <ExpiredBatches />
            <ExpiredBatches />
        </Content>
    );
};

export default ApproverReports;