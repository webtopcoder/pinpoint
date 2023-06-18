import React, { useEffect, useState } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from '../../layout';
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import PartnerLocations from "@/components/Partner/Locations";
import { Layout } from 'antd';

const Edit = () => {
  return (
    <>
      <div>
       
      </div>
    </>
  )
}

Edit.getLayout = function getLayout(page) {
  return <BasicLayout>{page}</BasicLayout>
}

export default Edit;