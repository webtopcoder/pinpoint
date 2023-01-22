import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { connect, useDispatch } from "react-redux";
import { getInfo } from "@/redux/Profile/actions";
import {
  updateInfo,
  editAbout,
  editSocial,
  uploadAvatar,
} from "@/redux/Profile/actions";
import { editNotification } from "@/redux/Profile/actions";
import toast from "@/components/Toast";
import { message, Upload, Input, Layout } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import config from "@/utils/config";
import Image from "next/image";

const { Content } = Layout;

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
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

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Edit = ({ onupdateInfo, ongetInfo, editinfo, onuploadAvatar }) => {
  let avatarImg = "";
  if (typeof window !== "undefined") {
    // Perform localStorage action
    avatarImg = sessionStorage.getItem("avatar");
  }

  const avatarurl = `http://${config.server}:${config.port}/avatar/`;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      const image_data = new FormData();
      image_data.append("avatar", info.file.originFileObj);
      onuploadAvatar(image_data, (res) => {
        res.success ? notify("success", res.msg) : notify("error", res.msg);
      });

      getBase64(info.file.originFileObj, (url) => {
        console.log(info.file.originFileObj);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        My Photo
      </div>
    </div>
  );

  const dispatch = useDispatch();

  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const dismiss = useCallback(() => {
    toast.dismiss();
  }, []);

  const [rating, setRating] = useState(
    editinfo.notification.rating ? editinfo.notification.rating : false
  );
  const [follow, setFollow] = useState(
    editinfo.notification.follow ? editinfo.notification.follow : false
  );
  const [mention, setMention] = useState(
    editinfo.notification.mention ? editinfo.notification.mention : false
  );
  const [favorite, setFavorite] = useState(
    editinfo.notification.favorite ? editinfo.notification.favorite : false
  );

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
    facebook: editinfo.social.facebook ? editinfo.social.facebook : "",
    instagram: editinfo.social.instagram ? editinfo.social.instagram : "",
    twitter: editinfo.social.twitter ? editinfo.social.twitter : "",
    tiktok: editinfo.social.tiktok ? editinfo.social.tiktok : "",
    snapchat: editinfo.social.snapchat ? editinfo.social.snapchat : "",
    website: editinfo.social.website ? editinfo.social.website : "",
  });

  const updateInfo = () => {
    const data = {
      about: editinfo.about,
    };

    onupdateInfo(data, (res) => {
      res.success ? notify("success", res.msg) : notify("error", res.msg);
    });
  };

  const changeAbout = (e) => {
    dispatch(editAbout(e));
  };

  const onUpdateSocialField = (e) => {
    const field = e.target.name;

    const nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
  };

  useEffect(() => {
    dispatch(editSocial(form));
    dispatch(editNotification(rating, follow, mention, favorite));
  }, [form, rating, follow, mention, favorite]);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const data = {
      social: editinfo.social,
    };

    onupdateInfo(data, (res) => {
      res.success ? notify("success", res.msg) : notify("error", res.msg);
    });
  };

  useEffect(() => {
    ongetInfo();
  }, []);

  return (
    <Layout
      className="site-layout"
      style={{
        background: "#211f1f",
      }}
    >
      <Content
        style={{
          margin: "60px 16px",
        }}
      >
        <div className="blog-details-area">
          <div className="container">
            <br />
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-12 col-md-12">
                <div className="profile-location">
                  <p className="title">Edit Business Profile</p>
                  <div className="container">
                    <div className="row">
                      <div className="avatar-respond">
                        <div className="pin-about-section">
                          <span id="span-underline">About Us</span>
                          <div className="avatar-form mg-12">
                            <div className="row">
                              <div className="col-lg-10 col-md-10 col-sm-12">
                                <div className="form-group">
                                  <QuillNoSSRWrapper
                                    name="aboutme"
                                    modules={modules}
                                    formats={formats}
                                    theme="snow"
                                    value={editinfo.about}
                                    onChange={changeAbout}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-2">
                                <Upload
                                  name="avatar"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  beforeUpload={beforeUpload}
                                  onChange={handleChange}
                                >
                                  {imageUrl ? (
                                    <Image
                                      src={imageUrl}
                                      alt="avatar"
                                      style={{
                                        width: "100%",
                                      }}
                                    />
                                  ) : avatarImg ? (
                                    <Image
                                      src={avatarurl + avatarImg}
                                      alt="avatar"
                                      style={{
                                        width: "100%",
                                      }}
                                    />
                                  ) : (
                                    uploadButton
                                  )}
                                </Upload>
                              </div>
                              <div className="col-lg-10 col-md-10 col-sm-12 mg-12">
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
                          <span id="span-underline">Partner Poll</span>
                          <form onSubmit={onSubmitForm} className="avatar-form">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Question:</p>
                                  </div>

                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <textarea
                                        name="facebook"
                                        className="form-control"
                                        value={editinfo.social.facebook}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Option1 *:</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        name="instagram"
                                        className="form-control"
                                        value={editinfo.social.instagram}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Option2 *:</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        name="twitter"
                                        className="form-control"
                                        value={editinfo.social.twitter}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Option3 :</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        name="tiktok"
                                        className="form-control"
                                        value={editinfo.social.tiktok}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Option4 :</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        name="snapchat"
                                        className="form-control"
                                        value={editinfo.social.snapchat}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
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
                                      Update Poll
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
                          <span id="span-underline">Social Links</span>
                          <form onSubmit={onSubmitForm} className="avatar-form">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Facebook:</p>
                                  </div>

                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          https://
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        name="facebook"
                                        className="form-control"
                                        value={editinfo.social.facebook}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Instagram:</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          https://
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        name="instagram"
                                        className="form-control"
                                        value={editinfo.social.instagram}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Twitter:</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          https://
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        name="twitter"
                                        className="form-control"
                                        value={editinfo.social.twitter}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>TikTok:</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          https://
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        name="tiktok"
                                        className="form-control"
                                        value={editinfo.social.tiktok}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Snapchat:</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          https://
                                        </span>
                                      </div>
                                      <input
                                        type="text"
                                        name="snapchat"
                                        className="form-control"
                                        value={editinfo.social.snapchat}
                                        onChange={onUpdateSocialField}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="pin-post-footer-section mg-12">
                                  <div className="pin-social-edit-title">
                                    <p>Website:</p>
                                  </div>
                                  <div className="pin-social-edit-input">
                                    <div className="input-group">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          https://
                                        </span>
                                      </div>
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
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 mg-12">
                                <div className="pin-post-footer-section">
                                  <div className="pin-edit-button-section">
                                    <button
                                      type="submit"
                                      className="btn-style-one red-light-color"
                                    >
                                      Update Links
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
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

const mapStateToProps = ({ profile }) => {
  return {
    editinfo: profile.editInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ongetInfo: () => dispatch(getInfo()),
  onupdateInfo: (info, cb) => dispatch(updateInfo(info, cb)),
  onuploadAvatar: (url, cb) => dispatch(uploadAvatar(url, cb)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
