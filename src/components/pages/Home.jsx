import React, { Component, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Grid } from "@mui/material";
import BatteryComponent from "../components/BatteryComponent";
import global from "../../resources/global.json";
import BalanceComponent from "../components/BalanceComponent";
import WeatherComponent from "../components/WeatherComponent";
import GridItem from "../components/GridItem";
import TransactionsComponent from "../components/TransactionsComponent";

export default function Home({ userRole }) {
	return (
		<div style={{ display: "flex" }}>
			<SideBar userRole={userRole} />
			<div
				style={{
					width: "100%",
					height: "100vh",
					paddingLeft: "20px",
					marginLeft: "250px",
				}}
			>
				<Grid container>
					<Grid
						item
						xs={6}
						style={{
							height: "100vh",
							display: "grid",
							margin: "10px 0",
						}}
					>
						<GridItem maxHeight="55vh" height="55vh">
							<TransactionsComponent bgColor={"cornflowerblue"} />
						</GridItem>
						<GridItem minHeight="40vh" height="40vh">
							<BatteryComponent userRole={userRole} />
						</GridItem>
					</Grid>

					<Grid container item xs={6} style={{ height: "100vh" }}>
						<Grid
							item
							xs={12}
							style={{
								height: "40%",
								display: "grid",
								placeItems: "center",
							}}
						>
							<GridItem backgroundColor={global.COLORS.ACCENT} height="38vh">
								<BalanceComponent userRole={userRole} />
							</GridItem>
						</Grid>
						<Grid
							item
							xs={12}
							style={{
								height: "60%",
								display: "grid",
								placeItems: "center",
							}}
						>
							<GridItem backgroundColor={global.COLORS.BLUE} height="55vh">
								<WeatherComponent userRole={userRole} />
							</GridItem>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
