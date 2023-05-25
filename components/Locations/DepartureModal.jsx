import useNotify from "@/hooks/useNotify";
import food from "@/public/images/landing/food.png";
import { Button, Col, Form, Modal, Row, Select, Typography } from "antd";
import Image from "next/image";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { locationService } from "@/services/index";

const { Title } = Typography;

function DepartureModal({
  modalOpen,
  setModalOpen,
  locations,
  setLocations,
  additionLocatoins,
  user_id,
}) {
  const [departureForm] = Form.useForm();
  const { notify } = useNotify();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (modalOpen) {
      initialize(true);
    }
  }, [modalOpen]);
  return (
    <Modal
      className="dashboard-modal"
      centered
      open={modalOpen}
      width={700}
      closable={false}
      onOk={() => {
        departureForm.submit();
        setModalOpen(false);
      }}
      onCancel={() => setModalOpen(false)}
      footer={null}
    >
      <Row>
        <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
        <Col
          xs={16}
          sm={16}
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
            Departure
          </Title>
        </Col>
        <Col
          xs={8}
          sm={8}
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
        form={departureForm}
        onFinish={async (values) => {
          await locationService.quickDeparture({ locationId: values.departureLocation })
            .then(async () => {
              await setModalOpen(false);
              departureForm.resetFields();
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
        }}
        layout="vertical"
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              label="Partner Location"
              name="departureLocation"
              required
              rules={[
                {
                  required: true,
                  message: "Please select a location",
                },
              ]}
              tooltip="This is a required field"
            >
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
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row>
              <Col xs={10} sm={10} md={6} lg={8} xl={10}></Col>
              <Col xs={14} sm={14} md={8} lg={8} xl={14}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-submit"
                  style={{
                    display: "initial",
                    float: "right",
                  }}
                >
                  Depart
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

const mapStateToProps = ({ user }) => ({
  additionLocatoins: user.additionLocatoins,
  user_id: user.user_id,
});

export default connect(mapStateToProps)(memo(DepartureModal));
