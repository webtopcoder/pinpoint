import React from "react";
import Link from "next/link";
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Howtouse = () => {
  return (
    <div className="features-area bg-175594 ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>How to use <span style={{
            color: '#165593'
          }}>PIN</span><span style={{
            color: '#EC2226'
          }}>POINT</span></h2>
        </div>
      </div>
      <div className="container">
        <div className="section-title">
          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <span className="ribbona">As a Partner</span>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-lg-3 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="single-features-box active">
              <div className="icon">
                <i className="flaticon-user-1"></i>
              </div>
              <h3>Sign up</h3>
              <p>
                Register your business with Pinpoint and <b>Get Started!</b>
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-features-box active">
              <div className="icon">
                <i className="flaticon-placeholder"></i>
              </div>
              <h3>Create location</h3>
              <p>
                If your business has multiple locations , <b>Create</b> a location for each . The physical address can be changed upon arriving on our <b>map</b>!
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-features-box active">
              <div className="icon">
                <i className="flaticon-delivery-truck"></i>
              </div>
              <h3>Arrive Location</h3>
              <p>
                Just arrived to the location. you will be operating at <b>today</b>? Simply quick arrive at this Location on our map for customers to see.
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1200"
          >
            <div className="single-features-box active">
              <div className="icon">
                <i className="flaticon-united"></i>
              </div>
              <h3>Get Social</h3>
              <p>
                Collect <b>feedback</b> from your customers and make their experience <b>unforgettable</b>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howtouse;
