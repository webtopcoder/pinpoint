
import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from 'cookies-next';
import LandingContact from "@/components/Landing/LandingContact";
import PartnerLocations from "@/components/Landing/PartnerLocations";
// import Testimonial from "@/components/Landing/Testimonial";
import Banner from "@/components/Landing/Banner";
import Howtouse from "@/components/Landing/Howtouse";
import Aboutus from "@/components/Landing/Aboutus";
import Feature from "@/components/Landing/Feature";
import Contactus from "@/components/Landing/Contactus";
import Testimonial from "@/components/Landing/TestimonialThree";
import Newpartners from "@/components/Landing/Newpartners";
import PageTitle from "@/components/Layout/PageTitle";
import christmas from "@/public/images/landing/christmas.png";
import coffee from "@/public/images/landing/coffee.png";
import farmers from "@/public/images/landing/farmers.png";
import fireworks from "@/public/images/landing/fireworks.png";
import food from "@/public/images/landing/food.png";
import location from "@/public/images/landing/location.png";
import mobile from "@/public/images/landing/mobile.png";
import pumkin from "@/public/images/landing/pumkin.png";
import Image from "next/image";
import useNotify from "@/hooks/useNotify";
import Layout from "../layout";
import { Button, notification, Space, Typography } from 'antd';
import useMedia from "@/hooks/useMedia";
import { browserName } from 'react-device-detect';

const { Paragraph, Text } = Typography;

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const UserHome = () => {
  const isWebDevice = useMedia('(min-width:700px)');
  const [api, contextHolder] = notification.useNotification();
  const { notify } = useNotify();

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => {
          setCookie('notify', true); // - client side
          api.destroy()
        }}>
          Don't display agian
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          Cancel
        </Button>
      </Space>
    );
    api.info({
      message: 'Info',
      description: <>
        <Paragraph>
          To view google map in safari browser, you need to configure following step.
        </Paragraph>
        <Paragraph>
          <Text strong>
            Safari-&gt;Preferences-Advanced-&gt;check "SHow Develop menu in menu bar". Now from the Develop menu select "Experiemental Features" and scroll down to "WebGL via Metal" and uncheck it.',
          </Text>
        </Paragraph>
      </>,
      btn,
      placement: 'bottomLeft',
      duration: null,
      onClose: close,
    });
  }

  useEffect(() => {
    const flag = getCookie('notify');
    browserName === "Safari" && flag === true ? openNotification() : '';
  }, []);

  return (
    <>
      {contextHolder}
      <PageTitle page="HOME" />
      <Banner />
      <Aboutus />
      <Howtouse />
      <Feature />
      <Testimonial />
      <Contactus />
    </>
  );
};

UserHome.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UserHome;