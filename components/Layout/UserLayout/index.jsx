import React from "react";
import { useRouter } from "next/router";
import Footer from "./Footer";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header/index"), {
  ssr: false,
});

const UserLayout = ({ children, whiteMenu }) => {
  const router = useRouter();

  return (
    <>
      <Header whiteMenu={whiteMenu} />
      {children}
      {router.route !== "/interactivemap" ?
        <Footer /> : ''
      }
    </>
  );
};

export default UserLayout;