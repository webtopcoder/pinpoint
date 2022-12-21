import { React, useState, useCallback } from "react";
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "../validate.less";
import { loginUser } from '@/redux/User/actions';
import { useLoginFormValidator } from "./hooks/user-Login-validator";
import toast from "@/components/Toast";

const userLogin = ({
	onLoginUser,
}) => {
	
	const router = useRouter();
	const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

	const [form, setForm] = useState({
		userInfo: "",
		password: "",
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
		onLoginUser(form, res => {
			res.success? notify("success", res.msg): notify("error", res.msg)
			if (res.success) {
				router.push('/home');
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
					<div className="auth-space"></div>
					<div className="form-group">
						<label className="authen-text-attr">Username or Email *</label>
						<input
							type="text"
							name="userInfo"
							className="form-control"
							value={form.userInfo}
							onChange={onUpdateField}
							placeholder="Username or Email"
							onBlur={onBlurField}
						/>
						{errors.userInfo.dirty && errors.userInfo.error ? (
							<p className={styles.formFieldErrorMessage}>{errors.userInfo.message}</p>
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

					<div className="col-12">
						<p className="account-desc">
							No Account Yet? Signup <Link href="/authentication/user/register"><a>HERE</a></Link> for free!
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

const mapStateToProps = ({ user }) => ({
	loginInfo: user.loginInfo
})

const mapDispatchToProps = dispatch => ({
	onLoginUser: (data, cb) => dispatch(loginUser(data, cb))

})

export default connect(mapStateToProps, mapDispatchToProps)(userLogin);