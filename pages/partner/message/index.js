import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from '../../../layout';
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import Mail from "@/components/Partner/Message";
import { Layout } from 'antd';

const PartnerMail = () => {
  return (
    <>
      <PageTitle page="Message" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: '130vh',
          }}
        >
          <LeftSidebar />
          <Mail />
        </Layout>
      </div>
    </>
  );
};

PartnerMail.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>
}

export default PartnerMail;