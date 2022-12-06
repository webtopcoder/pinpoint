import React from "react";
import Lightbox from "react-image-lightbox";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  nav: true,
  margin: 25,
  loop: false,
  dots: false,
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    "<i class='flaticon-left-arrow'></i>",
    "<i class='flaticon-right-arrow'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 2,
    },
    992: {
      items: 2,
    },
    1200: {
      items: 2,
    },
  },
};

const images = [
  "/images/gallery/gallery1.jpg",
  "/images/gallery/gallery2.jpg",
  "/images/gallery/gallery3.jpg",
];

import Image from "next/image";

import galleryImg1 from "@/public/images/gallery/gallery1.jpg";
import galleryImg2 from "@/public/images/gallery/gallery2.jpg";
import galleryImg3 from "@/public/images/gallery/gallery3.jpg";

const Gallery = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);

  //
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const [isOpenImage, setIsOpenImage] = React.useState(false);

  return (
    <div className="gallery-area pt-100 pb-75 bg-f9f9f9">
      <div className="container">
        <div
          className="section-title text-start"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <span className="sub-title green-color">Photo Gallery</span>
          <h2 className="nunito-font">
            Quality living from the team that cares
          </h2>
        </div>

        {/* Lightbox */}
        {isOpenImage && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpenImage(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}

        {display ? (
          <OwlCarousel
            className="gallery-slides owl-carousel owl-theme"
            {...options}
          >
            <div className="single-gallery-item">
              <div
                className="d-block popup-image"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenImage(true);
                  setPhotoIndex(0);
                }}
              >
                <Image src={galleryImg1} alt="gallery-image" />
              </div>
            </div>
            <div className="single-gallery-item">
              <div
                className="d-block popup-image"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenImage(true);
                  setPhotoIndex(1);
                }}
              >
                <Image src={galleryImg2} alt="gallery-image" />
              </div>
            </div>
            <div className="single-gallery-item">
              <div
                className="d-block popup-image"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenImage(true);
                  setPhotoIndex(2);
                }}
              >
                <Image src={galleryImg3} alt="gallery-image" />
              </div>
            </div>
          </OwlCarousel>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Gallery;
