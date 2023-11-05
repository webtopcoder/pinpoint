import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import NotificationMain from "@/components/Common/notifications";
import Layout from "../../layout";

const Notifications = () => {
    return (
        <>
            <PageTitle page="NOTIFICATIONS" />
            <div className="page-title-area">
                <div className="container">
                    <div className="page-title-content">
                        <h1>NOTIFICATIONS</h1>
                    </div>
                </div>
            </div>
            <div className="profile-authentication-area bg-f8fbff">
                <NotificationMain />
            </div >
        </>
    );
};

Notifications.authenticate = true;

Notifications.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export default Notifications;
