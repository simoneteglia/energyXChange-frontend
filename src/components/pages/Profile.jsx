import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import jwt_decode from "jwt-decode";
import global from "../../resources/global.json";

export default function Profile({ userRole }) {
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [solarPanels, setSolarPanels] = useState(0);
	const [name, setName] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		let user_mail = jwt_decode(token).sub;
		console.log("User mail: ", user_mail);

		if (userRole == "Seller") {
			axios
				.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/user/" + user_mail)
				.then((res) => {
					axios
						.get(
							global.CONNECTION.HEROKU_ENDPOINT + "api/v1/seller/" + res.data
						)
						.then((res) => {
							console.log("SELLER = ", res.data);
							setEmail(res.data.email);
							setAddress(res.data.address);
							setSolarPanels(res.data.solarPanelsOwned);
							setName(res.data.name);
							setIsLoading(false);
						})
						.catch((err) => console.log(err));
				});
		} else if (userRole == "Buyer") {
			axios
				.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/user/" + user_mail)
				.then((res) => {
					console.log("USER ID = ", res.data);
					axios
						.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/buyer/" + res.data)
						.then((res) => {
							console.log("BUYER = ", res.data);
							setEmail(res.data.email);
							setAddress(res.data.address);
							setSolarPanels(res.data.solarPanelsOwned);
							setName(res.data.name);
							setIsLoading(false);
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		}
	});

	if (isLoading) {
		return (
			<>
				<SideBar userRole={userRole} />
				<div
					style={{
						position: "fixed",
						left: "60%",
						top: "40%",
					}}
				>
					<div className="loading">
						<svg width="64px" height="48px">
							<polyline
								points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
								id="back"
							></polyline>
							<polyline
								points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
								id="front"
							></polyline>
						</svg>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<>
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
						<h1 style={{ fontSize: "50px", marginBottom: "50px" }}>
							Welcome back, {name}!
						</h1>
						<FormControl style={{ marginBottom: "40px" }}>
							<FormLabel>
								Do you want to {userRole === "Seller" ? "sell" : "buy"} ?
							</FormLabel>
							<RadioGroup row name="row-radio-buttons-group" defaultValue="On">
								<FormControlLabel value="On" control={<Radio />} label="On" />
								<FormControlLabel value="Off" control={<Radio />} label="Off" />
							</RadioGroup>
						</FormControl>
						<section>
							<div
								style={{
									display: "flex",
									gap: "20px",
									marginBottom: "50px",
								}}
							>
								<TextField
									id="outlined-read-only-input"
									label="Password"
									defaultValue="*********"
									InputProps={{
										readOnly: true,
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="Email"
									value={email}
									InputProps={{
										readOnly: true,
									}}
								/>
							</div>
							{userRole == "Seller" ? (
								<div
									style={{
										display: "flex",
										gap: "20px",
										marginBottom: "50px",
									}}
								>
									<TextField
										id="outlined-read-only-input"
										label="Number of solar panels"
										value={solarPanels}
									/>
									<Button variant="contained" color="success">
										Update your number of panels
									</Button>
								</div>
							) : (
								<></>
							)}

							<div
								style={{
									display: "flex",
									gap: "20px",
									marginBottom: "50px",
								}}
							>
								<TextField
									id="outlined-read-only-input"
									label="Address"
									InputProps={{
										readOnly: true,
									}}
									value={address}
								/>
								<TextField
									id="outlined-read-only-input"
									label="State"
									defaultValue="Italy"
									InputProps={{
										readOnly: true,
									}}
								/>
							</div>
							<div
								style={{
									display: "flex",
									gap: "20px",
									marginBottom: "50px",
								}}
							>
								<TextField
									id="outlined-read-only-input"
									label="City"
									defaultValue="Rome"
									InputProps={{
										readOnly: true,
									}}
								/>
								<TextField
									id="outlined-read-only-input"
									label="ZipCode"
									defaultValue="00142"
									InputProps={{
										readOnly: true,
									}}
								/>
							</div>
						</section>
					</div>
				</div>
			</>
		);
	}
}
