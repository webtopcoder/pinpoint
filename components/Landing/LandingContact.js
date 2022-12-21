import { React, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "./contact-validator/LoginForm.module.css";
import { ContactFormValidator } from "./contact-validator/validater-hook";
import { ContactUser } from '@/redux/Contact/actions';
import toast from "@/components/Toast";

const LandingContact = ({ onContactUser }) => {

	const router = useRouter()
	const notify = useCallback((type, message) => {
		toast({ type, message });
	}, []);

	const dismiss = useCallback(() => {
		toast.dismiss();
	}, []);

	const [form, setForm] = useState({

		usertype: "",
		firstName: "",
		lastName: "",
		email: "",
		subject: "",
		messageContent: ""
	});

	const { errors, validateForm, onBlurField } = ContactFormValidator(form);

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

		onContactUser(form, res => {
			if (res.success) {
				const initialstate = {
					usertype: "",
					firstName: "",
					lastName: "",
					email: "",
					subject: "",
					messageContent: ""
				};
				setForm(initialstate);
				notify("success", res.msg)
			}
			else notify("error", res.msg)
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
									type="text"
									name="subject"
									value={form.subject}
									onChange={onUpdateField}
									onBlur={onBlurField}
									className="form-control"
									placeholder="Subject:"
								/>
								{errors.subject.dirty && errors.subject.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.subject.message}</p>
								) : null}
							</div>
						</div>
						<div className="col-lg-12 col-md-12">
							<div className="form-check form-check-inline">
								<input className="form-check-input" onChange={onUpdateField} type="radio" name="usertype" id="inlineRadio1" value="user" />
								<label className="authen-text-attr" htmlFor="inlineRadio1">User</label>
							</div>
							<div className="form-check form-check-inline">
								<input className="form-check-input" onChange={onUpdateField} type="radio" name="usertype" id="inlineRadio2" value="partner" />
								<label className="authen-text-attr" htmlFor="inlineRadio2">Partner</label>
							</div>

						</div>
						<div className="col-lg-12 col-md-12 col-sm-12">
							<div className="form-group">
								<label className="authen-text-attr">Message...</label>
								<textarea
									name="messageContent"
									cols="30"
									rows="6"
									className="form-control"
									value={form.messageContent}
									onChange={onUpdateField}
									onBlur={onBlurField}
									required
								></textarea>
								{errors.messageContent.dirty && errors.messageContent.error ? (
									<p className={styles.formFieldErrorMessage}>{errors.messageContent.message}</p>
								) : null}
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
	onContactUser: (data, cb) => dispatch(ContactUser(data, cb))
})
export default connect(undefined, mapDispatchToProps)(LandingContact);
