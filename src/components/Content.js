import React from 'react';
import PageHeader from "./PageHeader";

const Content = (props) => {
    const { children, title, profile } = props;

    return (
        <div className="col-sm-12 col-md-9">
            <PageHeader title={title} profile={profile} />
            <div className="row">
                {children}
            </div>
        </div>
    );
};

export default Content;