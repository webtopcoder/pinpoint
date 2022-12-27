import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileFollowers from "@/components/User/Profile/profileFollowers";
import { getFollowers } from '@/redux/Profile/actions';
import Layout from '../../../layout';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'

const Followers = ({ ongetFollowers, followersInfo }) => {

	const router = useRouter();

	useEffect(() => {
		if (router.isReady) {
			const { profile } = router.query;
			ongetFollowers(profile)
		}
	}, [router.isReady]);
	return (
		<>
			<PageTitle page="Followers" />
			<div className="page-pin-area">
				<Profileheader />
				<div className="pin-profile-section">
					<Submenu />
					<ProfileFollowers followerInfo={followersInfo} />
				</div>
			</div>
		</>
	);
};

Followers.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

const mapStateToProps = ({ profile }) => {
	return {
		followersInfo: profile.followersInfo
	};
};


const mapDispatchToProps = dispatch => ({
	ongetFollowers: (data) => dispatch(getFollowers(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Followers);