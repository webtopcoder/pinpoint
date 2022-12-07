import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "../LoginForm.module.css";
import { useRegisterFormValidator } from "./hooks/partner-Register-validator";
import { registerUser } from '@/redux/User/actions';
import { getCategory } from '@/redux/User/actions';

const partnerRegister = ({ onRegisterUser, ongetCateogry, categoryInfo }) => {

	const router = useRouter()

	const [form, setForm] = useState({

		usertype: "partner",
		firstName: "",
		lastName: "",
		userName: "",
		address: "",
		city: "",
		state: "",
		category: "",
		email: "",
		password: "",
		confirmPassword: ""

	});

	useEffect(() => {
		ongetCateogry();
	}, [])

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
		const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
		if (!isValid) return;

		onRegisterUser(form, res => {
			if (res.success) {
				localStorage.setItem('thankyou_id', 'Partner');
				router.push('/authentication/thank-you')
			}
		});

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
									name="userName"
									value={form.userName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Business Legal Name:"
								/>
								{errors.userName.dirty && errors.userName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.userName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">Owner First Name:</label>
								<input
									type="text"
									className="form-control"
									name="firstName"
									value={form.firstName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Owner First Name"
								/>
								{errors.firstName.dirty && errors.firstName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.firstName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">Owner Last Name:</label>
								<input
									type="text"
									className="form-control"
									name="lastName"
									value={form.lastName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Owner Last Name:"
								/>
								{errors.lastName.dirty && errors.lastName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.lastName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Business Physcial Address(Corporate):</label>
								<input
									type="text"
									className="form-control"
									name="address"
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
								<label className="authen-text-attr">Category:</label>
								<select
									name="category"
									className="form-control"
									value={form.category}
									onChange={onUpdateField}
									onBlur={onBlurField}
								>
									<option value="0">Select Category</option>
									{categoryInfo.map((option, index) =>
										<option key={index} value={option.content.value}>{option.content.label}</option>
									)}
								</select>
								{errors.category.dirty && errors.category.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.category.message}</p>
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
							<button type="submit">REQUEST ACCESS</button>
						</div>
						<div className="col-lg-2"></div>

					</div>
					<div className="row auth-divider"></div>
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

const mapStateToProps = ({ user }) => ({
	categoryInfo: user.partnerCategory.categories
})

const mapDispatchToProps = dispatch => ({
	onRegisterUser: (data, cb) => dispatch(registerUser(data, cb)),
	ongetCateogry: () => dispatch(getCategory()),
})

export default connect(mapStateToProps, mapDispatchToProps)(partnerRegister);