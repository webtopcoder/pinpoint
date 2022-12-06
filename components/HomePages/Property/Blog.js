import React from "react";
import Link from "next/link";
import Image from "next/image";

import blogImg5 from "@/public/images/blog/blog5.jpg";
import blogImg6 from "@/public/images/blog/blog6.jpg";
import blogImg7 from "@/public/images/blog/blog7.jpg";

const Blog = () => {
  return (
    <div className="blog-area pb-75 pt-100">
      <div className="container">
        <div className="section-title">
          <span className="sub-title green-color">Latest News</span>
          <h2 className="nunito-font">
            Our latest articles & <br />
            resources
          </h2>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-xl-4 col-lg-6 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div className="single-blog-post-item">
              <div className="image">
                <Link href="/blogs/blog-details-3">
                  <a className="d-block">
                    <Image src={blogImg5} alt="blog-image" />
                  </a>
                </Link>
              </div>
              <div className="content">
                <ul className="meta">
                  <li>
                    <i className="bx bx-purchase-tag-alt"></i>
                    <Link href="/blogs/blog-tag">
                      <a>Design</a>
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-calendar-check"></i>
                    24 Nov, 2021
                  </li>
                </ul>
                <h3 className="nunito-font">
                  <Link href="/blogs/blog-details-3">
                    <a>How sellers win when housing inventory is low</a>
                  </Link>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  est non feugiat sagittis.
                </p>
                <Link href="/blogs/blog-details-3">
                  <a className="link-btn">
                    Read More <i className="bx bx-chevron-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="col-xl-4 col-lg-6 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="single-blog-post-item">
              <div className="image">
                <Link href="/blogs/blog-details-3">
                  <a className="d-block">
                    <Image src={blogImg6} alt="blog-image" />
                  </a>
                </Link>
              </div>
              <div className="content">
                <ul className="meta">
                  <li>
                    <i className="bx bx-purchase-tag-alt"></i>
                    <Link href="/blogs/blog-tag">
                      <a>Technology</a>
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-calendar-check"></i>
                    25 Nov, 2021
                  </li>
                </ul>
                <h3 className="nunito-font">
                  <Link href="/blogs/blog-details-3">
                    <a>Why a wave of foreclosures is not on the way</a>
                  </Link>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  est non feugiat sagittis.
                </p>
                <Link href="/blogs/blog-details-3">
                  <a className="link-btn">
                    Read More <i className="bx bx-chevron-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="col-xl-4 col-lg-6 col-md-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="single-blog-post-item">
              <div className="image">
                <Link href="/blogs/blog-details-3">
                  <a className="d-block">
                    <Image src={blogImg7} alt="blog-image" />
                  </a>
                </Link>
              </div>
              <div className="content">
                <ul className="meta">
                  <li>
                    <i className="bx bx-purchase-tag-alt"></i>
                    <Link href="/blogs/blog-tag">
                      <a>Startup</a>
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-calendar-check"></i>
                    23 Nov, 2021
                  </li>
                </ul>
                <h3 className="nunito-font">
                  <Link href="/blogs/blog-details-3">
                    <a>Why now is a great time to sell your house</a>
                  </Link>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  est non feugiat sagittis.
                </p>
                <Link href="/blogs/blog-details-3">
                  <a className="link-btn">
                    Read More <i className="bx bx-chevron-right"></i>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
