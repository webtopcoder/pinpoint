import React, { useState, useCallback, useEffect } from "react";
import ToggleSwitch from "./Switch/ToggleSwitch";
import dynamic from 'next/dynamic';
import { connect, useDispatch } from 'react-redux';
import { getInfo } from '@/redux/Profile/actions';
import { updateInfo } from '@/redux/Profile/actions';
import { editAbout } from '@/redux/Profile/actions';
import { editSocial } from '@/redux/Profile/actions';
import { editNotification } from '@/redux/Profile/actions';
import toast from "@/components/Toast";


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

const profileEdit = ({ onupdateInfo, ongetInfo, editinfo }) => {

    const dispatch = useDispatch();

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    const [rating, setRating] = useState(false);
    const [follow, setFollow] = useState(false);
    const [mention, setMention] = useState(false);
    const [favorite, setFavorite] = useState(false);

    const onratingChange = (checked) => {
        setRating(checked);
    };

    const onfollowChange = (checked) => {
        setFollow(checked);
    };

    const onmentionChange = (checked) => {
        setMention(checked);
    };

    const onfavoriteChange = (checked) => {
        setFavorite(checked);
    };

    const [form, setForm] = useState({

        facebook: "",
        instagram: "",
        twitter: "",
        tiktok: "",
        snapchat: "",
        website: "",
    });

    const updateInfo = () => {

        const data = {
            about: editinfo.about
        }

        onupdateInfo(data, res => {
            res.success ? notify("success", res.msg) : notify("error", res.msg)
        });
    };

    const changeAbout = (e) => {

        dispatch(editAbout(e));
    };

    const onUpdateSocialField = e => {

        const field = e.target.name;

        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };
        setForm(nextFormState);
    };

    useEffect(() => {
        dispatch(editSocial(form));
        dispatch(editNotification(rating, follow, mention, favorite))
    }, [form, rating, follow, mention, favorite]);

    const onSubmitForm = e => {
        e.preventDefault();
        const data = {
            social: editinfo.social
        }

        onupdateInfo(data, res => {
            res.success ? notify("success", res.msg) : notify("error", res.msg)
        });
    };

    useEffect(() => {
        ongetInfo();
    }, []);

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
                                            <div className="avatar-form mg-12">
                                                <div className="row">
                                                    <div className="col-lg-8 col-md-8 col-sm-12">
                                                        <div className="form-group">
                                                            <QuillNoSSRWrapper
                                                                name="aboutme"
                                                                modules={modules}
                                                                formats={formats}
                                                                theme="snow"
                                                                value={editinfo.about}
                                                                onChange={changeAbout} />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 mg-12">
                                                        <div className="pin-post-footer-section">
                                                            <div className="pin-edit-button-section">
                                                                <button
                                                                    className="btn-style-one red-light-color"
                                                                    onClick={updateInfo}
                                                                >
                                                                    Update Info
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
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
                                            <form onSubmit={onSubmitForm} className="avatar-form">
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>Facebook:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="facebook"
                                                                    className="form-control"
                                                                    value={editinfo.social.facebook}
                                                                    onChange={onUpdateSocialField}
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
                                                                    name="instagram"
                                                                    className="form-control"
                                                                    value={editinfo.social.instagram}
                                                                    onChange={onUpdateSocialField}
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
                                                                    name="twitter"
                                                                    className="form-control"
                                                                    value={editinfo.social.twitter}
                                                                    onChange={onUpdateSocialField}
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
                                                                    name="tiktok"
                                                                    className="form-control"
                                                                    value={editinfo.social.tiktok}
                                                                    onChange={onUpdateSocialField}
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
                                                                    name="snapchat"
                                                                    className="form-control"
                                                                    value={editinfo.social.snapchat}
                                                                    onChange={onUpdateSocialField}
                                                                />
                                                            </div>
                                                        </div><div className="pin-post-footer-section mg-12">
                                                            <div className="pin-social-edit-title">
                                                                <p>Website:</p>
                                                            </div>
                                                            <div className="pin-social-edit-input">
                                                                <input
                                                                    type="text"
                                                                    name="website"
                                                                    className="form-control"
                                                                    value={editinfo.social.website}
                                                                    onChange={onUpdateSocialField}
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
                                                                    id="rating"
                                                                    checked={editinfo.notification.rating}
                                                                    onChange={onratingChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12 notify-border">
                                                            <div className="pin-notification-edit-title">
                                                                <p>Notify me when I receive a follow request.</p>
                                                            </div>
                                                            <div className="pin-notification-edit-input">
                                                                <ToggleSwitch
                                                                    id="follow"
                                                                    checked={editinfo.notification.follow}
                                                                    onChange={onfollowChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12 notify-border">
                                                            <div className="pin-notification-edit-title">
                                                                <p>Notify me when I get a mention.</p>
                                                            </div>
                                                            <div className="pin-notification-edit-input">
                                                                <ToggleSwitch
                                                                    id="mention"
                                                                    checked={editinfo.notification.mention}
                                                                    onChange={onmentionChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="pin-post-footer-section mg-12 notify-border">
                                                            <div className="pin-notification-edit-title">
                                                                <p>Notify me when my favorites are active.</p>
                                                            </div>
                                                            <div className="pin-notification-edit-input">
                                                                <ToggleSwitch
                                                                    id="favorite"
                                                                    checked={editinfo.notification.favorite}
                                                                    onChange={onfavoriteChange}
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

const mapStateToProps = ({ profile }) => {
    return {
        editinfo: profile.editInfo
    };
};

const mapDispatchToProps = dispatch => ({
    ongetInfo: () => dispatch(getInfo()),
    onupdateInfo: (info, cb) => dispatch(updateInfo(info, cb))
})
export default connect(mapStateToProps, mapDispatchToProps)(profileEdit);