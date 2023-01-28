import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocation from "@/components/Partner/Profile/PartnerLocation";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import Layout from "../../../../layout";
import { getLocationById } from "@/src/redux/Location/actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import useNotify from "@/hooks/useNotify";

const Location = ({ getLocationInfo }) => {
  const router = useRouter();
  const { notify } = useNotify();
  const [location, setLocation] = useState();
  useEffect(() => {
    if (router.isReady) {
      const locationId = router.query.location;
      getLocationInfo({ id: locationId }, (res, err) => {
        if (err) {
          notify(
            "error",
            err?.response?.data?.message || "Something went wrong"
          );
        } else {
          setLocation(res);
        }
      });
    }
  }, [router.isReady]);
  return (
    <>
      <PageTitle page="Locations" />

      <div className="page-pin-area">
        <Profileheader />
        <div className="pin-profile-section">
          <Submenu />
          <PartnerLocation location={location} />
        </div>
      </div>
    </>
  );
};

Location.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const mapDispatchToProp = (dispatch) => {
  return {
    getLocationInfo: (id, cb) => dispatch(getLocationById(id, cb)),
  };
};

export default connect(undefined, mapDispatchToProp)(Location);
