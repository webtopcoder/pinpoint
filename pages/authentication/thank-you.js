import React from "react";
import Link from "next/link";
import Image from "next/image";

import thankYouImg from "@/public/images/thank-you.png";

const ThankYou = () => {
  return (
    <div className="thank-you-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="thank-you-content">
              <Image 
                src={thankYouImg} 
                alt="thank-you" 
              />
              <h3>THANK YOU FOR JOING PINPOINT!</h3>
              <p>PLEASE VERIFY YOUR ACCOUNT TO GAIN ACCESS...WE JUST SENT YOU A LINK TO THE EMAIL GIVEN!</p>

              <Link href="/authentication/user/login">
                <a className="btn-style-one red-light-color">
                  Back to Login <i className="bx bx-chevron-right"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
