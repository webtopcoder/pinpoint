import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from "../../layout";
import LeftSidebar from "@/components/Layout/Eventhost/Sidebar";
import EventhostEventScheduleDetail from "@/components/Eventhost/EventScheduleDetail";
import { Layout } from "antd";
import useMedia from "@/hooks/useMedia";

const EventSchedule = ({ id }) => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <>
      <PageTitle page="Event Schedule Detail" />
      <div className="page-partner-area">
        <Layout
          style={{
            minHeight: "130vh",
          }}
        >
          {isWebDevice ? <LeftSidebar /> : ""}
          <EventhostEventScheduleDetail id={id} />
        </Layout>
      </div>
    </>
  );
};

EventSchedule.requireAuth = true;

EventSchedule.getInitialProps = async ({ query }) => {
  const { id } = query

  return { id }
}

EventSchedule.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>;
};

export default EventSchedule;
