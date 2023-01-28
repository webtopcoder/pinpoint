import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnerLocations from "@/components/Partner/Locations";
import { Layout } from "antd";

const Locations = () => {
  return (
    <>
      <PageTitle page="Locations" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          <LeftSidebar />
          <PartnerLocations />
        </Layout>
      </div>
    </>
  );
};

Locations.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default Locations;
