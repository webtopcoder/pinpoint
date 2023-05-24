import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnerLocations from "@/components/Partner/Locations";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const Locations = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="LOCATIONS" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
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
