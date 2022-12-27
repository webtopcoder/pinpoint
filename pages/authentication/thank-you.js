import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import thankYouImg from "@/public/images/thank-you.png";

const ThankYou = () => {
  let thankyou_id = '';
  let backLogin = ''

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    thankyou_id = localStorage.getItem('thankyou_id');
    backLogin = thankyou_id.toLowerCase();
  }

  return (
    <>
      <div className="thank-you-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="thank-you-content">
                <Image
                  src={thankYouImg}
                  alt="thank-you"
                />
                <h3>THANK YOU FOR JOINING PINPOINT!</h3>
                <p>PLEASE VERIFY YOUR ACCOUNT TO GAIN ACCESS...WE JUST SENT YOU A LINK TO THE EMAIL GIVEN!</p>

                <Link href={`/authentication/${backLogin}/login`}>
                  <a className="btn-style-one red-light-color">
                    Back to {thankyou_id} Login <i className="bx bx-chevron-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default ThankYou;
