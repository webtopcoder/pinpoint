import React from "react";
import Image from "next/image";
import { UploadOutlined } from '@ant-design/icons';
import { Image as Antimage, Button, Upload } from 'antd';
import food from "@/public/images/landing/food.png";

const profileActivity = () => {
    return (
        <div className="blog-details-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-7 col-md-12">
                        <div className="avatar-area green-color">
                            <div className="avatar-respond">
                                <div className="pin-post-header-section">
                                    <div className="pin-post-label">
                                        <p className="comment-notes">
                                            <span id="email-notes">
                                                Let us know what you think!
                                            </span>
                                        </p>
                                    </div>
                                    <div className="pin-post-logo">
                                        <Image
                                            src={food}
                                            alt="blog-details"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                                <form className="avatar-form">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <textarea
                                                    className="form-control"
                                                    cols="30"
                                                    rows="5"
                                                    placeholder="what's new?"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="pin-post-footer-section">
                                                <div className="pin-post-label">
                                                    <Upload
                                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                        listType="picture"
                                                    >
                                                        <Button icon={<UploadOutlined />}>Photo</Button>
                                                    </Upload>
                                                </div>
                                                <div className="pin-post-logo">
                                                    <button
                                                        type="submit"
                                                        className="submit-btn"
                                                    >
                                                        Post
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-12">
                        <div className="left-sidebar">
                            <aside className="widget-area">
                                <div className="avatar-area green-color">
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        About Me
                                                    </span>
                                                </h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur
                                                    adipisicing elit, sed do eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. Ut
                                                    enim ad minim veniam
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        Photos
                                                    </span>
                                                </h4>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <Antimage
                                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        Social Links
                                                    </span>
                                                </h4>
                                                <ul className="social-links">
                                                    <li>
                                                        <a
                                                            href="https://www.facebook.com/"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="flaticon-facebook-app-symbol"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://www.twitter.com/"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="flaticon-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://www.linkedin.com/"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="flaticon-snapchat"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://www.instagram.com/"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="flaticon-instagram"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://www.instagram.com/"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="flaticon-tik-tok"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="https://www.instagram.com/"
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <i className="flaticon-tik-tok"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default profileActivity;
