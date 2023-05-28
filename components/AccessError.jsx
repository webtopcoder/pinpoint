import React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

export default function AccessError() {
  return (
    <div className="not-found-area ptb-100">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="not-found-content">
              <Spin indicator={antIcon} />
              <h3 style={{
                marginTop: 20
              }}>Wait for a second, access checking</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}