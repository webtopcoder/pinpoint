import { React, useState } from "react";
import { connect } from 'react-redux';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "./validate.module.css";
import { recoveryPassword } from '@/redux/User/actions';
import { createPasswordFormValidator } from "./User/hooks/create-password-validator";


const createPassword = ({
    onrecoveryPassword
}) => {

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const { errors, validateForm, onBlurField } = createPasswordFormValidator(form);
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
        onrecoveryPassword(form);
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
                    <p className="text-center">
                        Lost your password? Please enter your username or email address.
                        You will receive a link to create a new password via email.
                    </p>

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


const mapDispatchToProps = dispatch => ({
    onrecoveryPassword: (data) => dispatch(recoveryPassword(data))
})

export default connect(undefined, mapDispatchToProps)(createPassword);