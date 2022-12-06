import { React, useState } from "react";
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";


const userLogin = () => {


    return (
        <div className="col-lg-6 col-md-12">
            <div className="login-form">
                <div className="logo-center">
                    <Link href="/">
                        <a className="navbar-brand">
                            <Image src={logo} alt="site logo" />
                        </a>
                    </Link>
                </div>
                <form>
                    <div className="auth-space"></div>
                    <p className="text-center">
                        Lost your password? Please enter your username or email address.
                        You will receive a link to create a new password via email.
                    </p>
                    <div className="form-group">
                        <label className="authen-text-attr">Username or email *</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Username or email"
                        />

                    </div>

                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <button type="submit">Reset Password</button>
                        </div>
                        <div className="col-lg-2"></div>

                    </div>
                    <div className="row auth-divider"></div>
                    <div className="col-12">
						<p className="account-desc">
							<Link href="/"><a>WHO AM I?</a></Link>
						</p>
					</div>
                </form>
            </div>
        </div>
    );
};

export default userLogin;
