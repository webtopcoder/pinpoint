import React, { useEffect } from "react";
import Image from "next/image";
import { connect } from 'react-redux';
import { getHeader } from '@/redux/Profile/actions';
import { postFollower } from '@/redux/Profile/actions';
import { useRouter } from 'next/router'
import config from '@/utils/config';

const Header = ({ ongetHeader, headerInfo, onpostFollower }) => {

    const myLoader = ({ src }) => {
        return src
    }
    const avatarurl = `http://${config.server}:${config.port}/avatar`;
    const router = useRouter();
    const user_id = '';
    if (typeof window !== 'undefined') {
        user_id = sessionStorage.getItem('user_id')
    }
    
    const view_user_id = router.query.profile;

    const follow = () => {
        onpostFollower(view_user_id, res => {
            if (res.success) {
                ongetHeader(view_user_id)

            }
            else notify("error", res.msg)
        });
    };

    useEffect(() => {
        if (router.isReady) {
            const { profile } = router.query;
            ongetHeader(profile)
        }
    }, [router.isReady]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="avatar-area green-color">
                        <div className="avatar-body">
                            <div className="avatar-author vcard">
                                <div className="avatar">
                                    <Image
                                        src={avatarurl + '/' + headerInfo?.profile?.avatar}
                                        loader={myLoader}
                                        unoptimized
                                        layout={'fill'}
                                        alt="user"
                                        className="avatar-radius"
                                    />
                                </div>
                                {headerInfo && <b className="fn">{headerInfo?.profile?.fullname}</b>}
                            </div>
                            <div className="avatar-metadata">
                                <span>
                                    @{headerInfo && <b className="fn">{headerInfo?.profile?.username}</b>}
                                </span>
                            </div>
                            {user_id !== view_user_id ?
                                <>
                                    <div className="avatar-content">
                                        <button type="submit" className="btn-style-one avatar-message-button">
                                            Message<i className="bx bx-envelope avatar-icon"></i>
                                        </button>
                                    </div>
                                    <div className="avatar-content mg-12">
                                        {headerInfo?.profile?.is_follow ?
                                            <button onClick={follow} className="btn-style-one avatar-message-button">
                                                Unfollow<i className="bx bx-user-minus avatar-icon"></i>
                                            </button>
                                            :
                                            <button onClick={follow} className="btn-style-one avatar-message-button">
                                                Follow<i className="bx bx-user-plus avatar-icon"></i>
                                            </button>
                                        }

                                    </div>
                                </> : ''
                            }

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row justify-content-center">
                        <div className="col-md-4"></div>
                        <div className="col-md-3">
                            <div
                                data-aos-duration="1200"
                            >
                                <div className="avatar-rightside-box">
                                    <h4>Favorites</h4>
                                    <h1>
                                        {headerInfo && <b className="fn">{headerInfo?.profile?.favorites}</b>}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div
                                data-aos-duration="1200"
                            >
                                <div className="avatar-rightside-box">
                                    <h4>Followers</h4>
                                    <h1>
                                        {headerInfo && <b className="fn">{headerInfo?.profile?.followers}</b>}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ profile }) => {
    return {
        headerInfo: profile.headerInfo
    };
};


const mapDispatchToProps = dispatch => ({
    ongetHeader: (data) => dispatch(getHeader(data)),
    onpostFollower: (id, cb) => dispatch(postFollower(id, cb))
})
export default connect(mapStateToProps, mapDispatchToProps)(Header);