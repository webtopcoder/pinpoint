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
  Popconfirm
} from "antd";
import Image from "next/image";
import { apiBaseUrl } from "@/utils/baseUrl";
import useMedia from "@/hooks/useMedia";
import { locationService, categoryService } from "@/services/index";

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
};

const avatarurl = `${apiBaseUrl}/avatar/`;

function ModifyModal({
  uploadProps,
  modalOpen,
  setModalOpen,
  locationInfo,
  user_id,
  uploadFile,
  userCategoryId,
  setLocations,
  additionLocatoins
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const isWebDevice = useMedia('(min-width:700px)');

  const [addressForm, setaddressForm] = useState({
    address: locationInfo?.mapLocation?.address,
    city: locationInfo?.mapLocation?.city,
    state: locationInfo?.mapLocation?.state,
    lat: locationInfo?.mapLocation?.latitude ?? 0,
    lng: locationInfo?.mapLocation?.longitude ?? 0,
  });
  const [subCategories, setsubCategories] = useState([]);


  useEffect(() => {
    if (userCategoryId) {
      GetSubCategories();
    }
  }, [userCategoryId]);

  async function GetSubCategories() {
    const res = await categoryService.getSubcategory(userCategoryId)
    const subcategoryList = res?.subCategories.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    await setsubCategories(subcategoryList);
  }

  async function initialize(status) {
    await locationService.getLocations({ partner: user_id, isActive: status })
      .then(async (res) => {
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setLocations(filteredData);
        }
        else
          await setLocations(res.results);
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

  async function delete_location(e, id) {
    e.preventDefault();
    await locationService.DeleteLocation(id)
      .then(async () => {
        setModalOpen(false);
        notify("success", "Location Deleted successfully");
        await initialize(null);
      })
      .catch((error) => {
        setLoading(false);
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

  };

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modalOpen}
      width={700}
      closable={true}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={0} xl={0}></Col>
        <Col
          xs={24}
          sm={24}
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
          xs={0}
          sm={0}
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
        onFinish={async (values) => {
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

          await locationService.UpdateLocationByID(locationInfo._id, formData)
            .then(async () => {
              notify("success", "Location Updated successfully");
              await initialize(null);
            })
            .catch((error) => {
              notify(
                "error",
                error?.response?.data?.message || "Something went wrong"
              );
              return;
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
          {
            name: ["subCategories"],
            value: locationInfo.subCategories?.map(
              (item) => item._id
            ),
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
                placeholder="Select all that apply"
                options={subCategories}
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
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Upload
                    method="get"
                    listType="picture"
                    maxCount={1}
                    defaultFileList={
                      locationInfo.images.length > 0
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
                  xs={24} sm={24} md={16} lg={16} xl={16}
                  style={{
                    textAlign: isWebDevice ? "right" : 'center',
                    marginTop: isWebDevice ? 0 : 10
                  }}
                >
                  <Space>
                    <Popconfirm
                      title="Delete this Location"
                      description="Are you sure to delete?"
                      okText="Yes"
                      onConfirm={(e) => {
                        delete_location(e, locationInfo._id)
                      }}
                      cancelText="No"
                    >
                      <Button
                        hidden={locationInfo?.isActive || additionLocatoins.length > 0 ? true : false}
                        type="primary"
                        htmlType="submit"
                        className="btn-submit"
                        style={{
                          display: "initial",
                          float: "right",
                        }}
                        danger
                      >
                        Delete Location
                      </Button>
                    </Popconfirm>

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
  userCategoryId: profile?.userinfo?.category?._id,
});


export default connect(mapStateToProps, undefined)(ModifyModal);
