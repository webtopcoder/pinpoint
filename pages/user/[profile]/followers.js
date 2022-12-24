import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileFollowers from "@/components/User/Profile/profileFollowers";
import Layout from '../../../layout';

const Followers = () => {
	return (
		<>
			<PageTitle page="Followers" />
			<div className="page-pin-area">
				<Profileheader />
				<div className="pin-profile-section">
					<Submenu />
					<ProfileFollowers />
				</div>
			</div>
		</>
	);
};

Followers.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Followers;