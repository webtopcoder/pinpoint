import React from "react";
import Image from "next/image";
import userImg1 from "@/public/images/user/user1.jpg";

const Header = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="avatar-area green-color">
                        <div className="avatar-body">
                            <div className="avatar-author vcard">
                                <div className="avatar">
                                    <Image
                                        src={userImg1}
                                        alt="user"
                                        className="avatar-radius"
                                    />
                                </div>
                                <b className="fn">Dennis Stephens</b>
                            </div>
                            <div className="avatar-metadata">
                                <span>
                                    dennis0303stephens@gmail.com
                                </span>
                            </div>
                            <div className="avatar-content">
                                <button type="submit" className="btn-style-one avatar-message-button">
                                    Message<i className="bx bx-envelope avatar-icon"></i>
                                </button>
                            </div>
                            <div className="avatar-content mg-12">
                                <button type="submit" className="btn-style-one avatar-message-button">
                                    Follow<i className="bx bx-user-plus avatar-icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-center">
                        <div className="col-md-4"></div>
                        <div className="col-md-3">
                            <div
                                data-aos-duration="1200"
                            >
                                <div className="avatar-rightside-box">
                                    <h4>Favorites</h4>
                                    <h1>
                                        3
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                data-aos-duration="1200"
                            >
                                <div className="avatar-rightside-box">
                                    <h4>Followers</h4>
                                    <h1>
                                        132
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;
