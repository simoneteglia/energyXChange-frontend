import React, { useState, useEffect } from "react";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import LogoutComponent from "./components/components/LogoutComponent";
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Protected from "./components/components/Protected";
import Transactions from "./components/pages/Transactions";
import jwt_decode from "jwt-decode";
import axios from "axios";
import global from "./resources/global.json";

function App() {
	const [isSignedIn, setIsSignedIn] = useState(true);
	const [userRole, setUserRole] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token && token !== "null") {
			setIsSignedIn(true);
			var decoded = jwt_decode(token);
			let user_mail = jwt_decode(token).sub;
			axios
				.get(
					global.CONNECTION.HEROKU_ENDPOINT +
						"api/v1/user/sellerOrBuyer/" +
						user_mail
				)
				.then((res) => {
					console.log(res.data);
					setUserRole(res.data);
				})
				.catch((err) => console.log(err));
		} else {
			setIsSignedIn(false);
		}
	}, []);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Navigate to="/dashboard" replace />,
		},
		{
			path: "/dashboard",
			element: (
				<Protected isSignedIn={isSignedIn}>
					<Home userRole={userRole} />
				</Protected>
			),
		},
		{
			path: "/login",
			element: <Login isSignedIn={isSignedIn} />,
		},
		{
			path: "/register",
			element: <Register />,
		},
		{
			path: "/profile",
			element: (
				<Protected isSignedIn={isSignedIn}>
					<Profile userRole={userRole} />
				</Protected>
			),
		},
		{
			path: "/transactions",
			element: (
				<Protected isSignedIn={isSignedIn}>
					<Transactions userRole={userRole} />
				</Protected>
			),
		},
		{
			path: "/logout",
			element: <LogoutComponent />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
