import {
    Avatar,
    Tooltip
} from "antd";
import React, { useEffect, useState } from "react";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import { profileService } from "@/services/index";
import useMedia from "@/hooks/useMedia";
import { useRouter } from "next/router";
import styles from "./social.module.css";

function FollowerList({ view_user_id }) {
    const { notify } = useNotify();
    const isWebDevice = useMedia('(min-width:700px)');
    const [data, setData] = useState([]);
    const avatarurl = `${apiBaseUrl}/avatar/`;
    const router = useRouter();

    useEffect(() => {
        profileService.getmyFollowers(view_user_id, {}, {})
            .then((res) => {
                if (res.success) {
                    setData(res.data.results?.filter(obj => obj.status === "active"));
                } else notify("error", "Something went wrong");
            })
            .catch((error) => {
                notify(
                    "error",
                    error?.response?.data?.message || "Something went wrong"
                );
                return;
            });

    }, []);

    return (
        <div className="avatar-area green-color">
            <div className="avatar-respond">
                <div className="pin-post-header-section">
                    <div className="pin-about-section">
                        <h4 className="comment-notes">
                            <span id="email-notes">  My Followers </span>
                            <p className={styles.followers_count}>
                                {data?.length} memebers
                            </p>
                        </h4>
                        <div className="ql-snow">
                            <Avatar.Group
                                size="large"
                            >
                                {data?.map((item) =>
                                    <Tooltip title={item?.follower?.name} placement="top">
                                        <a
                                            onClick={() => router.push(`/profile/${item?.follower?._id}/activity`)}
                                        >
                                            <Avatar
                                                src={avatarurl + "/" + item?.follower?.profile?.avatar.filepath}
                                            >
                                            </Avatar>
                                        </a>
                                    </Tooltip>

                                )}
                            </Avatar.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FollowerList;
