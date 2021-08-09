import React from 'react';
import Content from "../../components/Content";
import UnapprovedBatchTable from "./UnapprovedBatchTable";

const UnapprovedBatches = (props) => {
    const { profile } = props;

    return (
        <Content  title="Unapproved Batches" profile={profile}>
            <div className="col-md-12 col-sm-12" >
                <h6 className="h6 text-center p-1">List of Unapproved Batches</h6>
                <UnapprovedBatchTable />
            </div>
        </Content>
    );
};

export default UnapprovedBatches;