import { React, useState } from "react";
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import csc from 'country-state-city';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "./LoginForm.module.css";
import { useRegisterFormValidator } from "./hooks/user-Register-validator";
import { registerUser } from '@/redux/User/actions';

const LandingContact = ({ onRegisterUser }) => {

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
		<div className="col-lg-12 col-md-12" style={{
			padding: '10px 10px 10px 161px'
		}}>
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
								<label className="authen-text-attr">First Name</label>
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
								<label className="authen-text-attr">Last Name </label>
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
								<label className="authen-text-attr">Email</label>
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
								<label className="authen-text-attr">Subject</label>
								<input
									type="Email"
									name="email"
									value={form.email}
									onChange={onUpdateField}
									onBlur={onBlurField}
									className="form-control"
									placeholder="Subject:"
								/>
								{errors.email.dirty && errors.email.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.email.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-check form-check-inline">
								<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
									<label className="authen-text-attr" htmlFor="inlineRadio1">User</label>
							</div>
							<div className="form-check form-check-inline">
								<input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
									<label className="authen-text-attr" htmlFor="inlineRadio2">Partner</label>
							</div>
							
						</div>
						<div className="col-lg-12 col-md-12 col-sm-12">
							<div className="form-group">
								<label className="authen-text-attr">Message...</label>
								<textarea
									name="text"
									cols="30"
									rows="6"
									className="form-control"
									value={form.text}
									onChange={onUpdateField}
									required
								></textarea>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-2"></div>
						<div className="col-lg-8">
							<button type="submit">SEND</button>
						</div>
						<div className="col-lg-2"></div>

					</div>
				</form>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	onRegisterUser: (data, cb) => dispatch(registerUser(data, cb))
})
export default connect(undefined, mapDispatchToProps)(LandingContact);
