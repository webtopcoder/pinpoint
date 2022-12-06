import React from "react";
import Link from 'next/link';
import logo from "@/public/images/Full Logo 1.png";
import Image from "next/image";

const Login = () => {
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
					<div className="form-group">
						<label className="authen-text-attr">Username or email</label>
						<input
							type="text"
							className="form-control"
							placeholder="Username or email"
						/>
					</div>
					<div className="form-group">
						<label className="authen-text-attr">Password</label>
						<input
							type="password"
							className="form-control"
							placeholder="Password"
						/>
					</div>
					<div className="row align-items-center">
						<div className="col-lg-6 col-md-6 remember-me-wrap">
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									id="remember-me"
								/>
								<label
									className="form-check-label"
									htmlFor="remember-me"
								>
									Remember me
								</label>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 lost-your-password-wrap">
							<Link href="/lost-password">
								<a
									className="lost-your-password"
								>
									OOPS! I forgot my password
								</a>
							</Link>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4"></div>
						<div className="col-lg-4">
							<button type="submit">Log In</button>
						</div>
						<div className="col-lg-4"></div>

					</div>
					<div className="row auth-divider"></div>
					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-8 col-md-4 col-sm-12">
							<div className="col-lg-12">
								<button className="auth-social-btn" type="submit">
									<span className="auth-social-text">Login with Facebook</span>
									<img className="auth-social-img" src="https://img.icons8.com/color/40/000000/facebook-logo.png" />						</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-8 col-md-4 col-sm-12">
							<div className="col-lg-12">
								<button className="auth-social-btn" type="submit">
									<span className="auth-social-text">Login with Facebook</span>
									<img className="auth-social-img" src="https://img.icons8.com/color/40/000000/google-logo.png" />						</button>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-8 col-md-4 col-sm-12">
							<div className="col-lg-12">
								<button className="auth-social-btn" type="submit">
									<span className="auth-social-text">Login with Twitter</span>
									<img className="auth-social-img" src="https://img.icons8.com/color/40/000000/twitter-logo.png" />						</button>
							</div>
						</div>
					</div>
					<div className="col-12">
						<p className="account-desc">
							No Account Yet? Signup <Link href="/sign-up"><a>HERE</a></Link> for free!
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
