import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header/index"), {
  ssr: false,
});

const RightSidebar = dynamic(() => import("./RightSidebar"), {
  ssr: false,
});

const UserLayout = ({ children, whiteMenu }) => {

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
    document
      .getElementById("__next")
      .addEventListener("click", hideRightbar, true);
  }, [router.pathname]);

  useEffect(() => { }, []);
  return (
    <>
      <Header whiteMenu={whiteMenu} toggle={onToggle} />
      <RightSidebar visible={visible} />
      {children}
      {router.route !== "/interactivemap" ?
        <Footer /> : ''
      }
    </>
  );
};

export default UserLayout;