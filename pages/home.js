import React, { useEffect } from "react";
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
  function initMap() {
    window.navigator.geolocation.getCurrentPosition(success, (error) => {
      console.log(error)
    });
  }

  function success(pos) {
    let map;
    map = new google.maps.Map(document.getElementById("maps"), {
      center: { lat: 37.553326, lng: -94.8110983 },
      zoom: 4
    });
    const features = [
      {
        position: new google.maps.LatLng(36, -80),
        content: '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>"
      },
      {
        position: new google.maps.LatLng(39, -87),
        content: '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>"
      },
      {
        position: new google.maps.LatLng(43, -90),
        content: '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>"
      },
      {
        position: new google.maps.LatLng(35, -86),
        content: '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>"
      },
      {
        position: new google.maps.LatLng(35, -110),
        content: '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>"
      },
      {
        position: new google.maps.LatLng(47, -110),
        content: '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>"
      },
      {
        position: new google.maps.LatLng(45, -100),
        content: '<div id="content">' +
          '<div id="siteNotice">' +
          "</div>" +
          '<h1 id="firstHeading" class="firstHeading">Food Truck</h1>' +
          '<div id="bodyContent">' +
          "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
          "sandstone rock formation in the southern part of the " +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
          "(last visited June 22, 2009).</p>" +
          "</div>" +
          "</div>"
      },
    ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
      const marker = new google.maps.Marker({
        position: features[i].position,
        icon: {
          url: 'http://127.0.0.1:8080/favicon.png',
          scaledSize: new google.maps.Size(30, 50), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        },
        map: map,
      });
      const infowindow = new google.maps.InfoWindow({
        content: features[i].content,
        ariaLabel: "Food Truck",
      });
      marker.addListener("mouseover", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
      marker.addListener("mouseout", () => {
        infowindow.close();
      });
    }

  };
  useEffect(() => {
    initMap();
    // let map;

    // map = new google.maps.Map(document.getElementById("map"), {
    //   center: new google.maps.LatLng(-33.91722, 151.23064),
    //   zoom: 16,
    // });


  }, [])
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
