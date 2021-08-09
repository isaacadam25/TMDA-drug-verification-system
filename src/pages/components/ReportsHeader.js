import React from 'react';

const ReportsHeader = () => {
    return (
        <>
            <div className="col-md-6">
                <div className="card mb-2" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="/images/trending-company.png" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Top 3  Manufacturers</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">1. Shellys</li>
                                    <li className="list-group-item">2. Keko Pharmatheuticals</li>
                                    <li className="list-group-item">3. Mao LTD</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card mb-2" >
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="/images/trending-company.png" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Top 3 Medicines</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">1. Panadol</li>
                                    <li className="list-group-item">2. Paracetamol</li>
                                    <li className="list-group-item">3. Albendazone</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportsHeader;