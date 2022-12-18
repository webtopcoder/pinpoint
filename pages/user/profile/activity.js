import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileActivity from "@/components/User/Profile/profileActivity";
import Layout from '../../../layout';

const Activity = () => {
	return (
		<>
			<PageTitle page="acitivty" />
			<div className="page-pin-area">
				<Profileheader />
				<div className="pin-profile-section">
					<Submenu />
					<ProfileActivity />
				</div>
			</div>
		</>
	);
};

Activity.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Activity;