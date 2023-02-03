import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import RightSidebar from "./RightSidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

const UserLayout = ({ children }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const onToggle = () => {
    setVisible(!visible);
  };

  const hideRightbar = (event) => {
    var rightbar = document.getElementById("right-sidebar");
    //if clicked in inside right bar, then do nothing
    if (rightbar && rightbar.contains(event.target)) {
      return;
    } else {
      //if clicked in outside of rightbar then fire action for hide rightbar
      setVisible(false);
    }
  };
  useEffect(() => {
    setVisible(false);
    // document
    //   .getElementById("__next")
    //   .addEventListener("click", hideRightbar, true);
  }, [router.pathname]);

  useEffect(() => {}, []);
  return (
    <>
      <Header toggle={onToggle} />
      <RightSidebar visible={visible} />
      {children}
      <Footer />
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  auth: user.token,
});
export default connect(mapStateToProps, null)(UserLayout);
