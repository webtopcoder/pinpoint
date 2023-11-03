import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Divider } from "antd";
import useNotify from "@/hooks/useNotify";
import { profileService } from "@/services/index";
import {
    CardTitle,
} from "reactstrap";
import { useEditFormValidator } from "../../Auth/Partner/hooks/use-partner-edit-validator";
import FormGroup from "../../Auth/FormGroup";
import styles from "@/components/Auth/validate.module.css";
import { categoryService } from "@/services/index";

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

const PartnerBasicInfo = () => {
    let itemLocality = "";
    let itemState = "";
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        address: {
            city: '',
            state: '',
            address: '',
            lat: "",
            lng: "",
        },
        businessname: '',
        email: '',
        profile: {
            about: ''
        },
        category: "",
    });

    const [addressForm, setaddressForm] = useState({
        address: "",
        city: "",
        state: "",
        lat: "",
        lng: "",
    });

    const { errors, validateForm, onBlurField } = useEditFormValidator(form, addressForm);

    async function ongetCategory() {
        const result = await categoryService.getCategory();
        await setCategories(result.allcategories);
    }

    const onUpdateField = (e) => {
        const field = e.target.name;
        let nextFormState;
        if (field == "address") {
            nextFormState = {
                ...addressForm,
                [field]: e.target.value,
            };
            setaddressForm(nextFormState);
        } else {
            nextFormState = {
                ...form,
                [field]: e.target.value,
            }
            setForm(nextFormState);
        };
        if (errors[field]?.dirty)
            validateForm({
                addressForm: nextFormState,
                form: form,
                errors,
                field,
            });
    }

    const { notify } = useNotify();

    const autoCompleteRef = useRef();
    const inputRef = useRef();

    const mapAutoCompleteOptions = {
        componentRestrictions: { country: "us" },
        fields: [
            "address_components",
            "adr_address",
            "formatted_address",
            "geometry",
            "name",
        ],
    };

    async function onSubmitForm(e) {
        e.preventDefault();
        const { isValid } = validateForm({
            form,
            addressForm,
            errors,
            forceTouchErrors: true,
        });
        if (!isValid) return;

        const data = {
            ...form,
            address: {
                address: addressForm.address,
                city: addressForm.city,
                state: addressForm.state,
                latitude: addressForm.lat,
                longitude: addressForm.lng,
            },
        };

        await profileService.updateBasicInfo(data)
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
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            mapAutoCompleteOptions
        );

        autoCompleteRef.current?.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            place.address_components.map((address_component, _) => {
                if (address_component.types[0] == "locality")
                    itemLocality = address_component.long_name;
                if (address_component.types[0] == "administrative_area_level_1")
                    itemState = address_component.long_name;
            });

            setaddressForm({
                ...addressForm,
                address: place.formatted_address,
                state: itemState,
                city: itemLocality,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            });
        });
        ongetCategory();
    }, []);

    useEffect(() => {
        profileService.getInfo()
            .then(async (res) => {
                console.log(res.data)
                setForm({
                    ...form,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    username: res.data.username,
                    businessname: res.data.businessname,
                    address: {
                        address: res.data.address?.address,
                        city: res.data.address?.city,
                        state: res.data?.address?.state,
                    },
                    email: res.data.email,
                    profile: {
                        about: res.data?.profile?.about
                    },
                    category: res.data?.category?._id
                });

                setaddressForm(
                    {
                        address: res.data.address?.address,
                        city: res.data.address?.city,
                        state: res.data?.address?.state,
                    }
                )
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
                            disabled
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
                            disabled
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
                            disabled
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
                    <div className="col-lg-6 col-md-12">
                        <FormGroup
                            label="Business Legal Name *"
                            errors={errors}
                            value={form.businessname}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="businessname"
                            type="text"
                            disabled
                        />
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="form-group">
                            <label className="authen-text-attr">Category *</label>
                            <select
                                name="category"
                                className="form-control"
                                value={form.category}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                                disabled
                            >
                                <option value="0">Select Category</option>
                                {categories?.map((option, index) => (
                                    <option key={index} value={option._id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category.dirty && errors.category.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                    {errors.category.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <FormGroup
                            errors={errors}
                            label="Business Physical Address(Corporate)*"
                            value={addressForm.address}
                            onChange={onUpdateField}
                            onBlur={onBlurField}
                            name="address"
                            type="text"
                            ref={inputRef}
                            placeholder=""
                        />
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

export default PartnerBasicInfo;
