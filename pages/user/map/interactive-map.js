import React, { useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import { Col, InputNumber, Row, Slider, Button, Tooltip, Space } from 'antd';
import { FullscreenOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Image from "next/image";
import userImg1 from "@/public/images/user/user1.jpg";
import Layout from '../../../layout';


const InteractiveMap = () => {
  const formatter = (value) => `${value}mile`;

  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <>
      <PageTitle page="Interactive Map" />
      <div className="page-interactive-area bg-black">
        <div className="container">
          <div className="page-interactive-content">
            <h1>Where are the goods at?</h1>
            <span className="sub-title">BROUGHT TO YOU BY PINPOINT</span>
          </div>
          <div className="shout-area followers green-color">
            <div className="shout-body">
              <div className="shout-author vcard">
                <div className="avatar">
                  <Image
                    src={userImg1}
                    alt="user"
                    className="shout-radius"
                  />
                </div>
                <form className="search-form">
                  <input
                    type="search"
                    className="search-field"
                    placeholder="Enter Address or Share Location"
                  />
                  <button type="submit">
                    <i className="bx bx-current-location"></i>
                  </button>
                </form>

              </div>
              <div className="shout-metadata">
                <span>Search Radius:</span>
                <Row>
                  <Col span={20}>
                    <Slider
                      tooltip={{
                        formatter
                      }}
                      min={1}
                      max={20}
                      onChange={onChange}
                      value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={20}
                      style={{
                        margin: '0 16px',
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
                  <div className="form-group">
                    <select
                      name="state"
                      className="form-control"
                    >
                      <option value="0">Select Category</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="state"
                      className="form-control"
                    >
                      <option value="0">Select SubCategory</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="pin-post-footer-section">
                      <div className="pin-edit-button-section">
                        <button
                          type="submit"
                          className="btn-style-one red-light-color"
                        >
                          Pinpoint
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="shout-end-group">
              <div className="container">
                <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                    <div className="pin-post-footer-section">
                      <div className="pin-edit-button-section">
                        <Tooltip title="Full Screen">
                          <Button type="primary" style={{
                            height: 70
                          }} icon={<FullscreenOutlined style={{
                            fontSize: 40
                          }}/>} />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="pin-post-footer-section">
                      <div className="pin-edit-button-section">
                        <Tooltip title="List View">
                          <Button type="primary" style={{
                            height: 70
                          }} icon={<UnorderedListOutlined style={{
                            fontSize: 40
                          }}/>} />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

InteractiveMap.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default InteractiveMap;
