import React, { useEffect, useState } from 'react';
import Content from "../../components/Content";
import Controller from "../../controllers";
import { getUserProfile, getUserToken } from "../../services/auth.services";
import ReportsHeader from "../components/ReportsHeader";

const Reports = () => {
    const [profile, setProfile] = useState({});

    const userProfile = async () => {
        try {
            const response = await getUserProfile(getUserToken());
            setProfile(response.data);
        } catch (ex) {
            console.log(ex.response);
        }
    };

    useEffect(() => {
        userProfile();
    },[])

    return (
        <Content title="Reports" profile={profile}>
            <ReportsHeader />
            <div className="col-md-12 border">
                <h5 className="h5 text-center p-1">Declined Batches</h5>
                <Controller.TableController>
                    <thead>
                    <tr>
                        <th>Batch No</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>View</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1009</td>
                        <td>2000</td>
                        <td>20/09/2020</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary"><i className="fa fa-eye" /> View</button>
                        </td>
                    </tr>
                    </tbody>
                </Controller.TableController>
            </div>

        </Content>
    );
};

export default Reports;