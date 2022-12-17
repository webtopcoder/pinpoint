import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Header from "@/components/Layout/Header";
import ProflieEditor from "@/components/Profile/profileEdit";
import Footer from "@/components/Layout/Footer";

const Edit = () => {
	return (
		<>
			<PageTitle page="Shout outs" />
			<Header />
			<div className="page-pin-area">
				<div className="pin-profile-section">
					<ProflieEditor />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Edit;