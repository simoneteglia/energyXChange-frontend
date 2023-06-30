import React, { Component, useEffect } from "react";

export default function LogoutComponent() {
	useEffect(() => {
		localStorage.removeItem("token");
		window.location.href = "/";
	}, []);

	return <div>Loggin out...</div>;
}
