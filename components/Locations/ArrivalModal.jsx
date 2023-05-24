import useNotify from "@/hooks/useNotify";
import food from "@/public/images/landing/food.png";
import { quickArrival } from "@/src/redux/Location/actions";
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
  DatePicker
} from "antd";
import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { locationService } from "@/services/index";

const { Title } = Typography;
const { TextArea } = Input;

function ArrivalModal({
  openArrival,
  setArrivalModalOpen,
  formInitialValues,
  uploadProps,
  onquickArrival,
  user_id,
  locationInfo,
  uploadFile,
  additionLocatoins,
  setLocations,
  locations
}) {

  const [arrivalForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const { notify } = useNotify();

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
        setLoading(false);
        if (additionLocatoins.length > 0) {
          const filteredData = res.results.filter(obj => additionLocatoins.includes(obj._id));
          await setLocations(filteredData);
        }
        else
          await setLocations(res.results);
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

  useEffect(() => {
    if (openArrival)
      initialize(false);
  }, []);

  return (
    <Modal
      className="dashboard-modal"
      centered
      open={openArrival}
      width={700}
      closable={true}
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
        onFinish={(values) => {
          const formData = new FormData();
          uploadFile.map((file) =>
            formData.append("images", file.originFileObj)
          );
          formData.append("arrivalText", values.arrivalText);
          formData.append("departureAt", values.departureAt);

          const date1 = new Date(moment());
          const date2 = new Date(values.departureAt);
          const diffInMs = date2.getTime() - date1.getTime();
          const diffInHours = diffInMs / (1000 * 60 * 60);

          if (diffInHours < 0) {
            notify("error", "Selected Time is aleady passed.");
            return;
          }
          else if (diffInHours > 12) {
            notify("error", "Selected Time is over 12 hours.");
            return;
          }
          else {
            onquickArrival(
              { locationId: values.locationId, form: formData },
              (_, error) => {

                setArrivalModalOpen(false);
                if (error) {
                  notify("error", error.response.data.message);
                  return;
                }
                arrivalForm.resetFields();
                notify("success", "Successfully arrived");
                initialize(null)
              }
            );
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
                  options={locations.map((location) => ({
                    value: location._id,
                    label: location.title,
                  }))}
                ></Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="arrivalText" label="Let us know what you think!">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item name="fileupload">
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-submit"
                    style={{
                      display: "initial",
                      float: "right",
                    }}
                  >
                    Let's Go
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

const mapStateToProps = ({ user }) => ({
  user_id: user.user_id,
  additionLocatoins: user.additionLocatoins,
});

const mapDispatchToProps = (dispatch) => ({
  onquickArrival: (payload, cb) => dispatch(quickArrival(payload, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(ArrivalModal));
