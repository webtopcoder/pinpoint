import React, { useState, useRef, useEffect } from 'react';
import styles from './settings.module.css';
import { useRegisterFormValidator } from "../../Authentication/partner/hooks/partner-Register-validator";
import { Col, Row, Layout, Button } from 'antd';
import Link from 'next/link';
import logo from "@/public/images/logo.png";
import Image from "next/image";
import {
    DoubleLeftOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const { Content } = Layout;

const Business = () => {
    const router = useRouter();

    const onSubmitForm = () => {

    }
    const [form, setForm] = useState({

        usertype: "partner",
        firstName: "",
        lastName: "",
        userName: "",
        address: "",
        city: "",
        state: "",
        email: "",

    });

    const [addressForm, setaddressForm] = useState({
        address: "",
        city: "",
        state: "",
    });

    const inputRef = useRef();
    const autoCompleteRef = useRef();
    const { errors, validateForm, onBlurField } = useRegisterFormValidator(form, addressForm);

    const options = {
        componentRestrictions: { country: "us" },
        fields: ["address_components", "adr_address", "formatted_address", "geometry", "name"],
        types: ["establishment"]
    };
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
    })
    return (
        <Layout className="site-layout" style={{
            background: '#211f1f'
        }}>
            <Content
                style={{
                    margin: '100px 100px',
                }}
            >
                <div className="site-card-wrapper">
                    <Row className='mb-5'>
                        <Col md={12} xs={12} sm={12}>
                            <Button type="primary" shape="round" icon={<DoubleLeftOutlined />} onClick={() => router.push('/partner/settings')}>Go back</Button>
                        </Col>
                        <Col md={12} xs={12} sm={12} className={styles.right_pane}>
                            <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={() => setShowModal(true)}>Add User</Button>
                        </Col>
                    </Row>
                    <div className={styles.business_detail_content}>
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Business;