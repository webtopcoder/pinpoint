import useNotify from "@/hooks/useNotify";
import food from "@/public/images/landing/food.png";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
  DatePicker,
  Space,
  Radio,
} from "antd";
import Image from "next/image";
import React, { memo, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { locationService } from "@/services/index";

const { Title } = Typography;
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

function ArrivalModal({
  openArrival,
  setArrivalModalOpen,
  formInitialValues,
  uploadProps,
  user_id,
  locationInfo,
  uploadFile,
  additionLocatoins,
  setLocations,
  locations
}) {

  const [arrivalForm] = Form.useForm();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(false);
  const [addressHistory, setAddressHistory] = useState(locationInfo !== undefined ? locationInfo?.history : []);
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [addressForm, setaddressForm] = useState({
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  });
  const [addressType, setAddressType] = useState('new');

  const optionsWithDisabled = [
    {
      label: 'New',
      value: 'new',
    },
    {
      label: 'Old',
      value: 'old',
    },
  ];

  const onAddressType = ({ target: { value } }) => {
    setAddressType(value);
  };

  const disabledDate = (current) => {
    // Get the start of today and tomorrow
    const todayStart = dayjs().startOf('day');
    const tomorrowStart = dayjs().add(2, 'day').startOf('day');
    // Disable all dates before today and after tomorrow
    return !current || current.isBefore(todayStart) || current.isAfter(tomorrowStart);
  };

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

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = {
      ...addressForm,
      [field]: e.target.value,
    };
    setaddressForm(nextFormState);
  };

  useEffect(() => {
    if (openArrival)
      initialize(false);
  }, []);


  useEffect(() => {
    if (inputRef.current) {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        mapAutoCompleteOptions
      );

      autoCompleteRef.current.addListener("place_changed", async function () {
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
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      });
    }
  }, [inputRef.current]);

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={openArrival}
      width={700}
      closable={false}
      onOk={() => {
        arrivalForm.submit();
      }}
      onCancel={() => setArrivalModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
        <Col
          xs={20}
          sm={20}
          md={8}
          lg={8}
          xl={8}
          style={{
            margin: "auto",
          }}
        >
          <Title
            style={{
              textAlign: "center",
              fontWeight: 900,
            }}
            level={2}
          >
            Arrival
          </Title>
        </Col>
        <Col
          xs={4}
          sm={4}
          md={8}
          lg={8}
          xl={8}
          style={{
            textAlign: "right",
          }}
        >
          <Image src={food} alt="Snow" width={50} height={70} />
        </Col>
      </Row>
      <Form
        initialValues={formInitialValues}
        form={arrivalForm}
        fields={
          locationInfo
            ? [
              {
                name: ["locationId"],
                value: locationInfo._id,
              },
            ]
            : ""
        }
        onFinish={async (values) => {
          await setLoading(true);
          const formData = new FormData();
          uploadFile.map((file) =>
            formData.append("images", file.originFileObj)
          );
          formData.append("arrivalText", values.arrivalText);
          formData.append("departureAt", values.departureAt);
          formData.append("addressType", addressType);
          formData.append("history", JSON.stringify(addressForm));

          const date1 = new Date(moment());
          const date2 = new Date(values.departureAt);
          const diffInMs = date2.getTime() - date1.getTime();
          const diffInHours = diffInMs / (1000 * 60 * 60);

          if (diffInHours < 0) {
            notify("error", "Selected Time is aleady passed.");
            await setLoading(false);
            return;
          }
          else if (diffInHours > 12) {
            notify("error", "Selected Time is over 12 hours.");
            await setLoading(false);
            return;
          }
          else {
            await locationService.quickArrival({ locationId: values.locationId, form: formData })
              .then(async () => {
                await setLoading(false);
                await setArrivalModalOpen(false);
                arrivalForm.resetFields();
                notify("success", "Successfully Arrived");
                initialize(null);
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
        }}
        layout="vertical"
      >
        <Row>
          <Col xs={24} sm={24} md={6} lg={8} xl={8}>
            <Form.Item
              label="Departure"
              rules={[
                {
                  required: true,
                  message: "Please select time for departure",
                },
              ]}
              required
              name="departureAt"
            >
              <DatePicker
                format="YYYY-MM-DD h:mm a"
                disabledDate={disabledDate}
                use12Hours={true}
                inputReadOnly
                showTime={{
                  defaultValue: dayjs('00:00:00', 'HH:mm'),
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={18} lg={16} xl={16}>
            <Form.Item
              label="Partner Location"
              required
              name="locationId"
              tooltip="This is a required field"
              rules={
                !locationInfo
                  ? [
                    {
                      required: true,
                      message: "Please select a location",
                    },
                  ]
                  : ""
              }
            >
              {locationInfo ? (
                <Select
                  defaultValue={locationInfo._id}
                  size="middle"
                  style={{
                    width: "100%",
                  }}
                  options={[
                    { value: locationInfo._id, label: locationInfo.title },
                  ]}
                  disabled
                ></Select>
              ) : (
                <Select
                  size="middle"
                  style={{
                    width: "100%",
                  }}
                  onChange={async (e) => {
                    await locationService.getLocationInfo({ id: e, expand: false })
                      .then(async (res) => {
                        await setAddressHistory(res?.location?.history)
                      })
                      .catch((error) => {
                        setLoading(false);
                        notify(
                          "error",
                          error?.response?.data?.message || "Something went wrong"
                        );
                        return;
                      });
                  }}
                  options={locations.map((location) => ({
                    value: location._id,
                    label: location.title,
                  }))}
                ></Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please Insert Address",
                },
              ]}
              required
            >
              <Space.Compact block
                style={{
                  width: '100%'
                }}>
                <Radio.Group
                  options={optionsWithDisabled}
                  onChange={onAddressType}
                  value={addressType}
                  optionType="button"
                  buttonStyle="solid"
                />
                {addressType === "new" ? <input
                  style={{
                    width: 'calc(100% - 200px)',
                    marginLeft: 10,
                  }}
                  ref={inputRef}
                  value={addressForm.address}
                  className="custom-placeautomate"
                  onChange={onUpdateField}
                  name="address"
                /> : <Select
                  showSearch={false}
                  allowClear
                  style={{
                    marginLeft: 10,
                    width: "80%",
                  }}
                  onChange={async (e) => {
                    const history = addressHistory?.filter(obj => obj._id === e);
                    await setaddressForm(history[0]);
                  }}
                  placeholder="Select Previous Location"
                  options={addressHistory?.map((item) => ({
                    label: item.address,
                    value: item._id,
                  }))
                  }
                />}
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="arrivalText"
              rules={
                [
                  {
                    required: true,
                    message: "Please type your description for arrival.",
                  },
                ]
              }
              label="Let us know what you think!">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              rules={
                [
                  {
                    required: true,
                    message: "Please upload the photo for arrival.",
                  },
                ]
              }
              name="fileupload">
              <Row>
                <Col span={8}>
                  <Upload method="get" listType="picture" {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        marginRight: 10,
                      }}
                    >
                      Upload a Photo
                    </Button>
                  </Upload>
                </Col>
                <Col span={8} offset={8}>
                  <Space style={{
                    float: "right",
                  }}>
                    <Button
                      type="primary"
                      danger
                      onClick={() => setArrivalModalOpen(false)}
                      className="btn-submit"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      loading={loading}
                      htmlType="submit"
                      className="btn-submit"
                    >
                      Let's Go
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

const mapStateToProps = ({ user }) => ({
  user_id: user.user_id,
  additionLocatoins: user.additionLocatoins,
});

export default connect(mapStateToProps)(memo(ArrivalModal));
