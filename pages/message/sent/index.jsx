import React from "react";

import PageTitle from "@/components/Layout/PageTitle";

import Layout from "../../../layout";
import SentMain from "@/components/Message/Sent/Index";

const index = () => {
  return (
    <>
      <>
        <PageTitle page="Message" />
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content">
              <span className="sub-title">Messages</span>
              <h1>Sent</h1>
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

index.requireAuth = true;
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default index;
