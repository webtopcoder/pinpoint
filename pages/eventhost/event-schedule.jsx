import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Eventhost/Sidebar";
import EventhostEventSchedule from "@/components/Eventhost/EventSchedule";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const EventSchedule = () => {
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
          <EventhostEventSchedule />
        </Layout>
      </div>
    </>
  );
};

EventSchedule.requireAuth = true;

EventSchedule.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default EventSchedule;
