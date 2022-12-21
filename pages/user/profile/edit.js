import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import ProflieEditor from "@/components/User/Profile/profileEdit";
import Layout from '../../../layout';

const Edit = () => {
	return (
		<>
			<PageTitle page="Profile Edit" />
			<div className="page-pin-area">
				<div className="pin-profile-section">
					<ProflieEditor />
				</div>
			</div>
		</>
	);
};

Edit.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>
}

export default Edit;