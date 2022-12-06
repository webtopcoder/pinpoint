import { React, useState } from "react";
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "../LoginForm.module.css";
import { useLoginFormValidator } from "./hooks/partner-Login-validator";


const partnerLogin = () => {

	const [form, setForm] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	});

	const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

	const onUpdateField = e => {

		const field = e.target.name;
		const nextFormState = {
			...form,
			[field]: e.target.value,
		};
		setForm(nextFormState);
		if (errors[field].dirty)
			validateForm({
				form: nextFormState,
				errors,
				field,
			});
	};

	const onSubmitForm = e => {
		e.preventDefault();
		const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
		if (!isValid) return;
		alert(JSON.stringify(form, null, 2));
	};

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
				<form onSubmit={onSubmitForm}>
					<div className="auth-space"></div>
					<div className="form-group">
						<label className="authen-text-attr">Username or email *</label>
						<input
							type="text"
							name="email"
							className="form-control"
							value={form.username}
							onChange={onUpdateField}
							placeholder="Username or email"
							onBlur={onBlurField}
						/>
						{errors.email.dirty && errors.email.error ? (
							<p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
						) : null}
					</div>
					<div className="form-group">
						<label className="authen-text-attr">Password *</label>
						<input
							type="password"
							name="password"
							className="form-control"
							value={form.password}
							onChange={onUpdateField}
							placeholder="Password"
							onBlur={onBlurField}
						/>
						{errors.password.dirty && errors.password.error ? (
							<p className={styles.formFieldErrorMessage}>
								{errors.password.message}
							</p>
						) : null}
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
							<Link href="/authentication/lost-password">
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
							No Account Yet? Signup <Link href="/authentication/partner/register"><a>HERE</a></Link> for free!
						</p>
					</div>
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

export default partnerLogin;
