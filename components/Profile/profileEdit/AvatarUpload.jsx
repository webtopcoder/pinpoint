import React, { useState } from "react";
import { connect } from "react-redux";
import { uploadAvatar } from "@/redux/User/actions";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";

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
const avatarurl = `${apiBaseUrl}/avatar/`;

const upload = ({
    editInfo,
    onuploadAvatar,
}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    async function handleChange(info) {
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
                res.success
                    ? notify("success", "Profile Avatar successfully updated")
                    : notify("error", "Profile Avatar update failed");
            }).catch((error) => {
                error?.response?.data?.message || "Something went wrong"
            });

            getBase64(info.file.originFileObj, (url) => {
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

    const { notify } = useNotify();

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            method="get"
            onChange={handleChange}
        >
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    height={100}
                    width={100}
                />
            ) : editInfo?.avatar ? (
                <img
                    src={avatarurl + editInfo?.avatar?.filepath}
                    alt="avatar"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    height={100}
                    width={100}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

const mapStateToProps = ({ user }) => {
    return {
        userRole: user.role,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onuploadAvatar: (url, cb) => dispatch(uploadAvatar(url, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(upload);
