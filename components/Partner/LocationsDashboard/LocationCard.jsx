import React, { useEffect, useState } from "react";
import useNotify from "@/hooks/useNotify";
import {
  MessageFilled,
  LikeFilled,
  FieldTimeOutlined,
  EllipsisOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Rate,
  Row,
  Space,
  Tag,
  Typography,
  message,
  Badge
} from "antd";
import { Avatar, Card } from "antd";
import Link from "next/link";
import ArrivalModal from "./ArrivalModal";
import { connect } from "react-redux";
import baseUrl, { apiBaseUrl } from "@/utils/baseUrl";
import ModifyLocationModal from "./ModifyLocationModal";
import { useRouter } from "next/router";
import { locationService } from "@/services/index";
import Image from "next/image";
import {
  getUserInfo,
} from "@/redux/Profile/actions";

const { Text } = Typography;

const IconText = ({ icon, text }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const avatarurl = `${apiBaseUrl}/avatar/`;

const LocationCard = ({
  onDepartureSet,
  location,
  showActions,
  user_id,
  setLocations,
  locations,
  additionLocatoins,
  userInfo,
  ongetUser
}) => {

  const [arrivalModalOpen, setArrivalModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(true);

  let count = 0;

  const { notify } = useNotify();
  const router = useRouter();

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
    await locationService.getLocations({ partner: user_id, isActive: status })
      .then(async (res) => {
        setLoading(false);
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setLocations(filteredData);
        }
        else {
          await setLocations(res.results);
        }
      })
      .catch((error) => {
        setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  const departure = (location_id) => {
    const form = {
      locationId: location_id,
    };
    onDepartureSet(form, (_, error) => {
      if (error) {
        notify("error", "Error");
        return;
      }
      notify("success", "Successfully departed");
      initialize(null);
    });
  };

  const items = [
    {
      label: (
        <Link
          href={`${baseUrl}/profile/${location.partner._id ?? location.partner}/locations/${location._id}`}
        >
          View Location Profile
        </Link>
      ),
      key: "0",
    },
    {
      label: <a onClick={() => setModifyModalOpen(true)}>Modify Location</a>,
      key: "1",
    },
  ];

  const [rating, setRating] = useState(location.reviews.length > 0 ? (location.reviews.reduce((acc, review) => {
    if (review.rating !== 0) count++
    return acc + review.rating;
  }, 0)) / count : 0);


  useEffect(async () => {
    await ongetUser((res, error) => {
      if (error) {
        console.log(error);
        notify("error", "Fail");
      }
    });
  }, []);

  return (
    <>
      <Badge.Ribbon text={location?.isActive ? "Active" : "Inactive"} color={location.isActive ? "green" : "red"}
      >
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
                <Button type="link" onClick={() => {
                  if (userInfo?.activePartnership && userInfo?.activeSubscription && new Date(userInfo?.partnershipPriceRenewalDate) > new Date())
                    setArrivalModalOpen(true)
                  else
                    notify(
                      "error",
                      "You're not subscribed to this service"
                    );
                }}>
                  Arrival
                </Button>
              ),
              location.isActive ? (
                <Button type="link" onClick={async () => {
                  await locationService.quickDeparture({ locationId: location._id })
                    .then(async () => {
                      notify("success", "Successfully departed");
                      await initialize(null);
                    })
                    .catch((error) => {
                      notify(
                        "error",
                        error?.response?.data?.message || "Something went wrong"
                      );
                      return;
                    });
                }}>
                  Departure
                </Button>
              ) : (
                <Button type="link" disabled>
                  Departure
                </Button>
              ),
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <EllipsisOutlined />
              </Dropdown>,
            ]
          }

        >
          <div onClick={() => {
            router.push(`/profile/${location.partner._id ?? location.partner}/locations/${location._id}`);
          }}>
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
        </Card >
      </Badge.Ribbon>
      <ArrivalModal
        openArrival={arrivalModalOpen}
        setArrivalModalOpen={setArrivalModalOpen}
        uploadProps={uploadProps}
        setLocations={setLocations}
        locations={locations}
        locationInfo={location}
        uploadFile={uploadFile}
      />

      <ModifyLocationModal
        modalOpen={modifyModalOpen}
        setModalOpen={setModifyModalOpen}
        setLocations={setLocations}
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
