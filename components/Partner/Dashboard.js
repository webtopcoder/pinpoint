import quickArrival from "@/public/images/partner/quick_arrival.png";
import quickDeparture from "@/public/images/partner/quick_departure.png";
import {
  getLocations,
  quickDeparture as quickDepartureAction,
  quickArrival as quickArrivalAction,
} from "@/src/redux/Location/actions";
import { getDashboardInfo } from "@/src/redux/Profile/actions";
import { Card, Col, Layout, message, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import ArrivalModal from "../Locations/ArrivalModal";
import DepartureModal from "../Locations/DepartureModal";
import toast from "../Toast";

const { Content } = Layout;

const PartnerDashboard = ({
  userId,
  ongetLocations,
  ongetDashboardInfo,
  dashboardInfo,
}) => {
  const router = useRouter();
  const [upload_name, setUploadFile] = useState([]);

  const [arrivalModalOpen, setModal2Open] = useState(false);
  const [departureModalOpen, setModal1Open] = useState(false);
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const uploadProps = {
    name: "upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        const fileUploadInfo = info.fileList;
        setUploadFile(fileUploadInfo);
      }

      if (info.file.status == "removed") {
        if (info.fileList.length == 0) setUploadFile([]);
        else {
          const fileUploadInfo = info.fileList;
          setUploadFile(fileUploadInfo);
        }
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (router.isReady) {
      if (arrivalModalOpen) {
        ongetLocations({ isActive: false, partner: userId }, (_, error) => {
          if (error) {
            notify("error", "Something went wrong!");
            return;
          }
        });
      }

      if (departureModalOpen) {
        ongetLocations({ isActive: true, partner: userId }, (_, error) => {
          if (error) {
            notify("error", "Something went wrong!");
            return;
          }
        });
      }
    }
  }, [departureModalOpen, arrivalModalOpen, router.isReady]);

  useEffect(() => {
    ongetDashboardInfo((_, error) => {
      if (error) {
        notify("error", "Something went wrong!");
        return;
      }
    });
  }, []);

  return (
    <Layout
      className="site-layout"
      style={{

        background: "#211f1f",
      }}
    >
      {" "}
      <Content
        style={{
          margin: "60px 40px",
        }}
      >
        {" "}
        <div className="site-card-wrapper">
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Partner Locations"
                bordered={false}
              >
                {dashboardInfo?.partnerLocations}
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Active Locations"
                bordered={false}
              >
                {dashboardInfo?.activeLocations}
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Followers"
                bordered={true}
              >
                {dashboardInfo?.followers}
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6} lg={6} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Profile Views"
                bordered={false}
              >
                {dashboardInfo?.profileViews}
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Business Rating"
                bordered={false}
              >
                {dashboardInfo?.businessRating == "NaN" ? 0 : dashboardInfo?.businessRating}
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Check In's"
                bordered={false}
              >
                {dashboardInfo?.checkIns}
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-quickpost-style"
                title="Quick Post"
                bordered={true}
                onClick={() => {
                  router.push(`/profile/${userId}/activity`);
                }}
              >
                +
              </Card>
            </Col>
            <Col xs={24} sm={8} md={6} lg={8} xl={6}></Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <div
                className="dashboard-imagebutton"
                onClick={() => setModal2Open(true)}
              >
                <Image
                  className="imagebutton-img"
                  src={quickArrival}
                  alt="Snow"
                />
                <div className="centered">
                  Quick
                  <br />
                  Arrival
                </div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <div
                className="dashboard-imagebutton"
                onClick={() => setModal1Open(true)}
              >
                <Image
                  className="imagebutton-img"
                  src={quickDeparture}
                  alt="Snow"
                />
                <div className="centered">
                  Quick
                  <br />
                  Departure
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
      {/* Arrival Modal */}
      <ArrivalModal
        openArrival={arrivalModalOpen}
        setArrivalModalOpen={setModal2Open}
        uploadProps={uploadProps}
        uploadFile={upload_name}
      />
      {/* Departure Modal */}
      <DepartureModal
        modalOpen={departureModalOpen}
        setModalOpen={setModal1Open}
        uploadProps={uploadProps}
      />
    </Layout>
  );
};
const matchStateToProps = ({ location, profile, user }) => {
  return {
    locations: location.userLocations,
    userId: user.user_id,
    dashboardInfo: profile.dashboardInfo,
  };
};

const matchDispatchToProps = (dispatch) => ({
  onquickArrival: (data, cb) => dispatch(quickArrivalAction(data, cb)),
  onquickDeparture: (data, cb) => dispatch(quickDepartureAction(data, cb)),
  ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
  ongetDashboardInfo: (cb) => dispatch(getDashboardInfo(cb)),
});

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(PartnerDashboard);
