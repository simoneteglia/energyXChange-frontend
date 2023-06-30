import React, { Component } from "react";
import SideBar from "../components/SideBar";
import TransactionsComponent from "../components/TransactionsComponent";

export default function Transactions({ userRole }) {
	return (
		<div style={{ display: "flex" }}>
			<SideBar userRole={userRole} />
			<div
				style={{
					width: "100%",
					height: "100vh",
					paddingLeft: "20px",
					paddingRight: "20px",
					overflow: "scroll",
					marginLeft: "250px",
				}}
			>
				<h1 style={{ fontSize: "50px", marginBottom: "100px" }}>
					Your recent transactions
				</h1>
				<div style={{ width: "100%" }}>
					<TransactionsComponent />
				</div>
			</div>
		</div>
	);
}
