import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { Col, Row } from "antd";
import LocationCard from "@/components/Partner/Locations/LocationCard";
import { locationService } from "@/services/index";

const ProfileFavorites = () => {
  const router = useRouter();
  const { profile } = router.query;
  const [favoriteLocations, setfavoriteLocations] = useState();
  const { notify } = useNotify();

  useEffect(() => {
    if (router.isReady) {
      locationService.getFavoriteLocations(profile)
        .then((res) => {
          setfavoriteLocations(res)
        })
        .catch((error) => {
          notify(
            "error",
            error?.response?.data?.message || "Something went wrong"
          );
          return;
        });
    }
  }, [router.isReady]);

  return (
    <div className="blog-details-area">
      <br />
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-12">
          <div className="profile-location">
            <p className="title">Favorite Locations</p>
            <Row justify="space-around" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
              {favoriteLocations?.map((location, index) => (
                <Col xs={24} sm={12} md={12} lg={12} xl={8} key={index}>
                  <LocationCard location={location} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ProfileFavorites;
