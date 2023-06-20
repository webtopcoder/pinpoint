import { Row, Button, Space, Col, InputNumber, Slider, Form, Select, Tooltip } from "antd";
import { UnorderedListOutlined, FullscreenOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef } from "react";
import food from "@/public/images/landing/food.png";
import Image from "next/image";
import { categoryService } from "@/services/index";

const { Option } = Select;

function ToolBanner({
  setPosition,
  getCurrentLocation,
  onChange,
  inputValue,
  onFinish,
  fullScreen,
  setAddModalOpen
}) {

  const autoCompleteRef = useRef();
  const inputRef = useRef();
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

  const formatter = (value) => `${value}mile`;
  const [categoryInfo, setCategoryInfo] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);

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
    <div className="shout-area followers green-color">
      <div className="shout-body">
        <div className="shout-author vcard">
          <div className="avatar desktop">
            <Image src={food} alt="user" className="shout-radius" />
          </div>
          <form className="search-form" action="javascript:void(0);">
            <input
              type="search"
              className="search-field"
              ref={inputRef}
              placeholder="Enter Address or Share Location"
            />
            <button onClick={getCurrentLocation}>
              <i className="bx bx-current-location"></i>
            </button>
          </form>
        </div>
        <div className="shout-metadata">
          <p>Search Radius:</p>
          <Row>
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
            <Col xs={0} sm={0} md={3} lg={3} xl={3}>
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
          </Row>
        </div>
      </div>
      <div className="shout-button-group">
        <div className="container">
          <div className="col-lg-12 col-md-12">
            <Form
              name="validate_other"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
              layout="vertical"
            >
              <Form.Item
                name="category"
                hasFeedback
              >
                <Select
                  size="large"
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
                  size="large"
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
                  Pinpoint
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="shout-end-group">
        <div className="container">
          <Space direction="horizontal" wrap>
            <Tooltip title="Full Screen">
              <Button
                type="primary"
                style={{
                  width: 70,
                  height: 70,
                }}
                icon={
                  <FullscreenOutlined
                    style={{
                      fontSize: 40,
                    }}
                  />
                }
                onClick={() => fullScreen()}
              />
            </Tooltip>
            <Tooltip title="List View">
              <Button
                type="primary"
                style={{
                  width: 70,
                  height: 70,
                }}
                onClick={() => setAddModalOpen(true)}
                icon={
                  <UnorderedListOutlined
                    style={{
                      fontSize: 40,
                    }}
                  />
                }
              />
            </Tooltip>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default ToolBanner;