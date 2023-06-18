import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Eventhost/Sidebar";
import EventhostEvents from "@/components/Eventhost/Events";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const Events = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="Events" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <EventhostEvents />
        </Layout>
      </div>
    </>
  );
};

Events.requireAuth = true;

Events.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default Events;
