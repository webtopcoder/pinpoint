import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileActivity from "@/components/User/Profile/profileActivity";
import { useRouter } from 'next/router'
import Layout from '../../../layout';

const Activity = () => {

	const router = useRouter();
	const user_id = router.query.profile;

	return (
		<>
			<PageTitle page="acitivty" />
			<div className="page-pin-area">
				<Profileheader user_info={user_id} />
				<div className="pin-profile-section">
					<Submenu />
					<ProfileActivity user_info={user_id} />
				</div>
			</div>
		</>
	);
};

Activity.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Activity;