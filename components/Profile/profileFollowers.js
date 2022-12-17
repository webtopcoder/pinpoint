import React from "react";
import Image from "next/image";
import userImg1 from "@/public/images/user/user1.jpg";

const profileFollowers = () => {
    return (
        <div className="blog-details-area">
            <div className="container">
                <br />
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8 col-md-12"></div>
                    <div className="col-xl-4 col-lg-4 col-md-12">
                        <div className="widget-area">
                            <div className="widget widget_search">
                                <form className="search-form">
                                    <input
                                        type="search"
                                        className="search-field"
                                        placeholder="Search User"
                                    />
                                    <button type="submit">
                                        <i className="bx bx-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="shout-area followers green-color">
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

                                </div>
                                <div className="shout-metadata">
                                    <span>
                                        dennis0303stephens@gmail.com
                                    </span>
                                </div>
                            </div>
                            <div className="shout-button-group">
                                <button type="submit" className="btn-style-one blue-light-color">
                                    Accept &nbsp;<i className="bx bx-user-check"></i>
                                </button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" className="btn-style-one black-light-color">
                                    Reject &nbsp;<i className="bx bx-user-x"></i>
                                </button>
                            </div>
                        </div>
                        <div className="shout-area followers green-color">
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

                                </div>
                                <div className="shout-metadata">
                                    <span>
                                        dennis0303stephens@gmail.com
                                    </span>
                                </div>
                            </div>
                            <div className="shout-button-group">
                                <button type="submit" className="btn-style-one blue-light-color">
                                    View Profile &nbsp;<i className="bx bx-user"></i>
                                </button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" className="btn-style-one blue-light-color">
                                    Message &nbsp;<i className="bx bx-message-rounded-dots"></i>
                                </button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" className="btn-style-one black-light-color">
                                    Unfriend &nbsp;<i className="bx bx-user-x"></i>
                                </button>
                            </div>
                        </div>
                        <div className="shout-area followers green-color">
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

                                </div>
                                <div className="shout-metadata">
                                    <span>
                                        dennis0303stephens@gmail.com
                                    </span>
                                </div>
                            </div>
                            <div className="shout-button-group">
                                <button type="submit" className="btn-style-one blue-light-color">
                                    View Profile &nbsp;<i className="bx bx-user"></i>
                                </button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" className="btn-style-one blue-light-color">
                                    Message &nbsp;<i className="bx bx-message-rounded-dots"></i>
                                </button>&nbsp;&nbsp;&nbsp;
                                <button type="submit" className="btn-style-one black-light-color">
                                    Unfriend &nbsp;<i className="bx bx-user-x"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default profileFollowers;
