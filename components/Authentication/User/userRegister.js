import { React, useState } from "react";
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import csc from 'country-state-city';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import DatePicker from "react-datepicker";
import styles from "../validate.css";
import { useRegisterFormValidator } from "./hooks/user-Register-validator";
import { registerUser } from '@/redux/User/actions';
import 'react-datepicker/dist/react-datepicker.css'

const userRegister = ({ onRegisterUser }) => {

	const countryCode = 'US';
	const country = csc.getCountryByCode(countryCode);
	const states = csc.getStatesOfCountry(country.isoCode);

	const router = useRouter()

	const [form, setForm] = useState({

		usertype: "user",
		firstName: "",
		lastName: "",
		userName: "",
		birthday: new Date(),
		city: "",
		state: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const setStartDate = date => {
		setForm({
			...form,
			birthday: date
		})
	}
	const [cityList, setCityList] = useState([]);

	const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);

	const onUpdateField = e => {

		const field = e.target.name;

		if (e.target.name == "state") {
			const citiesbystate = csc.getCitiesOfState(countryCode, e.target.value);
			setCityList(citiesbystate);
		}
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

				localStorage.setItem('thankyou_id', 'User');
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
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">First Name *</label>
								<input
									type="text"
									name="firstName"
									className="form-control"
									value={form.firstName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="First Name"
								/>
								{errors.firstName.dirty && errors.firstName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.firstName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">Last Name * </label>
								<input
									type="text"
									name="lastName"
									className="form-control"
									value={form.lastName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									placeholder="Last Name:"
								/>
								{errors.lastName.dirty && errors.lastName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.lastName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">User Name *</label>
								<input
									type="text"
									name="userName"
									value={form.userName}
									onChange={onUpdateField}
									onBlur={onBlurField}
									className="form-control"
									placeholder="User Name:"
								/>
								{errors.userName.dirty && errors.userName.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.userName.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Date of Birth *</label>
								<DatePicker
									name="birthday"
									className="form-control"
									onBlur={onBlurField}
									placeholderText={'dd/mm/yyyy'}
									selected={form.birthday}
									showMonthDropdown
									showYearDropdown
									value={form.birthday}
									dropdownMode="select"
									onChange={date => setStartDate(date)}
								/>
								{errors.birthday.dirty && errors.birthday.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.birthday.message}</p>
								) : null}
							</div>
						</div>

						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">State *</label>
								<select
									name="state"
									className="form-control"
									value={form.state}
									onChange={onUpdateField}
									onBlur={onBlurField}
								>
									<option value="0">Select State</option>
									{states.map((option, index) =>
										<option key={index} value={option.isoCode}>{option.name}</option>
									)}
								</select>
								{errors.state.dirty && errors.state.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.state.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-6 col-md-6">
							<div className="form-group">
								<label className="authen-text-attr">City *</label>
								<select
									name="city"
									className="form-control"
									value={form.city}
									onChange={onUpdateField}
									onBlur={onBlurField}
								>
									<option value="0">Select City</option>
									{cityList.map((option, index) =>
										<option key={index} value={option.name}>{option.name}</option>
									)}
								</select>
								{errors.city.dirty && errors.city.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.city.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-group">
								<label className="authen-text-attr">Email *</label>
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
								<label className="authen-text-attr">Password *</label>
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
								<label className="authen-text-attr">Confirm Password *</label>
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

					<div className="col-12">
						<p className="account-desc">
							Already have an account? Login <Link href="/authentication/user/login"><a>HERE</a></Link> for free!
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

const mapDispatchToProps = dispatch => ({
	onRegisterUser: (data, cb) => dispatch(registerUser(data, cb))
})
export default connect(undefined, mapDispatchToProps)(userRegister);
