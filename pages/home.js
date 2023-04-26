
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LandingContact from "@/components/Landing/LandingContact";
import Testimonial from "@/components/Landing/Testimonial";
import PageTitle from "@/components/Layout/PageTitle";
import christmas from "@/public/images/landing/christmas.png";
import coffee from "@/public/images/landing/coffee.png";
import farmers from "@/public/images/landing/farmers.png";
import fireworks from "@/public/images/landing/fireworks.png";
import food from "@/public/images/landing/food.png";
import location from "@/public/images/landing/location.png";
import bannerImg from "@/public/images/landing/map-4-points.png";
import mobile from "@/public/images/landing/mobile.png";
import pumkin from "@/public/images/landing/pumkin.png";
import Image from "next/image";
import { getActivepartners, getTestimonials } from "@/redux/User/actions";
import { apiBaseUrl } from "@/utils/baseUrl";
import Layout from "../layout";

const UserHome = ({ ongetActivepartners, activePartners, ongetTestimonials }) => {
  const faviconUrl = `${apiBaseUrl}/location.png`;
  const [testimonials, setTestimonial] = useState();

  function initMap() {
    window.navigator.geolocation.getCurrentPosition(success, (error) => {
      console.log(error);
    });
  }

  function success(pos) {
    let map;
    map = new google.maps.Map(document.getElementById("maps"), {
      center: { lat: 37.553326, lng: -94.8110983 },
      zoom: 4,
    });

    // Create markers.
    for (let i = 0; i < activePartners.length; i++) {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(activePartners[i]?.address?.latitude, activePartners[i]?.address?.longitude),
        icon: {
          url: faviconUrl,
          scaledSize: new google.maps.Size(30, 50), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0), // anchor
        },
        map: map,
      });
    }
  }
  useEffect(() => {
    ongetActivepartners();
    ongetTestimonials((res, error) => {
      if (error) {
        notify("error", error.response.data.message);
        return;
      }

      setTestimonial(res.data);
    });
  }, []);

  useEffect(() => {
    initMap();
  }, [activePartners]);
  return (
    <>
      <PageTitle page="Home" />
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
                    src={bannerImg}
                    alt="banner-image"
                  />
                </div>
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
                    The pinpoint Promise
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
              <div className="col-lg-8 col-md-12">
                <div className="container mtl-45">
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
                    <div className="col-lg-3 col-md-6 col-sm-6">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={farmers} alt="icon" />
                        </div>
                        <h3>Farmers Market</h3>
                        <p>Everybody love them some fresh veggies!</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                      <div className="single-help-desk-box">
                        <div className="icon">
                          <Image src={christmas} alt="icon" />
                        </div>
                        <h3>Christmas Tree Lots</h3>
                        <p>Choppin down or Pickin Up? We have all options.</p>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
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
                    <div className="col-lg-3 col-md-6 col-sm-6">
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
      <div className="overview-area ptb-100 bg-black">
        <div className="container">
          <div className="overview-box">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-12">
                <p className="landing-sub-title">Contact Pinpoint</p>
              </div>
              <div className="col-lg-6 col-md-12"></div>
              <div className="col-lg-4 col-md-12 overview-content landing-contact-subtitle">
                <h1
                  style={{
                    textAlign: "right",
                    paddingRight: 28,
                    paddingTop: 46,
                  }}
                >
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

const mapStateToProps = ({ user }) => ({
  activePartners: user.activePartners
});

const mapDispatchToProps = (dispatch) => ({
  ongetActivepartners: () =>
    dispatch(getActivepartners()),
  ongetTestimonials: (cb) => dispatch(getTestimonials(cb)),

});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);