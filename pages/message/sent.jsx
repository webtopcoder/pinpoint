import React from "react";

import PageTitle from "@/components/Layout/PageTitle";

import Layout from "../../layout";
import SentMain from "@/components/Message/Sent/Index";

const sent = () => {
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
          <SentMain />
        </div>
      </>
    </>
  );
};

sent.requireAuth = true;
sent.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default sent;
