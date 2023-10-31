import React, { useState } from "react";
import { Divider } from "antd";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import { usePasswordFormValidator } from "../../Auth/User/hooks/use-user-password-form-validator";
import FormGroup from "../../Auth/FormGroup";

const ChangePassword = () => {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const { errors, validateForm, onBlurField } = usePasswordFormValidator(form);
    const onUpdateField = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        }
        setForm(nextFormState);
        if (errors[field]?.dirty)
            validateForm({
                form: nextFormState,
                errors,
                field,
            });
    };

    const { notify } = useNotify();
    async function onSubmitForm(e) {
        e.preventDefault();
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;

        await profileService.changePassword({ password: form.password })
            .then(() => {
                notify("success", "Saved successfully");
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    };

    return (
        <>
            <form onSubmit={onSubmitForm}>
                <div className="row">
                    <div className="auth-space desktop"></div>
                    <div className="col-lg-6 col-md-6">
                        <FormGroup
                            label="New Password *"
                            errors={errors}
                            value={form.password}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="password"
                            type="password"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <FormGroup
                            label="New Password Confirm *"
                            errors={errors}
                            value={form.confirmPassword}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="confirmPassword"
                            type="password"
                        />
                    </div>
                </div>
                <Divider />
                <div className="col-lg-3 col-md-12 col-sm-12 mg-12">
                    <div className="pin-post-footer-section">
                        <div className="pin-edit-button-section">
                            <button
                                className="btn-style-one blue-dark-color"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ChangePassword;
