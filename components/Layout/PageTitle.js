import React from "react";
import Head from "next/head";

const PageTitle = ({ page }) => {
  return (
    <Head>
      <title>{page} | PINPOINT</title>
    </Head> 
  );
};

export default PageTitle;
