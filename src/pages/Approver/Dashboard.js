import React, { useState, useEffect } from 'react';
import Content from "../../components/Content";
import {getApprovedBatches, getUnapprovedBatches} from "../../services/batch.services";

const Dashboard = (props) => {
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [pendingBatches, setPendingBatches] = useState([]);

    const { profile } = props;

    const getPendingBatches = async () => {
        try {
            const response = await getUnapprovedBatches();
            setPendingBatches(response.data);
            setPendingCount(response.data.length);
        } catch (ex) {
            console.log(ex.response);
        }
    };

    const getAcceptedBatches = async () => {
        try {
            const response = await getApprovedBatches();
            setAcceptedCount(response.data.length);
        } catch (ex) {
            console.log(ex.response);
        }
    };

    useEffect(() => {
        getPendingBatches();
        getAcceptedBatches();
    }, []);

    return (
        <Content title="Dashboard" profile={profile}>
            <div className="col-md-6">
                <div className="card border-dark " style={{ maxWidth: "32rem", marginLeft: 10 }}>
                    <div className="card-body text-success">
                        <h1 className="card-title text-center">{pendingCount}</h1>
                    </div>
                    <div className="card-footer text-center bg-transparent border-success">Pending Approval Batches</div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card border-dark" style={{maxWidth: "32rem"}}>
                    <div className="card-body text-success">
                        <h1 className="card-title text-center">{acceptedCount}</h1>
                    </div>
                    <div className="card-footer text-center bg-transparent border-success">Approved Batches Batches</div>
                </div>
            </div>
            <div className="col-md-12 m-3 border-top">
                <h6 className="text-center text-muted p-2">Pending Approval Batches</h6>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Batch No</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Production Date</th>
                        <th scope="col">Expiry Date</th>
                        <th scope="col">Registration Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Approval Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        pendingBatches.map((item) => (
                            <tr>
                                <th scope="row">1</th>
                                <td>{item.batch_number}</td>
                                <td>{item.manufacturer}</td>
                                <td>{item.production_date}</td>
                                <td>{item.expiry_date}</td>
                                <td>{item.production_date}</td>
                                <td>{item.quantity_received}</td>
                                <td>
                                    <strong className="text-danger">{item.status ? "Approved": "Pending"}</strong>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </Content>
    );
};

export default Dashboard;