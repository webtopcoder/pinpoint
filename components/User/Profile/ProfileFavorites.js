import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";
import { getFavouriteLocations } from "@/src/redux/Location/actions";
import { Col, Row } from "antd";
import LocationCard from "@/components/LocationCard";

const ProfileFavorites = ({ ongetFavoriteLocations, favoriteLocations }) => {
  const router = useRouter();
  const { profile } = router.query;

  const { notify } = useNotify();
  useEffect(() => {
    if (router.isReady) {
      ongetFavoriteLocations(profile, (_, error) => {
        if (error) {
          notify(
            "error",
            error?.response?.data?.message ?? "Something went wrong"
          );
        }
      });
    }
  }, [router.isReady]);

  return (
    <div className="blog-details-area">
      <div className="container">
        <br />

        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-12">
            <div className="profile-location">
              <p className="title">Favorite Locations</p>
              <div className="container">
                <Row justify="space-around">
                  {favoriteLocations.map((location, index) => (
                    <Col span={6} key={index}>
                      <LocationCard location={location} />
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ location }) => {
  return {
    favoriteLocations: location.favoriteLocations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetFavoriteLocations: (payload, cb) =>
      dispatch(getFavouriteLocations(payload, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
