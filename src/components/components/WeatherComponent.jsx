import React, { useEffect, useState } from "react";
import axios from "axios";
import global from "../../resources/global.json";

export default function WeatherComponent() {
	const [condition, setCondition] = useState("Sunny");
	const [temperature, setTemperature] = useState(0);

	function getWeather() {
		axios
			.get(global.CONNECTION.HEROKU_ENDPOINT + "api/v1/weather")
			.then((res) => {
				setCondition(res.data.condition);
				setTemperature(res.data.temperature);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	//Fetch weather data
	useEffect(() => {
		getWeather();
		setInterval(() => {
			getWeather();
		}, 5000);
	}, []);

	return (
		<>
			<img
				src={
					condition === "Sunny"
						? "/images/sun.png"
						: condition === "Rainy"
						? "/images/rainy.webp"
						: "/images/cloud.png"
				}
				width={"220px"}
			/>
			<p style={{ fontSize: "80px", color: "#fff" }}>{temperature}°F</p>
			<h1 style={{ color: "white", position: "absolute", top: 0, left: 20 }}>
				Weather in your area
			</h1>
		</>
	);
}
