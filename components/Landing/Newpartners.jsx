import { Carousel } from "react-responsive-carousel";
import { apiBaseUrl } from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import { userService } from "@/services/index";

const Newpartners = () => {
  const imgurl = `${apiBaseUrl}/avatar/`;
  const [newpartners, setNewpartner] = useState();

  useEffect(async () => {
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
  }, []);

  return (
    <div className="testimonials-area bg-black ptb-100">
      <div className="container">
        <div className="section-title white-color">
          <span className="sub-title">NEW ON PINPOINT</span>
          <h2 style={{
            wordBreak: 'break-word'
          }}>Shout Out to Our New Partners</h2>
        </div>
        <div className="testimonials-slides">
          <Carousel
            showArrows={false}
            showIndicators={false}
            autoPlay={false}
            infiniteLoop={false}
            emulateTouch={true}
            showThumbs={true}
          >
            {newpartners?.map((item, index) => (
              <div className="single-testimonials-item">
                <p>
                  {item?.content}
                </p>
                <div className="client-info d-flex align-items-center justify-content-center">
                  <img src={imgurl + "/" + item?.image?.filepath}
                    alt="user" />
                  <div className="info">
                    <h3>{item?.username + " from " + item?.state + ", " + item?.city} </h3>
                    <span>{item?.category.name}</span>
                  </div>
                </div>
              </div>
            ))}

          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Newpartners;
