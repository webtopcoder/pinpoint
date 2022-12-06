import React from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  margin: 25,
  nav: false,
  loop: false,
  dots: true,
  autoplay: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  autoplayHoverPause: true,
  navText: ["<i class='ph-caret-left'></i>", "<i class='ph-caret-right'></i>"],
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 1,
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

const TestimonialFive = () => {
  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    setDisplay(true);
  }, []);
  return (
    <div className="testimonials-area with-top-border o-hidden ptb-100">
      <div className="container">
        <div
          className="section-title"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <h2 className="nunito-font">
            Here&apos;s what our amazing clients are saying
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur
            mauris amet, placerat fames orci elementum adipiscing.
          </p>
        </div>
        {display ? (
          <OwlCarousel
            className="testimonials-slides-three owl-carousel owl-theme"
            {...options}
          >
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“I never really lost it to begin with.”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>Lora Joly</h3>
                <span>Founder at Envato</span>
              </div>
            </div>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Every moment is a fresh beginning.”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>David Warner</h3>
                <span>Founder at ThemeForest</span>
              </div>
            </div>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Whatever you do, do it well. From now!”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>James Anderson</h3>
                <span>Founder at EnvyTheme</span>
              </div>
            </div>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Whatever you do, do it well. From now!”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>James MM</h3>
                <span>Founder at HB</span>
              </div>
            </div>
            <div className="single-testimonials-box">
              <i className="flaticon-left-quote"></i>
              <h5>“Whatever you do, do it well. From now!”</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna
                facilisi viverra felis eleifend ornare urna. Eu mauris, velit
                volutpat massa volutpat. Risus pellentesque felis nisl ut
                laoreet euismod vel, integer. Massa sodales lorem nisi, sed
                massa volutpat.
              </p>
              <div className="info">
                <h3>Jisan HR</h3>
                <span>Founder at HIBO</span>
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

export default TestimonialFive;
