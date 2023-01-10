import React, { useEffect } from "react";
import PageTitle from "@/components/Layout/PageTitle";
import PartnerFollowers from "@/components/Partner/Profile/profileFollowers";
import { getFollowers } from '@/redux/Profile/actions';
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import BasicLayout from '../../../layout';
import { connect } from 'react-redux';
import { Layout } from 'antd';

const Followers = ({ followersInfo }) => {

	return (
		<>
			<PageTitle page="Profile Followers" />
			<div className="page-partner-area">
				<Layout
					style={{
						minHeight: '130vh',
					}}
				>
					<LeftSidebar />
					<PartnerFollowers followerInfo={followersInfo} />
				</Layout>
			</div>
		</>

	);
};

Followers.getLayout = function getLayout(page) {
	return <BasicLayout>{page}</BasicLayout>
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