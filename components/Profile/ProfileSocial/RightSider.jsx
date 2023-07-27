import { PlusOutlined } from "@ant-design/icons";
import {
    Space,
    Typography,
    Drawer,
    Progress,
    Image as Antimage,
    Divider,
    Button,
    Popover,
    Spin
} from "antd";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import useMedia from "@/hooks/useMedia";
import useNotify from "@/hooks/useNotify";
import { apiBaseUrl } from "@/utils/baseUrl";
import { formatDate } from "@/utils/date";
import { profileService } from "@/services/index";
import { useRouter } from "next/router";

const { Text } = Typography;
const imgurl = `${apiBaseUrl}/avatar/`;
const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

function RightSider({ myallPhotos, view_user_id, myLoader, role, loading, setLoading }) {
    const { notify } = useNotify();
    const router = useRouter();
    const isWebDevice = useMedia('(min-width:700px)');
    const [open, setOpen] = useState(false);
    const [flag, setflag] = useState(false);
    const [currentImage, setCurrentImage] = useState();

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
                            <div className="pin-post-header-section">
                                <div className="pin-about-section">
                                    <h4 className="comment-notes">
                                        <span id="email-notes">Social Photos</span>
                                        <p className="total-votes-count">
                                            {myallPhotos?.length}&nbsp;items
                                        </p>
                                    </h4>
                                    <div className="row">
                                        <Spin
                                            indicator={antIcon}
                                            spinning={loading}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}>
                                            <Antimage.PreviewGroup
                                                preview={{
                                                    countRender: (current) => setCurrentImage(myallPhotos[current - 1]),
                                                    onVisibleChange: async (visible, prevVisible) => {
                                                        !visible ? await onClose() : '';
                                                    }
                                                }}>
                                                {myallPhotos && (flag ?
                                                    myallPhotos : myallPhotos.slice(0, 40)).map((image, index) => (
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
                                        </Spin>
                                    </div>
                                    <div className="row">
                                        <Divider
                                            orientation="center" plain>
                                            <Button
                                                hidden={flag || myallPhotos.length < 40 ? true : false}
                                                onClick={async () => {
                                                    await setLoading(true);
                                                    await setflag(true);
                                                    await setLoading(false);
                                                }}
                                                type="link"
                                            >
                                                View All Photos
                                            </Button>
                                        </Divider>
                                    </div>
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
