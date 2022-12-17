import React from "react";
import PageTitle from "@/components/Layout/PageTitle";
import Header from "@/components/Layout/Header";
import Profileheader from "@/components/Layout/Profile/Header";
import Submenu from "@/components/Layout/Profile/Submenu";
import ProfileShoutout from "@/components/Profile/profileShout";
import Footer from "@/components/Layout/Footer";

const Shout = () => {
	return (
		<>
			<PageTitle page="Shout outs" />
			<Header />
			<div className="page-pin-area">
				<Profileheader />
				<div className="pin-profile-section">
					<Submenu />
					<ProfileShoutout />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Shout;