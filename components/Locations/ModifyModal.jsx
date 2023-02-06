import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import useNotify from "@/hooks/useNotify";
import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Modal,
  Row,
  Col,
  Typography,
  Input,
  Divider,
  Select,
  Upload,
  Button,
  Space,
} from "antd";
import {
  deleteLocationById,
  getLocations,
  updateLocationById,
} from "@/src/redux/Location/actions";
import Image from "next/image";
import config from "@/utils/config";
import { getsubCategory } from "@/src/redux/User/actions";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const mapAutoCompleteOptions = {
  componentRestrictions: { country: "us" },
  fields: [
    "address_components",
    "adr_address",
    "formatted_address",
    "geometry",
    "name",
  ],
  types: ["establishment"],
};

const avatarurl = `http://${config.server}:${config.port}/avatar/`;

function ModifyModal({
  uploadProps,
  modalOpen,
  setModalOpen,
  locationInfo,
  onDeleteLocation,
  ongetLocations,
  onUpdateLocationByID,
  user_id,
  uploadFile,
  onGetSubCategories,
  subCategories,
  userCategoryId,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const [addressForm, setaddressForm] = useState({
    address: locationInfo?.mapLocation?.address,
    city: locationInfo?.mapLocation?.city,
    state: locationInfo?.mapLocation?.state,
    lat: locationInfo?.mapLocation?.latitude ?? 0,
    lng: locationInfo?.mapLocation?.lngitude ?? 0,
  });

  useEffect(() => {
    if (userCategoryId) {
      onGetSubCategories(userCategoryId, (_, error) => {
        if (error) {
          notify("error", "Error occurred");
        }
      });
    }
  }, [userCategoryId]);

  useEffect(() => {
    if (inputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        mapAutoCompleteOptions
      );

      autoCompleteRef.current?.addListener("place_changed", async function () {
        const place = await autoCompleteRef.current.getPlace();
        let itemLocality = "";
        let itemState = "";
        place.address_components.map((address_component, _) => {
          if (address_component.types[0] == "locality")
            itemLocality = address_component.long_name;
          if (address_component.types[0] == "administrative_area_level_1")
            itemState = address_component.long_name;
        });

        setaddressForm({
          ...addressForm,
          address: place.formatted_address,
          state: itemState,
          city: itemLocality,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      });
    }
  }, [inputRef.current]);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...addressForm,
      [field]: e.target.value,
    };
    setaddressForm(nextFormState);
  };

  const delete_location = (e, id) => {
    e.preventDefault();
    onDeleteLocation(id, (res, error) => {
      if (error) {
        console.log("error");
      } else {
        setModalOpen(false);
        notify("success", "Deleted Successfully.");
        ongetLocations({ partner: user_id }, (_, error) => {
          if (error) {
            notify(
              "error",
              error?.response?.data?.message ?? "Something went wrong"
            );
          }
        });
      }
    });
  };

  const subcategoryList = subCategories?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modalOpen}
      width={700}
      closable={false}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
        <Col
          xs={20}
          sm={20}
          md={8}
          lg={22}
          xl={22}
          style={{
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Title
            style={{
              textAlign: "center",
              fontWeight: 900,
            }}
            level={2}
          >
            Modify Location
          </Title>
          <Paragraph>
            A Location is a specific location of a business. <br /> You may have
            multiple locations and this will act as their individual profile.
          </Paragraph>
        </Col>
        <Col
          xs={4}
          sm={4}
          md={8}
          lg={2}
          xl={2}
          style={{
            textAlign: "right",
          }}
        >
          <Image src={food} alt="Snow" width={50} height={70} />
        </Col>
      </Row>
      <Divider style={{}} dashed></Divider>
      <Form
        form={form}
        onFinish={(values) => {
          const formData = new FormData();
          uploadFile.map((file) =>
            formData.append("images", file.originFileObj)
          );

          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("address", addressForm.address);
          formData.append("city", addressForm.city);
          formData.append("state", addressForm.state);
          formData.append("lat", addressForm.lat);
          formData.append("lng", addressForm.lng);
          formData.append("subCategories", values.subCategories);
          onUpdateLocationByID(locationInfo._id, formData, (_, err) => {
            if (err) {
              notify(
                "error",
                err?.response?.data?.message || "Something went error"
              );
              return;
            }
            notify("success", "Location Changed successfully");
            ongetLocations({ partner: user_id }, (_, error) => {
              if (error) {
                notify(
                  "error",
                  error?.response?.data?.message ?? "Something went wrong"
                );
              }
            });
          });
        }}
        layout="vertical"
        fields={[
          {
            name: ["title"],
            value: locationInfo.title,
          },
          {
            name: ["description"],
            value: locationInfo.description,
          },
        ]}
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Location Name"
              rules={[
                {
                  required: true,
                  message: "Please Insert Location Name",
                },
              ]}
              required
              name="title"
            >
              <Input placeholder="This will be your individual locations name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Address(Location)"
              rules={[
                {
                  required: true,
                  message: "Please Insert Location Address",
                },
              ]}
              required
            >
              <input
                ref={inputRef}
                value={addressForm.address}
                className="custom-placeautomate"
                onChange={onUpdateField}
                name="address"
                placeholder="This will be your individual locations address"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Location Sub Category"
              rules={[
                {
                  required: true,
                  message: "Please Choose Subcategory",
                  type: "array",
                },
              ]}
              required
              tooltip="This is a required field"
              name="subCategories"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                defaultValue={locationInfo.subCategories?.map(
                  (item) => item._id
                )}
                placeholder="Select all that apply"
                options={subcategoryList}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item label="Location Description" name="description">
              <TextArea
                placeholder="Anything you want your customers to know"
                rows={4}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="images">
              <Row>
                <Col span={8}>
                  <Upload
                    listType="picture"
                    maxCount={1}
                    defaultFileList={
                      locationInfo.images
                        ? [
                            {
                              uid: "0",
                              name: locationInfo.images[0]?.filepath,
                              status: "done",
                              url: avatarurl + locationInfo.images[0]?.filepath,
                              thumbUrl:
                                avatarurl + locationInfo.images[0]?.filepath,
                            },
                          ]
                        : ""
                    }
                    {...uploadProps}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                    >
                      Change Location Image
                    </Button>
                  </Upload>
                </Col>
                <Col
                  span={16}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                      danger
                      onClick={(e) => delete_location(e, locationInfo._id)}
                    >
                      Delete Location
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-submit"
                      style={{
                        display: "initial",
                        float: "right",
                      }}
                    >
                      Save Changes
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

const mapStateToProps = ({ user, profile }) => ({
  user_id: user.user_id,
  userCategoryId: profile.userinfo.category,
  subCategories: user.partnersubCategory?.subCategories,
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteLocation: (data, cb) => dispatch(deleteLocationById(data, cb)),
  onUpdateLocationByID: (locationID, data, cb) =>
    dispatch(updateLocationById(locationID, data, cb)),
  ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
  onGetSubCategories: (categoryId, cb) =>
    dispatch(getsubCategory(categoryId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyModal);
