import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Col,
  Row,
  Divider,
  Button,
  Modal,
  Typography,
  Form,
  Input,
  Select,
} from "antd";
import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import useNotify from "@/hooks/useNotify";
import { createLocation, getLocations } from "@/src/redux/Location/actions";
import { getsubCategory } from "@/src/redux/User/actions";
import { connect } from "react-redux";

const { TextArea } = Input;

const { Title, Paragraph } = Typography;

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

function AddLocationModal({
  open,
  user_id,
  setModalOpen,
  uploadProps,
  uploadFile,
  onAddLocation,
  ongetLocations,
  onGetSubCategories,
  subCategories,
  userCategoryId,
}) {
  const [form] = Form.useForm();
  const { notify } = useNotify();

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const [addressForm, setaddressForm] = useState({
    address: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (userCategoryId) {
      onGetSubCategories(userCategoryId, (_, error) => {
        if (error) {
          notify(error, "error");
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

  const subcategoryList = subCategories?.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={open}
      width={700}
      closable={false}
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
            Add Location
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

          onAddLocation(formData, (_, err) => {
            if (err) {
              notify(
                "error",
                err?.response?.data?.message || "Something went error"
              );
              return;
            }
            notify("success", "Location added successfully");
            form.resetFields();
            setaddressForm({
              address: "",
              city: "",
              state: "",
            });
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
              initialvalue={[]}
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
                  <Upload method="get" listType="picture" {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{ marginRight: 10 }}
                      maxCount={1}
                    >
                      Location Image
                    </Button>
                  </Upload>
                </Col>
                <Col span={8} offset={8}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-submit"
                    style={{
                      display: "initial",
                      float: "right",
                    }}
                  >
                    Add Location
                  </Button>
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
  ongetLocations: (data, cb) => dispatch(getLocations(data, cb)),
  onAddLocation: (data, cb) => dispatch(createLocation(data, cb)),
  onGetSubCategories: (categoryId, cb) =>
    dispatch(getsubCategory(categoryId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLocationModal);
