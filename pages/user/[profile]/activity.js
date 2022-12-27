import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileActivity from "@/components/User/Profile/profileActivity";
import { getActivity } from '@/redux/Profile/actions';
import { useRouter } from 'next/router'
import Layout from '../../../layout';
import { connect } from 'react-redux';


const Activity = ({ ongetActivity, activityInfo }) => {

	const router = useRouter();
	useEffect(() => {
		if (router.isReady) {
			const { profile } = router.query;
			ongetActivity(profile)
		}
	}, [router.isReady]);

	return (
		<>
			<PageTitle page="acitivty" />
			<div className="page-pin-area">
				<Profileheader />
				<div className="pin-profile-section">
					<Submenu />
					<ProfileActivity activityInfo={activityInfo} />
				</div>
			</div>
		</>
	);
};

Activity.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

const mapStateToProps = ({ profile }) => {
	return {
		activityInfo: profile.activityInfo
	};
};


const mapDispatchToProps = dispatch => ({
	ongetActivity: (data) => dispatch(getActivity(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Activity);