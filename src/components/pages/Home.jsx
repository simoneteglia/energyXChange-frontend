import React, { Component, useEffect, useState } from "react";

export default function Home({ numberInput }) {
	const [number, setNumber] = useState(numberInput);

	useEffect(() => {
		console.log("number has changed");
	}, []);

	return (
		<>
			<h1>{number}</h1>
			<button onClick={() => setNumber(number + 1)}>increase</button>
		</>
	);
}
