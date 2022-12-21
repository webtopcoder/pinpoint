import React from "react";
import Image from "next/image";
import PageTitle from "@/components/Layout/PageTitle";
import Testimonial from "@/components/Landing/Testimonial";
import LandingContact from "@/components/Landing/LandingContact";
import bannerImg from "@/public/images/landing/map-4-points.png";
import subtitleImg from "@/public/images/landing/title_border.png";
import food from "@/public/images/landing/food.png";
import coffee from "@/public/images/landing/coffee.png";
import mobile from "@/public/images/landing/mobile.png";
import farmers from "@/public/images/landing/farmers.png";
import christmas from "@/public/images/landing/christmas.png";
import pumkin from "@/public/images/landing/pumkin.png";
import fireworks from "@/public/images/landing/fireworks.png";
import location from "@/public/images/landing/location.png";
import Layout from '../layout';

const UserHome = (props) => {

  return (
    <>
      <PageTitle page="Landing" />
      <div className="software-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="software-banner-content">
                <h1>Finding YOUR<br /> favorite <u>Business</u><br /> <u>on Wheels</u> has<br /> never been <br />easier!</h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="banner-background"></div>
              <div className="software-banner-image" data-aos="fade-up">
                <div>
                  <Image className="main-banner" src={bannerImg} alt="banner-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-12 banner-sub-description">
              <p style={{
                fontSize: 26,
                color: "#2F2F2FBF",
                lineHeight: 1.5
              }}>
                No more going down the Google black hole<br /> when it comes to finding your favorite Food<br /> Truck, Farmers Markets or other mobile<br /> businesses.. Pinpoint will bring your favorites to<br /> your front door!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="overview-area ptb-100 bg-dark-gray">
        <div className="container">
          <div className="overview-box">
            <div className="row align-items-center">
              <div className="col-lg-1 landing-sub-title-img">
                <Image src={subtitleImg} alt="overview" />
              </div>
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">
                  Welcome to Pinpoint </p>
              </div>
              <div className="col-lg-6 col-md-12">
              </div>
              <div className="col-lg-4 col-md-12 overview-content">
                <h1>The<br /> Pinpoint <br />Promise</h1>
              </div>
              <div className="col-lg-8 col-md-12 overview-image">
                <p className="landing-sub-description">In this world where food trucks are dominating the food market, and most people are shifting their views on what food they put in their body, there is still a lingering issue. Where is my favorite food truck?! Pinpoint brings a simple solution to this issue. All of our Pinpoint Partners will be able to instantly display their current location, making it easy for our Pinpoint Users to find them whenever a craving arises! With our interactive map and ability for our Users and Partners to communicate directly and publicly, Pinpoint is merging Google and Social Media to change the game for good!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overview-area ptb-100 bg-light-gray">
        <div className="container">
          <div className="overview-box">
            <div className="row align-items-center">
              <div className="col-lg-1 landing-sub-title-img">
                <Image src={subtitleImg} alt="overview" />
              </div>
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">
                  Pinpoints Partners</p>
              </div>
              <div className="col-lg-6 col-md-12">
              </div>
              <div className="col-lg-4 col-md-12 overview-content">
                <h1>Currently<br /> Servicing</h1>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="container" style={{
                  marginLeft: 45
                }}>
                  <div className="section-landing-title">
                    <span className="sub-landing-title">Everyday Partners</span>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 col-md-6 col-sm-6"
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="300"
                    >
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={food} alt="icon" />
                        </div>
                        <h3>Food Trucks</h3>
                        <p>
                          Hard time finding<br /> your favorite food<br /> trucks? Poof!
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-6 col-sm-6"
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="200"
                    >
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={coffee} alt="icon" />
                        </div>
                        <h3>Coffee Carts</h3>
                        <p>
                          Need your local<br /> morning fix? Look no<br /> further...
                        </p>
                      </div>
                    </div>

                    <div
                      className="col-lg-4 col-md-6 col-sm-6"
                      data-aos="fade-up"
                      data-aos-duration="1200"
                      data-aos-delay="300"
                    >
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={mobile} alt="icon" />
                        </div>
                        <h3>Mobile Detailing</h3>
                        <p>
                          Strive for the cleanest ride!
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="section-landing-title" style={{
                    marginTop: 18
                  }}>
                    <span className="sub-landing-title">Seasonal Partners</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-12"></div>
              <div className="col-lg-11 col-md-12">
                <div className="container" style={{
                  marginLeft: 45
                }}>
                  <div className="row">

                    <div
                      className="col-lg-3 col-md-6 col-sm-6"
                    >
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={farmers} alt="icon" />
                        </div>
                        <h3>Farmers Market</h3>
                        <p>
                          Everybody love them some fresh veggies!
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-lg-3 col-md-6 col-sm-6"
                    >
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={christmas} alt="icon" />
                        </div>
                        <h3>Christmas Tree Lots</h3>
                        <p>
                          Choppin down or Pickin Up? We have all options.
                        </p>
                      </div>
                    </div>

                    <div
                      className="col-lg-3 col-md-6 col-sm-6"

                    >
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={pumkin} alt="icon" />
                        </div>
                        <h3>Pumpkin Patch</h3>
                        <p>
                          Hay Rides, Family Photos, Pumpkin Carving. Find em’ here!
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-lg-3 col-md-6 col-sm-6"
                    >
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={fireworks} alt="icon" />
                        </div>
                        <h3>Fireworks Stand</h3>
                        <p>
                          Boom. Crackle. Pop. We’re the one stop shop!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="pinpoint_location" className="overview-area ptb-100 bg-black">
        <div className="container">
          <div className="overview-box">
            <div className="row align-items-center">
              <div className="col-lg-1 landing-sub-title-img">
                <Image src={subtitleImg} alt="overview" />
              </div>
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">
                  Pinpoint Locations </p>
              </div>
              <div className="col-lg-6 col-md-12">
              </div>
              <div className="col-lg-4 col-md-12 overview-content">
                <h1 style={{
                  textAlign: 'right',
                  paddingRight: 28
                }}>Where’s <br />Pinpoint</h1>
                <div className="icon" style={{
                  textAlign: 'center'
                }}>
                  <Image
                    src={location}
                    width={150}
                    height={230}
                    alt="overview" />
                </div>
              </div>
              <div className="col-lg-8 col-md-12 overview-image">
                <div id="maps">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d629806.5608507423!2d-74.14550980308866!3d40.99473892694984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c295001ca56f9f%3A0x313170de6c0e7b75!2sFairview%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1630302531294!5m2!1sen!2sbd"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial />
      <div className="overview-area ptb-100 bg-black">
        <div className="container">
          <div className="overview-box">
            <div className="row align-items-center">
              <div className="col-lg-1 landing-sub-title-img">
                <Image src={subtitleImg} alt="overview" />
              </div>
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">
                  Contact Pinpoint</p>
              </div>
              <div className="col-lg-6 col-md-12">
              </div>
              <div className="col-lg-4 col-md-12 overview-content landing-contact-subtitle">
                <h1 style={{
                  textAlign: 'right',
                  paddingRight: 28,
                  paddingTop: 46
                }}>Whatcha <br />Thinkin?</h1>
              </div>
              <div id="pinpoint_contactus" className="col-lg-8 col-md-12 overview-image">
                <LandingContact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UserHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default UserHome;
