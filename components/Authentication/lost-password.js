import { React, useState, useCallback } from "react";
import { connect } from 'react-redux';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import styles from "./LoginForm.module.css";
import { recoveryPassword } from '@/redux/User/actions';
import { lostPasswordFormValidator } from "./User/hooks/lost-password-validator";
import toast from "@/components/Toast";


const lostPassword = ({
    onrecoveryPassword
}) => {

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const [form, setForm] = useState({
        userInfo: "",
    });

    const { errors, validateForm, onBlurField } = lostPasswordFormValidator(form);
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
        console.log(isValid)
        if (!isValid) return;
        onrecoveryPassword(form, res => {
            res.success? notify("success", res.msg): notify("error", res.msg)
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
                    <p className="text-center">
                        Lost your password? Please enter your username or email address.
                        You will receive a link to create a new password via email.
                    </p>
                    <div className="form-group">
                        <label className="authen-text-attr">Username or email *</label>
                        <input
                            type="text"
                            name="userInfo"
                            className="form-control"
                            value={form.userInfo}
                            onChange={onUpdateField}
                            placeholder="Username or email"
                            onBlur={onBlurField}
                        />
                        {errors.userInfo.dirty && errors.userInfo.error ? (
                            <p className={styles.formFieldErrorMessage}>{errors.userInfo.message}</p>
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



const mapStateToProps = ({ user }) => ({
    resetPasswordInfo: user.resetPasswordInfo
})

const mapDispatchToProps = dispatch => ({
    onrecoveryPassword: (data, cb) => dispatch(recoveryPassword(data, cb))

})

export default connect(mapStateToProps, mapDispatchToProps)(lostPassword);