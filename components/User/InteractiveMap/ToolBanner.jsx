import { Row, Button, Space, Col, InputNumber, Slider, Form, Select, Tooltip, Divider } from "antd";
import { CloseOutlined, AimOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef } from "react";
import { categoryService } from "@/services/index";
import classnames from "classnames";
import useMedia from "@/hooks/useMedia";

const { Option } = Select;

function ToolBanner({
  setPosition,
  getCurrentLocation,
  onChange,
  inputValue,
  onFinish,
  onClose
}) {

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const isWebDevice = useMedia('(min-width:700px)');
  const options = {
    componentRestrictions: { country: "us" },
    fields: [
      "address_components",
      "adr_address",
      "formatted_address",
      "geometry",
      "name",
    ],
  };

  const [categoryInfo, setCategoryInfo] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const formatter = (value) => `${value}mile`;

  async function onUpdateField(value) {
    const result = await categoryService.getSubcategory(value);
    const subarr = [];
    result?.subCategories?.map((item, index) => {
      const subitem = {
        value: item._id,
        label: item.name,
      };
      subarr.push(subitem);
    });
    setSubcategoryList(subarr);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setPosition({
        lat: latitude,
        lng: longitude,
      });
    });

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      setPosition({
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      });
    });

    categoryService.getCategory().then(async res => {
      await setCategoryInfo(res?.allcategories)
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <div className="container">
      <div className="d-flex flex-wrap mt-4">
        <div className="me-2">
          <h3 className="mb-3">Where are the goods at?</h3>
          <span className="sub-title text-danger">BROUGHT TO YOU BY PINPOINT</span>

        </div>
        <p className="ms-auto">
          <CloseOutlined onClick={onClose} style={{ fontSize: 35, cursor: 'pointer' }} />
        </p>
      </div>
      <Divider />
      <div className="page-title-content" style={{ textAlign: 'left' }}>
        <form>
          <label>
            <i className="bx bx-search"></i>
          </label>
          <input
            name="search"
            type="text"
            ref={inputRef}
            className="input-search search-field"
            placeholder="Enter Address or Share Location"
          />
          <Tooltip placement="top" title={"My Location"} className={classnames({ 'd-none': !isWebDevice })}>
            <Button style={{ top: 6.5 }} size="large" icon={<AimOutlined />} onClick={getCurrentLocation}>
            </Button>
          </Tooltip>
        </form>
        <Row>
          <h6 className="mt-4">Search Radius:</h6>
          <Col xs={24} sm={24} md={19} lg={19} xl={19}>
            <Slider
              tooltip={{
                formatter,
              }}
              trackStyle={{
                background: "#175594",
              }}
              handleStyle={{
                background: "white",
              }}
              min={1}
              max={50}
              onChange={onChange}
              value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
          <Col xs={0} sm={0} md={5} lg={5} xl={5}>
            <InputNumber
              min={1}
              max={50}
              style={{
                width: 60,
                margin: "0 16px",
              }}
              value={inputValue}
              onChange={onChange}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form
              name="validate_other"
              onFinish={onFinish}
              // style={{
              //   maxWidth: 600,
              // }}
              layout="vertical"
            >
              <Form.Item
                name="category"
                hasFeedback
              >
                <Select
                  size="middle"
                  onChange={(e) => onUpdateField(e)}
                  placeholder="Select Category">
                  <Option key={0} value="all">All</Option>
                  {categoryInfo?.map((option, index) => (
                    <Option key={index + 1} value={option._id}>{option.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="subcategory"
                hasFeedback>
                <Select
                  mode="multiple"
                  showSearch={false}
                  allowClear
                  maxTagCount={2}
                  style={{
                    width: "100%",
                  }}
                  size="middle"
                  placeholder="Select Subcategory"
                  options={subcategoryList}
                />
              </Form.Item>
              <Form.Item label="">
                <Button
                  size="large" style={{
                    marginTop: 10,
                    width: "100%",
                  }} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ToolBanner;