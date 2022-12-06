import { React, useState } from "react";
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "../LoginForm.module.css";
import { useRegisterFormValidator } from "./hooks/partner-Register-validator";

const partnerRegister = () => {


	const [form, setForm] = useState({

		ownerfirstName: "",
		ownerlastName: "",
		legalName: "",
		address: "",
		city: "",
		state: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const [startDate, setStartDate] = useState(new Date());

	const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);

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
		alert(JSON.stringify(form, null, 2));

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
					<div className="row">
						<div className="auth-space"></div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Business Legal Name:</label>
								<input
									type="text"
									className="form-control"
									name="legalName"
									value={form.legalName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Business Legal Name:"
								/>
								{errors.legalName.dirty && errors.legalName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.legalName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">Owner First Name:</label>
								<input
									type="text"
									className="form-control"
									value={form.ownerfirstName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Owner First Name"
								/>
								{errors.ownerfirstName.dirty && errors.ownerfirstName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.ownerfirstName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">Owner Last Name:</label>
								<input
									type="text"
									className="form-control"
									value={form.ownerlastName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Owner Last Name:"
								/>
								{errors.ownerlastName.dirty && errors.ownerlastName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.ownerlastName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Business Physcial Address(Corporate):</label>
								<input
									type="text"
									className="form-control"
									value={form.address}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="address"
								/>
								{errors.address.dirty && errors.address.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.address.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">City:</label>
								<select
									name="city"
									className="form-control"
									value={form.city}
									onChange={onUpdateField}
									onBlur={onBlurField}
								>
									<option value="0">Select City</option>
									<option value="1">Surgery & Radiology</option>
									<option value="2">Children Care</option>
									<option value="3">Orthopedics</option>
									<option value="4">Nuclear Magnetic</option>
									<option value="5">Eye Treatment</option>
									<option value="6">X-Ray</option>
								</select>
								{errors.city.dirty && errors.city.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.city.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">State:</label>
								<select
									name="state"
									className="form-control"
									value={form.state}
									onChange={onUpdateField}
									onBlur={onBlurField}
								>
									<option value="0">Select State</option>
									<option value="1">Surgery & Radiology</option>
									<option value="2">Children Care</option>
									<option value="3">Orthopedics</option>
									<option value="4">Nuclear Magnetic</option>
									<option value="5">Eye Treatment</option>
									<option value="6">X-Ray</option>
								</select>
								{errors.state.dirty && errors.state.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.state.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Email:</label>
								<input
									type="Email"
									name="email"
									value={form.email}
									onChange={onUpdateField}
									onBlur={onBlurField}
									className="form-control"
									placeholder="Email:"
								/>
								{errors.email.dirty && errors.email.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Password</label>
								<input
									type="password"
									name="password"
									value={form.password}
									onChange={onUpdateField}
									onBlur={onBlurField}
									className="form-control"
									placeholder="Password"
								/>
								{errors.password.dirty && errors.password.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.password.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Confirm Password</label>
								<input
									type="password"
									className="form-control"
									name="confirmPassword"
									value={form.confirmPassword}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Confirm Password"
								/>
								{errors.confirmPassword.dirty && errors.confirmPassword.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.confirmPassword.message}</p>
								) : null}
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-8">
							<button type="submit">Create Account</button>
						</div>
						<div className="col-lg-2"></div>

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
							Already have an account? Login <Link href="/authentication/partner/login"><a>HERE</a></Link> for free!
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
}

export default partnerRegister;