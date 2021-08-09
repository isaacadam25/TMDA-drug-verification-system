import React from 'react';

const PageHeader = (props) => {
    const { title, profile } = props;

    return (
        <div className="row">
            <div className="col-md-8 p-0">
                <div className="clearfix" style={{ height: "70px" }}>
                   <i className="fa fa-th p-2 float-start" style={{ fontSize: "55px" }}/>
                   <h3 className="float-start mt-4" >{title}</h3>
                </div>
            </div>
            <div className="col-md-4">
                <p className="p-1 float-end">
                    <span className="h5 p-2 text-muted">{profile.first_name} {profile.last_name}</span><br/>
                    <span className="h6 p-2">Role: {profile.usertype_name}, {profile.organization_name}</span>
                </p>
            </div>
            <hr/>
        </div>
    );
};

export default PageHeader;