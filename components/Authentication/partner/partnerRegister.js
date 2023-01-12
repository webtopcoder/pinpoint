import { React, useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "../validate.module.css";
import { useRegisterFormValidator } from "./hooks/partner-Register-validator";
import { registerUser } from '@/redux/User/actions';
import { getCategory } from '@/redux/User/actions';
import toast from "@/components/Toast";

const partnerRegister = ({ onRegisterUser, ongetCateogry, categoryInfo }) => {

	const itemLocality = '';
	const itemAddress = '';
	const itemState = '';
	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const dismiss = useCallback(() => {
		toast.dismiss();
	}, []);

	const autoCompleteRef = useRef();
	const inputRef = useRef();

	const options = {
		componentRestrictions: { country: "us" },
		fields: ["address_components", "adr_address", "formatted_address", "geometry", "name"],
		types: ["establishment"]
	};

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

	const [addressForm, setaddressForm] = useState({
		address: "",
		city: "",
		state: "",
	});

	useEffect(() => {

		autoCompleteRef.current = new window.google.maps.places.Autocomplete(
			inputRef.current,
			options, 
		);

		autoCompleteRef.current.addListener("place_changed", async function () {

			const place = await autoCompleteRef.current.getPlace();
			itemAddress = place.formatted_address;


			place.address_components.map((address_component, i) => {

				if (address_component.types[0] == "locality")
					itemLocality = address_component.long_name;
				if (address_component.types[0] == "administrative_area_level_1")
					itemState = address_component.long_name;

			}
			)

			setaddressForm({
				...addressForm,
				address: place.formatted_address,
				state: itemState,
				city: itemLocality
			})
		});
		ongetCateogry();

	}, [])


	const { errors, validateForm, onBlurField } = useRegisterFormValidator(form, addressForm);

	const onUpdateField = e => {

		const field = e.target.name;
		if (field == 'address') {
			const nextFormState = {
				...addressForm,
				[field]: e.target.value,
			};

			setaddressForm(nextFormState);
			if (errors[field].dirty)
				validateForm({
					addressForm: nextFormState,
					form: form,
					errors,
					field,
				});
		}

		else {
			const nextFormState = {
				...form,
				[field]: e.target.value,
			};

			setForm(nextFormState);
			if (errors[field].dirty)
				validateForm({
					form: nextFormState,
					addressForm: addressForm,
					errors,
					field,
				});
		}
	};

	const onSubmitForm = e => {

		e.preventDefault();
		form = {
			...form,
			address: addressForm.address,
			city: addressForm.city,
			state: addressForm.state
		}
		const { isValid } = validateForm({ form, addressForm, errors, forceTouchErrors: true });
		if (!isValid) return;

		onRegisterUser(form, res => {
			res.success ? notify("success", res.msg) : notify("error", res.msg)

			if (res.success) {
				localStorage.setItem('thankyou_id', 'Partner');
				router.push('/authentication/thank-you')
			}
		});

	};

	return (
		<>
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
									<label className="authen-text-attr">Business Legal Name *</label>
									<input
										type="text"
										className="form-control"
										name="userName"
										value={form.userName}
										onChange={onUpdateField}
										onBlur={onBlurField}
									/>
									{errors.userName.dirty && errors.userName.error ? (
										<p className={styles.formFieldErrorMessage}>{errors.userName.message}</p>
									) : null}
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="form-group">
									<label className="authen-text-attr">Owner First Name *</label>
									<input
										type="text"
										className="form-control"
										name="firstName"
										value={form.firstName}
										onChange={onUpdateField}
										onBlur={onBlurField}
									/>
									{errors.firstName.dirty && errors.firstName.error ? (
										<p className={styles.formFieldErrorMessage}>{errors.firstName.message}</p>
									) : null}
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="form-group">
									<label className="authen-text-attr">Owner Last Name *</label>
									<input
										type="text"
										className="form-control"
										name="lastName"
										value={form.lastName}
										onChange={onUpdateField}
										onBlur={onBlurField}
									/>
									{errors.lastName.dirty && errors.lastName.error ? (
										<p className={styles.formFieldErrorMessage}>{errors.lastName.message}</p>
									) : null}
								</div>
							</div>
							<div className="col-lg-12 col-md-12">
								<div className="form-group">
									<label className="authen-text-attr">Business Physcial Address(Corporate) *</label>
									<input
										type="text"
										className="form-control"
										name="address"
										value={addressForm.address}
										onChange={onUpdateField}
										onBlur={onBlurField}
										ref={inputRef}
										placeholder=""

									/>
									{errors.address.dirty && errors.address.error ? (
										<p className={styles.formFieldErrorMessage}>{errors.address.message}</p>
									) : null}
								</div>

							</div>
							<div className="col-lg-6 col-md-6">
								<div className="form-group">
									<label className="authen-text-attr">State *</label>
									<input
										name="state"
										value={addressForm.state}
										onChange={onUpdateField}
										className="form-control"
										disabled
									/>

								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="form-group">
									<label className="authen-text-attr">City *</label>
									<input
										name="city"
										value={addressForm.city}
										onChange={onUpdateField}
										className="form-control"
										disabled
									/>

								</div>
							</div>
							<div className="col-lg-12 col-md-12">
								<div className="form-group">
									<label className="authen-text-attr">Category *</label>
									<select
										name="category"
										className="form-control"
										value={form.category}
										onChange={onUpdateField}
										onBlur={onBlurField}
									>
										<option value="0">Select Category</option>
										{categoryInfo.map((option, index) =>
											<option key={index} value={option._id}>{option.content}</option>
										)}
									</select>
									{errors.category.dirty && errors.category.error ? (
										<p className={styles.formFieldErrorMessage}>{errors.category.message}</p>
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
		</>
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