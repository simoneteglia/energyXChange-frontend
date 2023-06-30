import React, { Component } from "react";
import {
	faUser,
	faChartLine,
	faWallet,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";

import global from "../../resources/global.json";
import "../../resources/styles/sidebar-style.css";

export default function SideBar({ userRole }) {
	return (
		<>
			<nav
				style={{
					width: "250px",
					height: "100vh",
					backgroundColor: global.COLORS.WHITE,
					display: "flex",
					flexDirection: "column",
					paddingLeft: "10px",
					position: "fixed",
				}}
			>
				<h1
					style={{ fontSize: "25px", marginBottom: "200px", marginTop: "50px" }}
				>
					<span style={{ textTransform: "uppercase" }}> {userRole} </span>
					CONTROL PANEL
				</h1>
				<div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
					<SidebarLink name={"Dashboard"} route={"/"} icon={faChartLine} />
					<SidebarLink
						name={"Transactions"}
						route={"/transactions"}
						icon={faWallet}
					/>
					<SidebarLink name={"Profile"} route={"/profile"} icon={faUser} />
					<SidebarLink
						name={"Logout"}
						route={"/logout"}
						icon={faRightFromBracket}
					/>
				</div>
			</nav>
		</>
	);
}
