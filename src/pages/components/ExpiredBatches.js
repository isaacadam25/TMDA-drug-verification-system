import React from 'react';
import Controller from "../../controllers";

const ExpiredBatches = () => {
    return (
        <div className="col-md-6">
            <div className="card mb-2" >
                <div className="row g-0">
                    <div className="col-md-12">
                        <div className="card-body">
                            <h5 className="h5 text-center p-1">Expired Batches</h5>
                            <button className="btn btn-outline-primary btn-sm float-end"><i className="fa fa-file-excel-o" /> Export</button>
                            <Controller.TableController>
                                <thead>
                                <tr>
                                    <th>Batch No</th>
                                    <th>Quantity</th>
                                    <th>Expiry Date</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1009</td>
                                    <td>2000</td>
                                    <td>20/09/2020</td>
                                    <td>2000</td>
                                </tr>
                                </tbody>
                            </Controller.TableController>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpiredBatches;