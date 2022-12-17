import React, { useState } from "react";
import ToggleSwitch from "@/components/Switch/ToggleSwitch";
import dynamic from 'next/dynamic'

window.addEventListener('load', QuillNoSSRWrapper, false);
// ..... or 
window.addEventListener('DOMContentLoaded', QuillNoSSRWrapper, false);

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

const profileEdit = () => {

    let [newsletter, setNewsletter] = useState(false);
    let [daily, setDaily] = useState(false);
    let [weekly, setWeekly] = useState(false);
    let [monthly, setMonthly] = useState(false);

    const onNewsletterChange = (checked) => {
        setNewsletter(checked);
        if (!checked) {
            setDaily(false);
            setWeekly(false);
            setMonthly(false);
        }
    };
    return (
        <div className="blog-details-area">
            <div className="container">
                <br />
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-12 col-md-12">
                        <div className="profile-location">
                            <p className="title">Edit Profile</p>
                            <div className="container">
                                <div className="row">
                                    <div className="avatar-respond">
                                        <div className="pin-about-section">
                                            <span id="span-underline">
                                                About Me
                                            </span>
                                            <form className="avatar-form mg-12">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="form-group">
                                                            <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 mg-12">
                                                        <div className="pin-post-footer-section">
                                                            <div className="pin-edit-button-section">
                                                                <button
                                                                    type="submit"
                                                                    className="btn-style-one red-light-color"
                                                                >
                                                                    Update Info
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="profile-location">
                            <div className="container">
                                <div className="row">
                                    <div className="avatar-respond">
                                        <div className="pin-about-section">
                                            <span id="span-underline">
                                                Social Links
                                            </span>
                                            <form className="avatar-form">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>Facebook:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="number"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>Instagram:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="number"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>Twitter:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="number"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>TikTok:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="number"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>Snapchat:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="number"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div><div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>Website:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="number"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 mg-12">
                                                        <div className="pin-post-footer-section">
                                                            <div className="pin-edit-button-section">
                                                                <button
                                                                    type="submit"
                                                                    className="btn-style-one red-light-color"
                                                                >
                                                                    Update Info
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="profile-location">
                            <div className="container">
                                <div className="row">
                                    <div className="avatar-respond">
                                        <div className="pin-about-section">
                                            <span id="span-underline">
                                                Push Notifications
                                            </span>
                                            <form className="avatar-form">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="pin-post-footer-section mg-12 notify-border">
                                                            <div className="pin-notification-edit-title">
                                                                <p>Notify me when I receive a like, comment or rating.</p>
                                                            </div>
                                                            <div className="pin-notification-edit-input">
                                                                <ToggleSwitch
                                                                    id="newsletter"
                                                                    checked={newsletter}
                                                                    onChange={onNewsletterChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12 notify-border">
                                                            <div className="pin-notification-edit-title">
                                                                <p>Notify me when I receive a follow request.</p>
                                                            </div>
                                                            <div className="pin-notification-edit-input">
                                                                <ToggleSwitch
                                                                    id="newsletter"
                                                                    checked={newsletter}
                                                                    onChange={onNewsletterChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12 notify-border">
                                                            <div className="pin-notification-edit-title">
                                                                <p>Notify me when I get a mention.</p>
                                                            </div>
                                                            <div className="pin-notification-edit-input">
                                                                <ToggleSwitch
                                                                    id="newsletter"
                                                                    checked={newsletter}
                                                                    onChange={onNewsletterChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12 notify-border">
                                                            <div className="pin-notification-edit-title">
                                                                <p>Notify me when my favorites are active.</p>
                                                            </div>
                                                            <div className="pin-notification-edit-input">
                                                                <ToggleSwitch
                                                                    id="newsletter"
                                                                    checked={newsletter}
                                                                    onChange={onNewsletterChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default profileEdit;
