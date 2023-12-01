import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerLocation from "@/components/Common/IndividualLocation";
import Layout from "../../../../layout";
import { useRouter } from "next/router";
import { Breadcrumb } from 'antd';
import { profileService } from "@/services/index";

const Location = () => {
    const router = useRouter();
    const LocationName = router.query.name;
    const viewUserId = router.query.profile;
    const formattedLocationName = LocationName.replace(/-/g, ' ');
    const [headerInfo, setHeaderInfo] = useState(null);

    const getHeader = async () => {
        try {
            const result = await profileService.getHeader(viewUserId);
            console.log(result)
            setHeaderInfo(result);
        } catch (error) {
            // Handle error here
            console.error("Error fetching header:", error);
        }
    };

    useEffect(() => {
        if (viewUserId) {
            getHeader();
        }
    }, [viewUserId]);

    return (
        <>
            <PageTitle page="PROFILE - LOCATION" />
            <div className="page-profile-area">
            </div>
            <div className="profile-authentication-area  bg-f8fbff">
                <Breadcrumb
                    style={{
                        padding: '10px 20px 10px 20px',
                        background: '#f7f7f7'
                    }}
                    separator=">"
                    items={[
                        {
                            title:<Link href={`/`}>Home</Link>,
                        },
                        {
                            title: <Link href={`/profile/${viewUserId}`}>{`@${headerInfo?.profile?.username}`}</Link>,
                        },
                        {
                            title: formattedLocationName,
                        },
                    ]}
                />
                <PartnerLocation locationName={formattedLocationName} />
            </div>
        </>
    );
};


Location.requireAuth = true;
Location.getLayout = function getLayout(page) {
    return <Layout whiteMenu={true}>{page}</Layout>;
};

const mapStateToProps = ({ user }) => {
    return {
        user_id: user.user_id,
        userName: user.username,
        userRole: user.role,
    };
};

export default connect(mapStateToProps)(Location);