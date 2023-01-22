import React from "react";
import Image from "next/image";
import farmers from "@/public/images/landing/farmers.png";
import active from "@/public/images/active.png";

const ProfileFavorites = () => {
  return (
    <div className="blog-details-area">
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-12">
            <div className="profile-location">
              <p className="title">Favorite Locations</p>
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="single-location-box">
                      <h3>Farmers Market</h3>

                      <div className="icon">
                        <Image src={farmers} alt="icon" />
                      </div>

                      <div className="profile-location-box-footer">
                        <div className="img-section">
                          <Image src={active} alt="icon" />
                        </div>
                        <div className="location-title">
                          <span>Jacksonville, FL</span>
                          <br />
                          <span>Last seen 5 hours ago</span>
                        </div>
                        <div className="location-star">
                          <span>
                            <i className="bx bxs-star"></i>4.7
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="single-location-box">
                      <h3>Farmers Market</h3>

                      <div className="icon">
                        <Image src={farmers} alt="icon" />
                      </div>

                      <div className="profile-location-box-footer">
                        <div className="img-section">
                          <Image src={active} alt="icon" />
                        </div>
                        <div className="location-title">
                          <span>Jacksonville, FL</span>
                          <br />
                          <span>Last seen 5 hours ago</span>
                        </div>
                        <div className="location-star">
                          <span>
                            <i className="bx bxs-star"></i>4.7
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="single-location-box">
                      <h3>Farmers Market</h3>

                      <div className="icon">
                        <Image src={farmers} alt="icon" />
                      </div>

                      <div className="profile-location-box-footer">
                        <div className="img-section">
                          <Image src={active} alt="icon" />
                        </div>
                        <div className="location-title">
                          <span>Jacksonville, FL</span>
                          <br />
                          <span>Last seen 5 hours ago</span>
                        </div>
                        <div className="location-star">
                          <span>
                            <i className="bx bxs-star"></i>4.7
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFavorites;
