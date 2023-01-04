import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { connect } from 'react-redux';
import { UploadOutlined, LikeOutlined } from '@ant-design/icons';
import { Image as Antimage, Divider, Button, Pagination, Upload, message, Form, Row, Col, Avatar, Typography, List, Space, Skeleton, Mentions } from 'antd';
import food from "@/public/images/landing/food.png";
import { useRouter } from 'next/router';
import { getActivity } from '@/redux/Profile/actions';
import { getmyFollowers } from '@/redux/User/actions';
import { postThink } from '@/redux/Profile/actions';
import { recommendPost } from '@/redux/Profile/actions';
import { getAllphotos } from '@/redux/Profile/actions';
import toast from "@/components/Toast";
import config from '@/utils/config';
import baseUrl from '@/utils/baseUrl';
const { Text, Link } = Typography;


const profileAllPhotos = ({ ongetAllphotos, ongetActivity, activityInfo, myallPhotos }) => {

    const IconText = ({ postID, text }) => (
        <Space>
            <Button type="primary" onClick={() => recommendPost(postID)} shape="circle" icon={<LikeOutlined />} />
            <Text> {text}</Text>
        </Space>
    );

    const [current, setCurrent] = useState(1);
    const [paginationInfo, setPageInfo] = useState({
        pagination: {
            current: 1,
            pageSize: 20,
        },
    });

    const onChange = (page, pageSize) => {
        console.log(pageSize);
        setCurrent(page);
    };

    const myLoader = ({ src }) => {
        return src
    }
    const imgurl = `http://${config.server}:${config.port}/post/`;
    const avatarurl = `http://${config.server}:${config.port}/avatar/`;
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const { profile } = router.query;
            ongetAllphotos(profile, paginationInfo);
            ongetActivity(profile, 1, '', res => {
                if (res.success) {

                }
                else notify("error", res.msg)
            });
        }
    }, [router.isReady]);

    const notify = useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const dismiss = useCallback(() => {
        toast.dismiss();
    }, []);

    return (
        <div className="blog-details-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-7 col-md-12">
                        <div className="avatar-area green-color">
                            <div className="avatar-respond">
                                <div className="avatar-form">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <Divider orientation="left">
                                                <span className="all-photos">
                                                    All Photosa
                                                </span>
                                            </Divider>
                                            <Antimage.PreviewGroup>
                                                {
                                                    myallPhotos && myallPhotos?.map((image, index) =>
                                                        <Antimage
                                                            loader={myLoader}
                                                            style={{
                                                                padding: '5px'
                                                            }}
                                                            width={'20%'}
                                                            src={imgurl + '/' + image} />
                                                    )
                                                }
                                            </Antimage.PreviewGroup>
                                            {/* <Pagination
                                                total={85}
                                                showTotal={(total) => `Total ${total} items`}
                                                defaultPageSize={20}
                                                onChange={onChange}
                                                current={paginationInfo.pagination.current}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5 col-md-12">
                        <div className="left-sidebar">
                            <aside className="widget-area">
                                <div className="avatar-area green-color">
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section" style={{
                                            display: 'block'
                                        }}>
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        About Me
                                                    </span>
                                                </h4>
                                                <div dangerouslySetInnerHTML={{ __html: activityInfo && activityInfo?.about }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        Photos
                                                    </span>
                                                </h4>
                                                <div className="row">
                                                    <Antimage.PreviewGroup>
                                                        {activityInfo?.image && activityInfo.image.map((image, index) =>
                                                            <Antimage loader={myLoader} width={'25%'} src={imgurl + '/' + image} />
                                                        )}
                                                    </Antimage.PreviewGroup>

                                                </div>
                                                <div className="row">
                                                    <Divider orientation="center" plain>
                                                        <Button type="link">View All Photos</Button>

                                                    </Divider>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="avatar-respond">
                                        <div className="pin-post-header-section">
                                            <div className="pin-about-section">
                                                <h4 className="comment-notes">
                                                    <span id="email-notes">
                                                        Social Links
                                                    </span>
                                                </h4>
                                                <ul className="social-links">
                                                    {
                                                        activityInfo?.social?.facebook ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.facebook}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-facebook-app-symbol"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.twitter ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.twitter}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-twitter"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.snapchat ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.snapchat}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-snapchat"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.instagram ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.instagram}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-instagram"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.viewInfo?.profile?.social?.tiktok ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.tiktok}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="flaticon-tik-tok"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                    {
                                                        activityInfo?.social?.website ?
                                                            <li>
                                                                <a
                                                                    href={activityInfo.social.website}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    <i className="bx bx-world"></i>
                                                                </a>
                                                            </li> : ''
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const mapStateToProps = ({ profile, user }) => {
    return {
        activityInfo: profile.activityInfo,
        myallPhotos: profile.allphotosInfo,
    };
};

const mapDispatchToProps = dispatch => ({
    onpostThink: (data, cb) => dispatch(postThink(data, cb)),
    onrecommendPost: (id, cb) => dispatch(recommendPost(id, cb)),
    ongetActivity: (data, count, search, cb) => dispatch(getActivity(data, count, search, cb)),
    ongetmyFollowers: () => dispatch(getmyFollowers()),
    ongetAllphotos: (id, pageInfo) => dispatch(getAllphotos(id, pageInfo)),
})
export default connect(mapStateToProps, mapDispatchToProps)(profileAllPhotos);