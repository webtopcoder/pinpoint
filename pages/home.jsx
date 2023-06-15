
import React, { useEffect, useState } from "react";
import { setCookie, getCookie, hasCookie } from 'cookies-next';
import LandingContact from "@/components/Landing/LandingContact";
import Testimonial from "@/components/Landing/Testimonial";
import Newpartners from "@/components/Landing/Newpartners";
import PageTitle from "@/components/Layout/PageTitle";
import christmas from "@/public/images/landing/christmas.png";
import coffee from "@/public/images/landing/coffee.png";
import farmers from "@/public/images/landing/farmers.png";
import fireworks from "@/public/images/landing/fireworks.png";
import food from "@/public/images/landing/food.png";
import location from "@/public/images/landing/location.png";
import bannerImgDesktop from "@/public/images/landing/map.png";
import bannerImgMobile from "@/public/images/landing/map-4-points.png";
import mobile from "@/public/images/landing/mobile.png";
import pumkin from "@/public/images/landing/pumkin.png";
import Image from "next/image";
import useNotify from "@/hooks/useNotify";
import { userService } from "@/services/index";
import { apiBaseUrl } from "@/utils/baseUrl";
import Layout from "../layout";
import { Button, notification, Space, Typography } from 'antd';
import useMedia from "@/hooks/useMedia";
import { browserName } from 'react-device-detect';

const { Paragraph, Text } = Typography;

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const UserHome = () => {
  const faviconUrl = `${apiBaseUrl}/location.png`;
  const [testimonials, setTestimonial] = useState();
  const [newpartners, setNewpartner] = useState();
  const [activePartners, setactivePartners] = useState();
  const isWebDevice = useMedia('(min-width:700px)');
  const [api, contextHolder] = notification.useNotification();
  const { notify } = useNotify();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => {
          setCookie('notify', true); // - client side
          api.destroy()
        }}>
          Don't display agian
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          Cancel
        </Button>
      </Space>
    );
    api.info({
      message: 'Info',
      description: <>
        <Paragraph>
          To view google map in safari browser, you need to configure following step.
        </Paragraph>
        <Paragraph>
          <Text strong>
            Safari-&gt;Preferences-Advanced-&gt;check "SHow Develop menu in menu bar". Now from the Develop menu select "Experiemental Features" and scroll down to "WebGL via Metal" and uncheck it.',
          </Text>
        </Paragraph>
      </>,
      btn,
      placement: 'bottomLeft',
      duration: null,
      onClose: close,
    });
  }

  const getCurrentLocation = async () => {
    if (browserName === "Edge") {
      initMap(37.553326, -94.8110983)
    }
    else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            initMap(latitude, longitude);
          },
          (error) => {
            console.log(error)
            console.error("Error retrieving geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

  };

  useEffect(() => {
    const flag = getCookie('notify');
    browserName === "Safari" && flag === true ? openNotification() : '';
    getActivepartnersAndTestimonials();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [activePartners]);

  async function getActivepartnersAndTestimonials() {
    await userService.getActivepartners()
      .then((res) => {
        setactivePartners(res)
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

    await userService.getTestimonials()
      .then((res) => {
        setTestimonial(res.data)
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });

    await userService.getNewpartners()
      .then((res) => {
        setNewpartner(res.data)
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }

  function initMap(latitude, longitude) {
    let map;
    map = new google.maps.Map(document.getElementById("maps"), {
      center: { lat: 37.553326, lng: -94.8110983 },
      zoom: 4,
      gestureHandling: "greedy"
    });

    // Create markers.
    for (let i = 0; i < activePartners?.length; i++) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(activePartners[i]?.address?.latitude, activePartners[i]?.address?.longitude),
        icon: {
          url: faviconUrl,
          scaledSize: new google.maps.Size(30, 50), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(15, 60), // anchor
        },
        map: map,
      });
    }
  }


  return (
    <>
      {contextHolder}
      <PageTitle page="HOME" />
      <div className="software-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="software-banner-content">
                <h1>
                  Finding YOUR
                  <br /> favorite <u>Business</u>
                  <br /> <u>on Wheels</u> has
                  <br /> never been <br />
                  easier!
                </h1>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="banner-background"></div>
              <div className="software-banner-image" data-aos="fade-up">
                <div>
                  <Image
                    className="main-banner"
                    src={isWebDevice ? bannerImgDesktop : bannerImgMobile}
                    alt="banner-image"
                  />
                </div>
                {isWebDevice ? <>
                  <div className="ping-img1">
                    <Image
                      src={christmas}
                      alt="banner-image"
                    />
                  </div>
                  <div className="ping-img2">
                    <Image
                      src={coffee}
                      alt="banner-image"
                    />
                  </div>
                  <div className="ping-img3">
                    <Image
                      src={food}
                      alt="banner-image"
                    />
                  </div>
                  <div className="ping-img4">
                    <Image
                      src={mobile}
                      alt="banner-image"
                    />
                  </div>
                </> : ""}

              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-12 banner-sub-description">
              <p className="banner-sub-description-p">
                <div className="desktop">
                  No more going down the Google black hole
                  <br /> when it comes to finding your favorite Food
                  <br /> Truck, Farmers Markets or other mobile
                  <br /> businesses.. Pinpoint will bring your favorites to
                  <br /> your front door!
                </div>
                <div className="mobile">
                  No more going down the Google black hole
                  when it comes to finding your favorite Food
                  Truck, Farmers Markets or other mobile
                  businesses.. Pinpoint will bring your favorites to
                  your front door!
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="overview-area ptb-100 bg-dark-gray">
        <div className="container">
          <div className="overview-box">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">Welcome to Pinpoint </p>
              </div>
              <div className="col-lg-6 col-md-12"></div>
              <div className="col-lg-4 col-md-12 overview-content">
                <h1>
                  <div className="desktop">
                    The
                    <br /> Pinpoint <br />
                    Promise
                  </div>
                  <div className="mobile">
                    The Pinpoint Promise
                  </div>

                </h1>
              </div>
              <div className="col-lg-8 col-md-12 overview-image">
                <p className="landing-sub-description">
                  In this world where food trucks are dominating the food
                  market, and most people are shifting their views on what food
                  they put in their body, there is still a lingering issue.
                  Where is my favorite food truck?! Pinpoint brings a simple
                  solution to this issue. All of our Pinpoint Partners will be
                  able to instantly display their current location, making it
                  easy for our Pinpoint Users to find them whenever a craving
                  arises! With our interactive map and ability for our Users and
                  Partners to communicate directly and publicly, Pinpoint is
                  merging Google and Social Media to change the game for good!
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
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">Pinpoints Partners</p>
              </div>
              <div className="col-lg-6 col-md-12"></div>
              <div className="col-lg-4 col-md-12 overview-content desktop">
                <h1>
                  Currently
                  <br /> Servicing
                </h1>
              </div>
              <div className="col-lg-4 col-md-12 overview-content mobile">
                <h1 style={{ width: '100%', textAlign: 'center' }}>
                  Currently Servicing
                </h1>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="container mtl-45">
                  <div className="section-landing-title">
                    <span className="sub-landing-title">Everyday Partners</span>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-4 col-md-6 col-sm-12">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={food} alt="icon" />
                        </div>
                        <h3>Food Trucks</h3>
                        <p className="desktop">
                          Hard time finding
                          <br /> your favorite food
                          <br /> trucks? Poof!
                        </p>
                        <p className="mobile">
                          Hard time finding
                          your favorite food
                          trucks? Poof!
                        </p>
                      </div>
                    </div>
                    <div
                      className="col-lg-4 col-md-6 col-sm-12">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={coffee} alt="icon" />
                        </div>
                        <h3>Coffee Carts</h3>
                        <p className="desktop">
                          Need your local
                          morning fix? Look no
                          further...
                        </p>
                        <p className="mobile">
                          Need your local
                          morning fix? Look no
                          further...
                        </p>
                      </div>
                    </div>

                    <div
                      className="col-lg-4 col-md-6 col-sm-12">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={mobile} alt="icon" />
                        </div>
                        <h3>Mobile Detailing</h3>
                        <p>Strive for the cleanest ride!</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="section-landing-title"
                    style={{
                      marginTop: 18,
                    }}
                  >
                    <span className="sub-landing-title">Seasonal Partners</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-12"></div>
              <div className="col-lg-11 col-md-12">
                <div className="container mtl-45">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={farmers} alt="icon" />
                        </div>
                        <h3>Farmers Market</h3>
                        <p>Everybody love them some fresh veggies!</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={christmas} alt="icon" />
                        </div>
                        <h3>Christmas Tree Lots</h3>
                        <p>Choppin down or Pickin Up? We have all options.</p>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={pumkin} alt="icon" />
                        </div>
                        <h3>Pumpkin Patch</h3>
                        <p>
                          Hay Rides, Family Photos, Pumpkin Carving. Find em’
                          here!
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={fireworks} alt="icon" />
                        </div>
                        <h3>Fireworks Stand</h3>
                        <p>Boom. Crackle. Pop. We’re the one stop shop!</p>
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
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">Pinpoint Locations </p>
              </div>
              <div className="col-lg-6 col-md-12"></div>
              <div className="col-lg-4 col-md-12 overview-content">
                <h1 className="wherespinpoint">
                  Where’s <br />
                  Pinpoint
                </h1>
                <div
                  className="icon"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Image
                    src={location}
                    width={150}
                    height={230}
                    alt="overview"
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-12 overview-image">
                <div id="maps"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonial testimonials={testimonials} />
      <Newpartners newpartners={newpartners} />
      <div className="overview-area ptb-100 bg-black">
        <div className="container">
          <div className="overview-box">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">Contact Pinpoint</p>
              </div>
              <div className="col-lg-6 col-md-12"></div>
              <div className="col-lg-4 col-md-12 overview-content landing-contact-subtitle">
                <h1 className="wherespinpoint desktop">
                  Whatcha <br />
                  Thinkin?
                </h1>
              </div>
              <div
                id="pinpoint_contactus"
                className="col-lg-8 col-md-12 overview-image"
              >
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
  return <Layout>{page}</Layout>;
};

export default UserHome;