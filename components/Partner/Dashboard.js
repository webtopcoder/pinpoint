import quickArrival from "@/public/images/partner/quick_arrival.png";
import quickDeparture from "@/public/images/partner/quick_departure.png";
import {
  getLocations,
  quickDeparture as quickDepartureAction,
  quickArrival as quickArrivalAction,
} from "@/src/redux/Location/actions";
import {
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import ArrivalModal from "../Locations/ArrivalModal";
import DepartureModal from "../Locations/DepartureModal";
import toast from "../Toast";

const { Content } = Layout;

const PartnerDashboard = ({ userId, ongetLocations }) => {
  const router = useRouter();
  const [upload_name, setUploadFile] = useState([]);

  const [modal2Open, setModal2Open] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
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
      if (modal2Open) {
        ongetLocations({ isActive: false, partner: userId }, (res, error) => {
          if (error) {
            notify("error", "Something went wrong!");
            return;
          }
        });
      }

      if (modal1Open) {
        ongetLocations({ isActive: true, partner: userId }, (res, error) => {
          if (error) {
            notify("error", "Something went wrong!");
            return;
          }
        });
      }
    }
  }, [modal1Open, modal2Open, router.isReady]);

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
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Partner Locations"
                bordered={false}
              >
                {" "}
                2{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Active Locations"
                bordered={false}
              >
                {" "}
                1{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Followers"
                bordered={true}
              >
                {" "}
                155{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={6} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Profile Views"
                bordered={false}
              >
                {" "}
                75{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Business Rating"
                bordered={false}
              >
                {" "}
                4.2{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-style"
                title="Check In's"
                bordered={false}
              >
                {" "}
                32{" "}
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}>
              <Card
                className="dashboard-card-quickpost-style"
                title="Quick Post"
                bordered={true}
              >
                +
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6} lg={8} xl={6}></Col>
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
        openArrival={modal2Open}
        setArrivalModalOpen={setModal2Open}
      />
      {/* Departure Modal */}
      <DepartureModal
        modalOpen={modal1Open}
        setModalOpen={setModal1Open}
        uploadProps={uploadProps}
      />
    </Layout>
  );
};
const matchStateToProps = ({ location, user }) => {
  return {
    locations: location.userLocations,
    userId: user.user_id,
  };
};

const matchDispatchToProps = (dispatch) => ({
  onquickArrival: (data, cb) => dispatch(quickArrivalAction(data, cb)),
  onquickDeparture: (data, cb) => dispatch(quickDepartureAction(data, cb)),
  ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
});

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(PartnerDashboard);
