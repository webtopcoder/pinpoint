import React from "react";

import PageTitle from "@/components/Layout/PageTitle";

import Layout from "../../layout";
import InboxMain from "@/components/Message/Inbox/Index";

const inbox = () => {
  return (
    <>
      <>
        <PageTitle page="Message" />
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content">
              <h1>Messages</h1>
            </div>
          </div>
        </div>
        <div className="profile-authentication-area bg-f8fbff">
          <InboxMain />
        </div>
      </>
    </>
  );
};

inbox.requireAuth = true;
inbox.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default inbox;
