import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from '../../../layout';
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import Edit from "@/components/Partner/Profile/Edit";
import { Layout } from 'antd';

const PartnerEdit = () => {
  return (
    <>
      <PageTitle page="Profile Edit" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: '130vh',
          }}
        >
          <LeftSidebar />
          <Edit />
        </Layout>
      </div>
    </>
  );
};

PartnerEdit.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>
}

export default PartnerEdit;