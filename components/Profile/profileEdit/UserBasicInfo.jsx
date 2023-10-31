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

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ 'color': [] }],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        [{ 'align': [] }],
        [{ 'direction': 'rtl' }],
        ["link", "image", "video"],
        ["clean"],

    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

const formats = [
    "header",
    "font",
    "size",
    "color",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

const UserBasicInfo = () => {
    const countryCode = "US";
    const country = csc.getCountryByCode(countryCode);
    const states = csc.getStatesOfCountry(country.isoCode);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        dob: new Date(),
        address: {
            city: '',
            state: '',
            address: ''
        },
        email: '',
        profile: {
            about: ''
        }
    });
    const [cityList, setCityList] = useState([]);
    const { errors, validateForm, onBlurField } = useEditFormValidator(form);

    const onUpdateField = (e) => {
        const field = e.target.name;
        if (e.target.name == "state") {
            const citiesbystate = csc.getCitiesOfState(countryCode, e.target.value);
            setCityList(citiesbystate);
        }

        let nextFormState;
        e.target.name === "state" || e.target.name === "city" ?
            nextFormState = {
                ...form,
                address: {
                    ...form.address,
                    [field]: e.target.value,
                }
            } :
            nextFormState = {
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

        await profileService.updateBasicInfo(form)
            .then((res) => {
                localStorage.setItem('fullname', res?.name)
                notify("success", "Saved Successfully");
            })
            .catch((error) => {
                console.log(error);
                return;
            });
    };

    async function changeAbout(e) {
        await setForm({
            ...form,
            profile: {
                about: e
            }
        })
    };

    useEffect(() => {
        profileService.getInfo()
            .then(async (res) => {
                setForm({
                    ...form,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    username: res.data.username,
                    dob: formatDateDob(res.data.dob),
                    address: {
                        address: res.data.address?.address,
                        city: res.data.address?.city,
                        state: res.data?.address?.state,
                    },
                    email: res.data.email,
                    profile: {
                        about: res.data?.profile?.about
                    }
                });
                setCityList(csc.getCitiesOfState(countryCode, res?.data?.address?.state))
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
                        <FormGroup
                            errors={errors}
                            label="First Name *"
                            value={form.firstName}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="firstName"
                            type="text"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <FormGroup
                            errors={errors}
                            label="Last Name *"
                            value={form.lastName}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="lastName"
                            type="text"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <FormGroup
                            label="Username *"
                            errors={errors}
                            value={form.username}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="username"
                            type="text"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <FormGroup
                            label="Email *"
                            errors={errors}
                            value={form.email}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="email"
                            type="email"
                        />
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <FormGroup
                            label="Date Of Birth *"
                            errors={errors}
                            value={form.dob}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="dob"
                            type="date"
                        />
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label className="authen-text-attr">State *</label>
                            <select
                                name="state"
                                className="form-control"
                                value={form.address.state}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                            >
                                <option value="0">Select State</option>
                                {states.map((option, index) => (
                                    <option key={index} value={option.isoCode}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            {errors.state.dirty && errors.state.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                    {errors.state.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label className="authen-text-attr">City *</label>
                            <select
                                name="city"
                                className="form-control"
                                value={form.address.city}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                            >
                                <option value="0">Select City</option>
                                {cityList.map((option, index) => (
                                    <option key={index} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            {errors.city.dirty && errors.city.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                    {errors.city.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
                <Divider />
                <CardTitle className="mb-2">About Me</CardTitle>
                <div className="form-group">
                    <QuillNoSSRWrapper
                        name="about"
                        modules={modules}
                        formats={formats}
                        theme="snow"
                        value={form?.profile?.about}
                        onChange={changeAbout}
                    />
                </div>
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

export default UserBasicInfo;
