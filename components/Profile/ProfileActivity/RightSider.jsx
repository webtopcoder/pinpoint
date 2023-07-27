import { PlusOutlined } from "@ant-design/icons";
import {
    Space,
    Typography,
    Drawer,
    Progress,
    Image as Antimage,
    Divider,
    Button,
    Popover
} from "antd";
import React, { useEffect, useState } from "react";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import { formatDate } from "@/utils/date";
import { profileService } from "@/services/index";
import { useRouter } from "next/router";

const { Text } = Typography;
const imgurl = `${apiBaseUrl}/avatar/`;

function RightSider({ activityInfo, myallPhotos, view_user_id, myLoader, role }) {
    const { notify } = useNotify();
    const router = useRouter();
    const isWebDevice = useMedia('(min-width:700px)');
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState();
    const [pollstatus, setPollstatus] = useState(false);
    const [myprofilePoll, setProfilePoll] = useState([]);
    const totalPollVoteCount = myprofilePoll.votes?.reduce(
        (a, vote) => a + vote,
        0
    );
    const partnerPollQuestion = myprofilePoll.question;
    const partnerPollOptions = myprofilePoll.options?.reduce(
        (acc, option, index) => {
            const content = option;
            const voteCount = myprofilePoll.votes[index];
            const votePercentage = ((voteCount / totalPollVoteCount) * 100).toFixed(
                0
            );
            acc.push({
                content,
                votePercentage,
            });

            return acc;
        },
        []
    );

    useEffect(() => {
        profileService.getProfilePoll(view_user_id).then((res) => {
            setProfilePoll(res);
            setPollstatus(true);
        }).catch((error) => {
            console.log(error?.response?.data?.message)
            return;
        });
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="col-xl-4 col-lg-5 col-md-12">
            <div className="left-sidebar">
                <aside className="widget-area">
                    <div className="avatar-area green-color">
                        <div className="avatar-respond">
                            <div
                                className="pin-post-header-section"
                                style={{
                                    display: "block",
                                }}>
                                <div className="pin-about-section">
                                    <h4 className="comment-notes">
                                        <span id="email-notes">About {role === "partner" ? 'Us' : 'Me'} </span>
                                    </h4>
                                    <div className="ql-snow">
                                        <div className="ql-editor"
                                            dangerouslySetInnerHTML={{ __html: activityInfo && activityInfo?.about, }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {pollstatus && (
                            <div className="avatar-respond">
                                <div
                                    className="pin-post-header-section"
                                    style={{
                                        display: "block",
                                    }}
                                >
                                    <div className="pin-about-section">
                                        <h4 className="comment-notes">
                                            <span id="email-notes">Partner Poll</span>
                                            <p className="total-votes-count">
                                                {totalPollVoteCount}&nbsp;votes
                                            </p>
                                        </h4>
                                        <p className="partner-poll-question">
                                            {partnerPollQuestion}
                                        </p>
                                        <div className="partner-poll-options">
                                            {partnerPollOptions?.map((item, index) => {
                                                return (
                                                    <div key={index}>
                                                        <Space.Compact block size="small">
                                                            <Text
                                                                style={{
                                                                    width: "calc(100% - 200px)",
                                                                }}
                                                            >
                                                                {" "}
                                                                {item.content}
                                                            </Text>
                                                            <Button
                                                                onClick={async () => {
                                                                    await profileService.votePoll(view_user_id, index)
                                                                        .then((res) => {
                                                                            setProfilePoll(res);
                                                                            notify(
                                                                                "success",
                                                                                "Successfully voted"
                                                                            );
                                                                        })
                                                                        .catch((error) => {
                                                                            notify(
                                                                                "error",
                                                                                error?.response?.data?.message || "Something went wrong"
                                                                            );
                                                                            return;
                                                                        });
                                                                }}
                                                                icon={<PlusOutlined />}
                                                            />
                                                        </Space.Compact>
                                                        <Progress
                                                            percent={item.votePercentage}
                                                            showInfo={false}
                                                            strokeColor="#1677FF"
                                                            trailColor="black"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="avatar-respond">
                            <div className="pin-post-header-section">
                                <div className="pin-about-section">
                                    <h4 className="comment-notes">
                                        <span id="email-notes">Photos</span>
                                        <p className="total-votes-count">
                                            {myallPhotos?.length}&nbsp;items
                                        </p>
                                    </h4>
                                    <div className="row">
                                        <Antimage.PreviewGroup
                                            preview={{
                                                countRender: (current) => setCurrentImage(myallPhotos[current - 1]),
                                                onVisibleChange: async (visible, prevVisible) => {
                                                    !visible ? await onClose() : '';
                                                }
                                            }}>
                                            {myallPhotos &&
                                                myallPhotos.slice(0, 8).map((image, index) => (
                                                    image.status === "active" ?
                                                        (
                                                            isWebDevice ?
                                                                <Popover content={image?.content} title={image?.type + ", " + formatDate(image?.createdAt)} trigger="hover" >
                                                                    <Antimage
                                                                        loader={myLoader}
                                                                        style={{
                                                                            padding: "5px",
                                                                        }}
                                                                        width={"25%"}
                                                                        src={imgurl + image?.filepath}
                                                                        key={index}
                                                                        alt="ewrwerwerwe"
                                                                    />
                                                                </Popover> :
                                                                <Antimage
                                                                    onClick={() => {
                                                                        !isWebDevice ? showDrawer(true) : ''
                                                                    }}
                                                                    loader={myLoader}
                                                                    style={{
                                                                        padding: "5px",
                                                                    }}
                                                                    width={"25%"}
                                                                    src={imgurl + image?.filepath}
                                                                    key={index}
                                                                    alt="ewrwerwerwe"
                                                                />
                                                        )
                                                        : ''
                                                ))}
                                        </Antimage.PreviewGroup>
                                    </div>
                                    <div className="row">
                                        <Divider orientation="center" plain>
                                            <Button
                                                onClick={() => router.push(`/profile/${view_user_id}/allphotos`)}
                                                type="link"
                                            >
                                                View All Photos
                                            </Button>
                                        </Divider>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="avatar-respond">
                            <div className="pin-post-header-section">
                                <div className="pin-about-section">
                                    <h4 className="comment-notes">
                                        <span id="email-notes">Social Links</span>
                                    </h4>
                                    <ul className="social-links">
                                        {activityInfo?.social?.facebook ? (
                                            <li>
                                                <a
                                                    href={'https://' + activityInfo.social.facebook}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="flaticon-facebook-app-symbol"></i>
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {activityInfo?.social?.twitter ? (
                                            <li>
                                                <a
                                                    href={'https://' + activityInfo.social.twitter}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="flaticon-twitter"></i>
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {activityInfo?.social?.snapchat ? (
                                            <li>
                                                <a
                                                    href={'https://' + activityInfo.social.snapchat}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="flaticon-snapchat"></i>
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {activityInfo?.social?.instagram ? (
                                            <li>
                                                <a
                                                    href={'https://' + activityInfo.social.instagram}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="flaticon-instagram"></i>
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {activityInfo?.viewInfo?.profile?.social?.tiktok ? (
                                            <li>
                                                <a
                                                    href={'https://' + activityInfo.social.tiktok}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="flaticon-tik-tok"></i>
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {activityInfo?.social?.website ? (
                                            <li>
                                                <a
                                                    href={'https://' + activityInfo.social.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="bx bx-world"></i>
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Drawer
                            title={currentImage?.type + ", " + formatDate(currentImage?.createdAt)}
                            placement="bottom"
                            width={500}
                            height={200}
                            closable={false}
                            open={open}
                            zIndex={10000}
                            mask={false}
                            maskClosable={false}
                            extra={
                                null
                            }
                        >
                            <p style={{
                                color: "#000000",
                            }}>{currentImage?.content}</p>
                        </Drawer>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default RightSider;
