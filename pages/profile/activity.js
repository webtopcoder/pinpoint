import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Header from "@/components/Layout/Header";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileActivity from "@/components/Profile/profileActivity";
import Footer from "@/components/Layout/Footer";

const Activity = () => {
	return (
		<>
			<PageTitle page="acitivty" />
			<Header />
			<div className="page-pin-area">
				<Profileheader />
				<div className="pin-profile-section">
					<Submenu />
					<ProfileActivity />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Activity;