import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import global from "../../resources/global.json";

const GENERAL_COST = 0.22;
const EXC_COST = 0.15;

export default function BalanceComponent({ userRole }) {
	const [saved, setSaved] = useState(0);

	function getBalance() {
		const token = localStorage.getItem("token");
		let user_mail = jwt_decode(token).sub;
		axios
			.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/user/" + user_mail)
			.then((res) => {
				const userId = res.data;
				axios
					.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/transactions/getAll")
					.then((res) => {
						let transactions = res.data;

						if (userRole === "Buyer") {
							//ENERGY BOUGHT
							let filtered = transactions.filter(
								(elem) => elem.buyerID === userId
							);
							let energyBought = 0;
							filtered.map((elem) => {
								energyBought += elem.amount;
							});

							setSaved(energyBought * (GENERAL_COST - EXC_COST));
						} else {
							let filtered = transactions.filter(
								(elem) => elem.sellerID === userId
							);
							let energySold = 0;
							filtered.map((elem) => {
								energySold += elem.amount;
							});
							setSaved(energySold * EXC_COST);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		if (!userRole) return;
		getBalance();
		setInterval(() => {
			getBalance();
		}, 5000);
	}, [userRole]);

	return (
		<div
			style={{
				width: "80%",
				display: "flex",
				justifyContent: "center",
				aligntems: "center",
				position: "relative",
			}}
		>
			<p style={{ fontSize: "60px", fontWeight: "bold" }}>
				{Math.round(saved, 2)}€
			</p>
			<p style={{ position: "absolute", left: 0, top: -15, fontSize: "20px" }}>
				Using EnergyXChange you've {userRole === "Buyer" ? "saved" : "earned"}:
			</p>
		</div>
	);
}
