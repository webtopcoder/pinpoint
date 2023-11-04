import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Layout from "../../../layout";
import DetailMain from "@/components/Message/Detail/Index";

const detail = () => {
    return (
        <>
            <PageTitle page="MESSAGE INBOX" />
            <div className="page-title-area">
                <div className="container">
                    <div className="page-title-content">
                        <span className="sub-title">Message</span>
                        <h1>Inbox</h1>
                    </div>
                </div>
            </div>
            <div className="profile-authentication-area bg-f8fbff">
                <DetailMain tab="1" />
            </div>
        </>
    );
};

detail.requireAuth = true;
detail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default detail;
