import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const ModalVideo = dynamic(() => import("react-modal-video"), {
  ssr: false,
});

import coursesImg1 from "@/public/images/courses/courses1.jpg";

const DetailsTop = () => {
  // Popup Video
  const [isOpen, setIsOpen] = React.useState(true);
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="courses-details-area ptb-100 bg-f9f9f9">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="courses-details-header">
                <div className="rating">
                  <i className="ph-star checked"></i>
                  <i className="ph-star checked"></i>
                  <i className="ph-star checked"></i>
                  <i className="ph-star checked"></i>
                  <i className="bx bxs-star"></i>
                  <div className="rating-count">
                    <span>4.0 (2 rating)</span>
                  </div>
                </div>
                <h2>Make a 2D Platformer with State Machines in Unity</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="courses-meta d-flex align-items-center">
                  <ul>
                    <li>
                      <i className="bx bx-folder-open"></i>
                      <span>Category</span>
                      <Link href="/courses">
                        <a>Node.js</a>
                      </Link>
                    </li>
                  </ul>

                  <Link href="/authentication">
                    <a className="btn-style-one yellow-color">
                      Enroll Now <i className="bx bx-chevron-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div className="courses-details-image">
                <Image src={coursesImg1} alt="image" />
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    openModal();
                  }}
                  className="popup-video"
                >
                  <i className="bx bx-play"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* If you want to change the video need to update videoID */}
      <ModalVideo
        channel="youtube"
        isOpen={!isOpen}
        videoId="bk7McNUjWgw"
        onClose={() => setIsOpen(!isOpen)}
      />
    </>
  );
};

export default DetailsTop;
