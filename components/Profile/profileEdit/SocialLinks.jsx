import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Divider } from "antd";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import {
    CardTitle,
} from "reactstrap";
import { useEditFormValidator } from "../../Auth/User/hooks/use-user-edit-form-validator";
import FormGroup from "../../Auth/FormGroup";
import csc from "country-state-city";
import { formatDateDob } from "@/utils/date";
import styles from "@/components/Auth/validate.module.css";

const SocialLink = () => {
    const [form, setForm] = useState({
        profile: {
            social: {
                facebook: '',
                twitter: '',
                instagram: '',
                snapchat: '',
                website: ''
            }
        }
        ,
    });

    const onUpdateField = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            profile: {
                social: {
                    ...form.profile.social,
                    [field]: e.target.value,
                }
            }
        }
        setForm(nextFormState);
    };

    const { notify } = useNotify();

    async function onSubmitForm(e) {
        e.preventDefault();

        await profileService.updateBasicInfo(form)
            .then(() => {
                notify("success", "Saved successfully");
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    };

    useEffect(() => {
        profileService.getInfo()
            .then(async (res) => {
                setForm({
                    ...form,
                    profile: {
                        social: res.data.profile?.social
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    }, []);

    return (
        <>
            <form onSubmit={onSubmitForm}>
                <div className="row">
                    <div className="auth-space desktop"></div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group social-wrap">
                            <label className="authen-text-attr">FaceBook</label>
                            <input
                                type='text'
                                className="form-control"
                                name='facebook'
                                value={form.profile?.social?.facebook}
                                onChange={onUpdateField}
                            />{" "}
                            <i className="bx bxl-facebook social-icon"></i>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group social-wrap">
                            <label className="authen-text-attr">Twitter</label>
                            <input
                                type='text'
                                className="form-control"
                                name='twitter'
                                value={form.profile?.social?.twitter}
                                onChange={onUpdateField}
                            />{" "}
                            <i className="bx bxl-twitter social-icon"></i>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="form-group social-wrap">
                            <label className="authen-text-attr">Instagram</label>
                            <input
                                type='text'
                                className="form-control"
                                name='instagram'
                                value={form.profile?.social?.instagram}
                                onChange={onUpdateField}
                            />{" "}
                            <i className="bx bxl-instagram-alt social-icon"></i>

                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="form-group social-wrap">
                            <label className="authen-text-attr">SnapChat</label>
                            <input
                                type='text'
                                className="form-control"
                                name='snapchat'
                                value={form.profile?.social?.snapchat}
                                onChange={onUpdateField}
                            />{" "}
                            <i className="bx bxl-snapchat social-icon"></i>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="form-group social-wrap">
                            <label className="authen-text-attr">Website</label>
                            <input
                                type='text'
                                className="form-control"
                                name='website'
                                value={form.profile?.social?.website}
                                onChange={onUpdateField}
                            />{" "}
                            <i className="bx bxl-internet-explorer social-icon"></i>
                        </div>
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

export default SocialLink;
