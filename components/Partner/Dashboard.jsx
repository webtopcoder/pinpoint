import quickArrival from "@/public/images/partner/quick_arrival.png";
import quickDeparture from "@/public/images/partner/quick_departure.png";
import { Card, Col, Layout, message, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import ArrivalModal from "./Locations/ArrivalModal";
import DepartureModal from "./Locations/DepartureModal";
import toast from "../Toast";
import useMedia from "@/hooks/useMedia";
import { locationService, profileService } from "@/services/index";
import {
  getUserInfo,
} from "@/redux/Profile/actions";
const { Content } = Layout;

const PartnerDashboard = ({
  userId,
  additionLocatoins,
  userInfo,
  ongetUser
}) => {
  const router = useRouter();
  const [upload_name, setUploadFile] = useState([]);
  const [locations, setLocations] = useState([]);
  const [dashboardInfo, setDashboardInfo] = useState([]);
  const isWebDevice = useMedia('(min-width:700px)');
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

  async function initialize(status) {
    await locationService.getLocations({ partner: userId, isActive: status })
      .then(async (res) => {
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setLocations(filteredData);
        }
        else {
          await setLocations(res.results);
        }
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  useEffect(() => {
    if (router.isReady) {
      if (arrivalModalOpen)
        initialize(false);
      if (departureModalOpen)
        initialize(true);
    }
  }, [departureModalOpen, arrivalModalOpen, router.isReady]);

  useEffect(async () => {
    await ongetUser((res, error) => {
      if (error) {
        console.log(error);
        notify("error", "Fail");
      }
    });

    await profileService.getDashboardInfo()
      .then((res) => {
        setDashboardInfo(res)
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
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
        className="partner-layout"
      >
        {" "}
        <div className="site-card-wrapper">
          <Row gutter={isWebDevice ? [32, 32] : [12, 12]}>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Partner Locations"
                bordered={false}
              >
                {dashboardInfo?.partnerLocations}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Active Locations"
                bordered={false}
              >
                {dashboardInfo?.activeLocations}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Followers"
                bordered={true}
              >
                {dashboardInfo?.followers}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Profile Views"
                bordered={false}
              >
                {dashboardInfo?.profileViews}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Business Rating"
                bordered={false}
              >
                {dashboardInfo?.businessRating == "NaN" ? 0 : dashboardInfo?.businessRating}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Check In's"
                bordered={false}
              >
                {dashboardInfo?.checkIns}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
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
            <Col xs={12} sm={8} md={6} lg={8} xl={6}></Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <div
                className="dashboard-imagebutton"
                onClick={() => {
                  if (userInfo?.activePartnership && userInfo?.activeSubscription && new Date(userInfo?.partnershipPriceRenewalDate) > new Date())
                    setModal2Open(true)
                  else
                    notify(
                      "error",
                      "You're not subscribed to this service"
                    );
                }}
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
                onClick={() => {
                  if (userInfo?.activePartnership && userInfo?.activeSubscription && new Date(userInfo?.partnershipPriceRenewalDate) > new Date())
                    setModal1Open(true)
                  else
                    notify(
                      "error",
                      "You're not subscribed to this service"
                    );
                }}
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
        setLocations={setLocations}
        locations={locations}
      />
      {/* Departure Modal */}
      <DepartureModal
        modalOpen={departureModalOpen}
        setModalOpen={setModal1Open}
        uploadProps={uploadProps}
        setLocations={setLocations}
        locations={locations}
      />
    </Layout>
  );
};
const matchStateToProps = ({ user, profile }) => {
  return {
    additionLocatoins: user.additionLocatoins,
    userId: user.user_id,
    userInfo: profile.userinfo
  };
};


const mapDispatchToProps = (dispatch) => ({
  ongetUser: (cb) => dispatch(getUserInfo(cb)),
});


export default connect(matchStateToProps, mapDispatchToProps)(PartnerDashboard);
