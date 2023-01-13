import React from 'react'
import PageTitle from "@/components/Layout/PageTitle";
import BasicLayout from '../../../layout';
import LeftSidebar from "@/components/Layout/Partner/Sidebar";
import Setting from "@/components/Partner/Settings";
import { Layout } from 'antd';

const Settings = () => {

	return (
		<>
			<PageTitle page="Settings" />
			<div className="page-partner-area">
				<Layout
					style={{
						minHeight: '130vh',
						backgroundColor: '#272753'
					}}
				>
					<LeftSidebar />
					<Setting />
				</Layout>
			</div>
		</>
	)
}

Settings.getLayout = function getLayout(page) {
	return <BasicLayout>{page}</BasicLayout>
}
export default Settings;