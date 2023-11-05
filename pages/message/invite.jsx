import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Layout from "../../layout";
import InviteMain from "@/components/Message/Invites/Index";

const invite = () => {
    return (
        <>
            <PageTitle page="MESSAGE Invitation" />
            <div className="page-title-area">
                <div className="container">
                    <div className="page-title-content">
                        <span className="sub-title">Message</span>
                        <h1>INVITATION</h1>
                    </div>
                </div>
            </div>
            <div className="profile-authentication-area bg-f8fbff">
                <InviteMain />
            </div>
        </>
    );
};

invite.requireAuth = true;
invite.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default invite;
