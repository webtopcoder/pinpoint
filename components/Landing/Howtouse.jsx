import React from "react";
import useMedia from "@/hooks/useMedia";
import Link from "next/link";
import { Button, Space } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const Howtouse = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  return (
    <div className="features-area bg-175594 ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>How to use <span style={{
            color: '#165593'
          }}>PIN</span><span style={{
            color: '#EC2226'
          }}>POINT</span></h2>
          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <span className="ribbona">As a User</span>
          {/* <span className="sub-title light-green-color">As a User</span> */}
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
              <h3>Sign up for FREE!</h3>
              <p>
                Easily sign upwith <b>Pinpoint</b> to start the adventure today!
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
                <i className="flaticon-employee"></i>
              </div>
              <h3>Build Your Profile</h3>
              <p>
                Setup your <b>profile</b> to leave a great impression!
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="single-features-box active">
              <div className="icon">
                <i className="flaticon-loupe"></i>
              </div>
              <h3>Find a Partner</h3>
              <p>
                Hop on our <b>Interactive Map</b> to find nearby Food Trucks and Coffee Carts! Favourite a location to be <b>notified</b> when they become active!
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1200"
          >
            <div className="single-features-box active">
              <div className="icon">
                <i className="flaticon-united"></i>
              </div>
              <h3>Get Social</h3>
              <p>
                After your visit, don't forget to leave feedback! Share photos, reviews etc. to expose this gem with your friends!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="section-title">
          <div className="auth-space"></div>
          <div className="auth-space"></div>
          <span className="ribbona">As a Partner</span>
          {/* <span className="sub-title light-green-color">As a User</span> */}
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
                Just arrived to the location. you will be operating at <b>today</b>? Simply quick arrive at this location on our map for customers to see.
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
        <div
          className="col-lg-12 col-md-12 col-sm-8"
        >
          <div className="lets-start-box">
            <Link href="/contact">
              <Button type="link" icon={<ArrowRightOutlined />} size="large">Learn more about Pinpoint Partner</Button>
              {/* <a className="btn-style-one dark-green-color">
                Get Started Now <i className="bx bx-chevron-right"></i>
              </a> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howtouse;
