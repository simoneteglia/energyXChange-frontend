import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import jwt_decode from "jwt-decode";

import global from "../../resources/global.json";

function createData(date, energy, seller) {
	return { date, energy, seller };
}

const rows = [
	createData("10 feb", 159, "001"),
	createData("12 feb", 237, "001"),
	createData("15 mar", 262, "002"),
	createData("16 mar", 305, "002"),
	createData("22 mar", 356, "001"),
];

export default function TransactionsComponent({ bgColor }) {
	const [transactions, setTransactions] = useState([]);
	const [sales, setSales] = useState([]);
	const [purchases, setPurchases] = useState([]);
	const [userRole, setUserRole] = useState("seller");
	const [isLoading, setIsLoading] = useState(true);

	function getTransactions() {
		axios
			.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/transactions/getAll")
			.then((res) => {
				setTransactions(res.data.reverse().slice(0, 500));
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getTransactions();
		setInterval(() => {
			getTransactions();
		}, 5000);
	}, []);

	useEffect(() => {
		console.log("load again");
		const token = localStorage.getItem("token");
		let user_mail = jwt_decode(token).sub;

		axios
			.get(
				global.CONNECTION.HEROKU_ENDPOINT +
					"api/v1/user/sellerOrBuyer/" +
					user_mail
			)
			.then((res) => {
				setUserRole(res.data);
			})
			.catch((err) => console.log(err));

		// Get id of user from mail
		axios
			.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/user/" + user_mail)
			.then((res) => {
				console.log(transactions);
				let sales = [];
				//GET SALES
				transactions.forEach((transaction) => {
					if (transaction.sellerID === res.data) {
						sales.push(transaction);
					}
				});
				setSales(sales.slice(0, 15));

				let purchases = [];
				//GET PURCHASES
				transactions.forEach((transaction) => {
					if (transaction.buyerID === res.data) {
						purchases.push(transaction);
					}
				});
				setPurchases(purchases.slice(0, 15));
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [transactions]);

	let textStyle = {
		color: bgColor ? "white" : "black",
		fontSize: "20px",
		fontWeight: bgColor ? "bold" : "initial",
	};

	let dataToDisplay = userRole === "Seller" ? sales : purchases;

	const url = window.location.href;
	const parsedURL = new URL(url);
	const pathname = parsedURL.pathname;
	const extractedValue = pathname.split("/")[1];

	if (extractedValue !== "transactions") {
		dataToDisplay = dataToDisplay.slice(0, 5);
	}

	if (isLoading && extractedValue === "transactions") {
		return (
			<>
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
			<TableContainer
				style={{
					height: "100%",
					backgroundColor: bgColor,
				}}
			>
				<h1
					style={{
						marginLeft: extractedValue === "transactions" ? "0px" : "20px",
						color: extractedValue === "transactions" ? "black" : "white",
					}}
				>
					Your last {userRole === "Seller" ? "Sales" : "Purchases"}
				</h1>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={textStyle}>Id</TableCell>
							<TableCell style={textStyle} align="right">
								Energy&nbsp;(kW/h)
							</TableCell>
							<TableCell style={textStyle} align="right">
								{userRole === "Seller" ? "Buyer" : "Seller"}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{dataToDisplay.map((sale) => (
							<TableRow
								key={sale.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row" style={textStyle}>
									{sale.id}
								</TableCell>
								<TableCell style={textStyle} align="right">
									{sale.amount}
								</TableCell>
								<TableCell style={textStyle} align="right">
									{userRole === "Seller" ? sale.buyerID : sale.sellerID}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}
