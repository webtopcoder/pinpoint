//optimized
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Badge, Spin, Card, Avatar, Button, Col, Divider, Rate, Row, Space, Tag, Typography, message } from "antd";
import { MessageFilled, LikeFilled, FieldTimeOutlined, EnvironmentOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import ArrivalModal from "./ArrivalModal";
import ModifyLocationModal from "./ModifyLocationModal";
import LocationDetailModal from "@/components/Common/LocationDetail";
import { locationService } from "@/services/index";
import { getUserInfo } from "@/redux/Profile/actions";
import { apiBaseUrl } from "@/utils/baseUrl";
import useNotify from "@/hooks/useNotify";

const { Text } = Typography;
const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const avatarurl = `${apiBaseUrl}/avatar/`;

const LocationCard = ({
  location,
  showActions,
  setLocations,
  locations,
  additionLocatoins,
  userInfo,
  ongetUser,
  initialize
}) => {

  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalFullscreen, setModalFullscreen] = useState(false);
  const { notify } = useNotify();

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

  const handleArrivalClick = () => {
    if (userInfo?.activePartnership && userInfo?.activeSubscription && new Date(userInfo?.partnershipPriceRenewalDate) > new Date()) {
      setArrivalModalOpen(true);
    } else {
      notify("error", "You're not subscribed to this service");
    }
  };

  const handleDepartureClick = async () => {
    if (location.isActive) {
      try {
        await locationService.quickDeparture({ locationId: location._id });
        notify("success", "Successfully departed");
        await initialize();
      } catch (error) {
        notify("error", error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleCardClick = async () => {
    await setLoading(true);
    setTimeout(async () => {
      await setModalFullscreen(true);
      await setLoading(false);
    }, 1000);
  };

  const calculateRating = () => {
    let count = 0;
    const totalRating = location.reviews.reduce((acc, review) => {
      if (review.rating !== 0) count++;
      return acc + review.rating;
    }, 0);
    return count > 0 ? totalRating / count : 0;
  };

  const rating = calculateRating();

  useEffect(() => {
    ongetUser((res, error) => {
      if (error) {
        console.log(error);
        notify("error", "Fail");
      }
    });
  }, [ongetUser]);

  return (
    <>
      <Badge.Ribbon text={location?.isActive ? "Active" : "Inactive"} color={location?.isActive ? "green" : "red"}>
        <Spin spinning={loading}>
          <Card
            hoverable
            style={{
              color: "#175594",
              cursor: "pointer",
            }}
            headStyle={{
              color: "white",
              textAlign: "center",
              background: "#175594"
            }}
            title={location.title}
            className="partner-locations-card"
            actions={
              showActions && [
                location.isActive ? (
                  <Button type="link" disabled>
                    Arrival
                  </Button>
                ) : (
                  <Button type="link" onClick={handleArrivalClick}>
                    Arrival
                  </Button>
                ),
                location.isActive ? (
                  <Button type="link" onClick={handleDepartureClick}>
                    Departure
                  </Button>
                ) : (
                  <Button type="link" disabled>
                    Departure
                  </Button>
                ),
                <Button icon={<EditOutlined />} onClick={() => setModifyModalOpen(true)}>
                  Edit
                </Button>
              ]
            }
          >
            <div onClick={handleCardClick}>
              <Row
                gutter={16}
                style={{
                  textAlign: "center",
                }}
                className="align-items-center"
              >
                <Col span={12}>
                  <Avatar
                    style={{ border: "3px solid white", cursor: "pointer" }}
                    size={150}
                    icon={
                      location.images.length !== 0 &&
                        location.images[0]?.filepath ? (
                        <Image
                          src={avatarurl + location.images[0]?.filepath}
                          height={200}
                          width={200}
                        />
                      ) : ""
                    }>
                    {location.images.length !== 0 &&
                      location.images[0]?.filepath ? "" : 'No Photo'}
                  </Avatar>
                </Col>
                <Col span={12}>
                  <IconText
                    icon={
                      <LikeFilled
                        style={{
                          fontSize: 30,
                        }}
                      />
                    }
                    text={
                      <Text
                        style={{
                          fontSize: 35,
                          color: "#175594",
                        }}
                      >
                        {location.totalLike ?? 0}
                      </Text>
                    }
                    key="list-vertical-like-o"
                  /><br />
                  <IconText
                    icon={
                      <MessageFilled
                        style={{
                          fontSize: 30,
                        }}
                      />
                    }
                    text={
                      <Text
                        style={{
                          fontSize: 35,
                          color: "#175594",
                        }}
                      >
                        {location.reviews.length ?? 0}
                      </Text>
                    }
                    key="list-vertical-message"
                  />
                </Col>
              </Row>
              <Divider
                style={{
                  borderColor: "black",
                }}
                dashed
              >
                <Tag color="blue">
                  {location?.isActive ? " Current Departure" : "Last Departure"}
                </Tag>
              </Divider>
              <Col
                style={{
                  marginTop: 20,
                  textAlign: "center",
                }}
                className="align-items-center"
              >
                <Space direction="vertical" className="gutter-row align-items-center" span={24}>
                  <Space>
                    <Text
                      style={{
                        color: "black",
                      }}
                    >
                      <EnvironmentOutlined className="" />{'  '}
                      {location?.mapLocation?.address ?
                        location?.mapLocation?.address : "Not Available"
                      }
                    </Text>
                  </Space>
                  <Space>
                    <Text
                      style={{
                        color: "black",
                      }}
                      className="align-middle"
                    >
                      <FieldTimeOutlined className="" />{'  '}
                      {location?.departureAt ?
                        new Date(location?.departureAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          hour12: true,
                          minute: "2-digit",
                          second: "2-digit",
                        }) : "Not Available"
                      }
                    </Text>
                  </Space>
                  <Space>
                    <Rate
                      disabled
                      allowHalf
                      tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
                      value={rating}
                    />
                  </Space>
                </Space>
              </Col>
            </div>
          </Card>
        </Spin>
      </Badge.Ribbon>
      <ArrivalModal
        openArrival={arrivalModalOpen}
        setArrivalModalOpen={setArrivalModalOpen}
        uploadProps={uploadProps}
        initialize={initialize}
        setLocations={setLocations}
        locations={locations}
        locationInfo={location}
        uploadFile={uploadFile}
      />
      <LocationDetailModal
        modal_fullscreen={modalFullscreen}
        location={location}
        setmodal_fullscreen={setModalFullscreen}
      />
      <ModifyLocationModal
        modalOpen={modifyModalOpen}
        setModalOpen={setModifyModalOpen}
        setLocations={setLocations}
        initialize={initialize}
        additionLocatoins={additionLocatoins}
        locationInfo={location}
        uploadProps={uploadProps}
        uploadFile={uploadFile}
      />
    </>
  );
};

const matchStateToProps = ({ user, profile }) => {
  return {
    additionLocatoins: user.additionLocatoins,
    user_id: user.user_id,
    userInfo: profile.userinfo
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetUser: (cb) => dispatch(getUserInfo(cb)),
});


export default connect(matchStateToProps, mapDispatchToProps)(LocationCard);
