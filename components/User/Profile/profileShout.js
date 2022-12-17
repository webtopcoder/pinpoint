import React from "react";
import Image from "next/image";
import { UploadOutlined } from '@ant-design/icons';
import { Image as Antimage, Button, Upload } from 'antd';
import food from "@/public/images/landing/food.png";
import userImg1 from "@/public/images/user/user1.jpg";

const profileShout = () => {
    return (
        <div className="blog-details-area">
            <div className="container">
                <br />
                <div className="row justify-content-center">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="shout-area green-color">
                            <div className="shout-body">
                                <div className="shout-author vcard">
                                    <div className="avatar">
                                        <Image
                                            src={userImg1}
                                            alt="user"
                                            className="shout-radius"
                                        />
                                    </div>
                                    <b className="fn">Dennis Stephens</b>
                                    <div className="shout-target">
                                        <span>
                                            dennis0303stephens@gmail.com
                                        </span>
                                    </div>
                                </div>
                                <div className="shout-metadata">
                                    <span>
                                        dennis0303stephens@gmail.com
                                    </span>
                                </div>

                                <div className="shout-content">
                                    <div className="pin-post-label">
                                        <p className="comment-notes">
                                            <span id="email-notes">
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut
                                                enim ad minim veniam
                                            </span>
                                        </p>
                                    </div>
                                    <div className="pin-post-logo">
                                        <p className="comment-notes">
                                            <i className="bx bx-like like-icon"></i> &nbsp;150 Likes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shout-area green-color">
                            <div className="shout-body">
                                <div className="shout-author vcard">
                                    <div className="avatar">
                                        <Image
                                            src={userImg1}
                                            alt="user"
                                            className="shout-radius"
                                        />
                                    </div>
                                    <b className="fn">Dennis Stephens</b>
                                    <div className="shout-target">
                                        <span>
                                            dennis0303stephens@gmail.com
                                        </span>
                                    </div>
                                </div>
                                <div className="shout-metadata">
                                    <span>
                                        dennis0303stephens@gmail.com
                                    </span>
                                </div>

                                <div className="shout-content">
                                    <div className="pin-post-label">
                                        <p className="comment-notes">
                                            <span id="email-notes">
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut
                                                enim ad minim veniam
                                            </span>
                                        </p>
                                    </div>
                                    <div className="pin-post-logo">
                                        <p className="comment-notes">
                                            <i className="bx bx-like like-icon"></i> &nbsp;150 Likes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shout-area green-color">
                            <div className="shout-body">
                                <div className="shout-author vcard">
                                    <div className="avatar">
                                        <Image
                                            src={userImg1}
                                            alt="user"
                                            className="shout-radius"
                                        />
                                    </div>
                                    <b className="fn">Dennis Stephens</b>
                                    <div className="shout-target">
                                        <span>
                                            dennis0303stephens@gmail.com
                                        </span>
                                    </div>
                                </div>
                                <div className="shout-metadata">
                                    <span>
                                        dennis0303stephens@gmail.com
                                    </span>
                                </div>

                                <div className="shout-content">
                                    <div className="pin-post-label">
                                        <p className="comment-notes">
                                            <span id="email-notes">
                                                Lorem ipsum dolor sit amet, consectetur
                                                adipisicing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua. Ut
                                                enim ad minim veniam
                                            </span>
                                        </p>
                                    </div>
                                    <div className="pin-post-logo">
                                        <p className="comment-notes">
                                            <i className="bx bx-like like-icon"></i> &nbsp;150 Likes
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default profileShout;
