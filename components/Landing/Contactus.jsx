import { React, useState } from "react";
import contactbanner from "@/public/images/landing/contactbanner.png";
import Image from "next/image";
import styles from "./contact-validator/LoginForm.module.css";
import { ContactFormValidator } from "./contact-validator/validater-hook";
import useNotify from "@/hooks/useNotify";
import { userService } from "@/services/index";
import FormGroup from "../Authentication/FormGroup";

const Contactus = () => {
  const { notify } = useNotify();
  const [form, setForm] = useState({
    usertype: "",
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    messageContent: "",
  });

  const { errors, validateForm, onBlurField } = ContactFormValidator(form);

  const onUpdateField = (e) => {
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

  async function onSubmitForm(e) {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;

    await userService.submitContact(form)
      .then(() => {
        notify("success", "Submitted Successfully");
        const initialstate = {
          usertype: "",
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          messageContent: "",
        };
        setForm(initialstate);
      })
      .catch((error) => {
        notify(
          "error",
          error?.response?.data?.message || "Something went wrong"
        );
        return;
      });
  }
  return (
    <div className="request-a-visit-area ptb-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 col-md-12">
            <h2>Contact <span style={{
              color: '#165593'
            }}>PIN</span><span style={{
              color: '#EC2226'
            }}>POINT</span>
            </h2>
            <p
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              Have any questions or concerns? Feel free to reach out to the team at Pinpoint for assistance! When logged in, you can chat with the admin directly through your messaging page.
              @ThePinpointSocial.
            </p>
            <div style={{
              textAlign: 'right'
            }}>
              <Image
                src={contactbanner}
                data-aos="fade-up"
                data-aos-duration="1200"
                alt="overview-image"
              />
            </div>
          </div>
          <div className="col-lg-1 col-md-12"></div>
          <div className="col-lg-6 col-md-12">
            <div className="request-a-visit-form">
              <form onSubmit={onSubmitForm}>
                <div className="row">
                  <div className="auth-space"></div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <FormGroup
                      errors={errors}
                      label="FIrst Name"
                      value={form.firstName}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      name="firstName"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <FormGroup
                      errors={errors}
                      label="Last Name"
                      value={form.lastName}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      name="lastName"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <FormGroup
                      errors={errors}
                      label="Email"
                      value={form.email}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      name="email"
                      type="Email"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <FormGroup
                      errors={errors}
                      label="Subject"
                      value={form.subject}
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                      name="subject"
                      type="text"
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        onChange={onUpdateField}
                        type="radio"
                        name="usertype"
                        id="inlineRadio1"
                        value="user"
                      />
                      <label className="authen-text-attr" htmlFor="inlineRadio1">
                        User
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        onChange={onUpdateField}
                        type="radio"
                        name="usertype"
                        id="inlineRadio2"
                        value="partner"
                      />
                      <label className="authen-text-attr" htmlFor="inlineRadio2">
                        Partner
                      </label>
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
                        <p className={styles.formFieldErrorMessage}>
                          {errors.messageContent.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <button type="submit" className="contact_submit">SEND</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
