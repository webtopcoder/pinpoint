
import React from "react";
import Whypartner from "@/components/Partner/Education/Whypinpoint";
import Howtouse from "@/components/Partner/Education/Howtouse";
import Partners from "@/components/Partner/Education/Partners";
import Feature from "@/components/Partner/Education/Feature";
import PageTitle from "@/components/Layout/PageTitle";
import Layout from "../../layout";

const Education = () => {
  return (
    <>
      <PageTitle page="EDUCATION" />
      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title">Pinpoint Partner</span>
            <h1>BENEFITS</h1>
          </div>
        </div>
      </div>
      <Whypartner />
      <Feature />
      <Howtouse />
      <Partners />
    </>
  );
};

Education.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Education;