import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import axios from "axios";

import global from "../../resources/global.json";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" href="">
				EnergyXChange
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const theme = createTheme({
	palette: {
		primary: {
			main: "rgb(4, 114, 77)",
		},
	},
});

export default function Register() {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
			name: `${data.get("firstName")} ${data.get("lastName")}`,
			address: data.get("address"),
			postalCode: data.get("postal-code"),
			category: data.get("category"),
		});

		const userData = {
			email: data.get("email"),
			password: data.get("password"),
			name: `${data.get("firstName")} ${data.get("lastName")}`,
			address: data.get("address"),
			postalCode: data.get("postal-code"),
			status: 1,
		};

		axios
			.post(
				global.CONNECTION.HEROKU_ENDPOINT +
					"api/v1/auth/register/" +
					data.get("category"),
				userData
			)
			.then((res) => {
				console.log(res);
				const token = res.data.token;
				//insert token into local storage
				// go to dashboard
				navigate("/dashboard");
			})
			.catch((err) => console.error(err));
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									name="address"
									label="Address"
									type="address"
									id="address"
									autoComplete="new-address"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									name="postal-code"
									label="Postal-code"
									type="postal-code"
									id="postal-code"
									autoComplete="new-postal-code"
								/>
							</Grid>
							<Grid item xs={12}>
								<RadioGroup name="category" defaultValue="first">
									<FormControlLabel
										value="seller"
										label="I want to sell energy"
										control={<Radio />}
									/>
									<FormControlLabel
										value="buyer"
										label="I want to buy energy"
										control={<Radio />}
									/>
								</RadioGroup>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
