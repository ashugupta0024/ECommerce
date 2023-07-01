import React, { useState } from "react"; //UseState https://p.ip.fi/rWXR
import { Layout } from "../../components/Layout/Layout";
import axios from "axios"; //backEnd se link karne ke liye
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import "./AuthStyles.css";
import { useAuth } from "../../context/auth";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate(); //hook hai isliye use kiya hai
	const location = useLocation();
	const [auth, setAuth] = useAuth();

	//Form Function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API}/api/v1/auth/login`, //authRoute aur Server.js dekho udhar apan ne handle kiya hai ise
				{ email, password }
			);
			if (res.data.success) {
				toast.success(res.data.message);
				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				});
				localStorage.setItem("auth", JSON.stringify(res.data));
				navigate(location.state || "/"); //Login page par navigate kra denge agr koi pichla page tha particular toh udhar kara dega
			} else {
				toast.error(res.data.error);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<Layout title={"Login- SwiftBuy"}>
			<div className="form-container">
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							type="email"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Email"
							required
						/>
					</div>
					<div className="form-group">
						<input
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							type="password"
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Password"
							required
						/>
					</div>
					<div className="mb-3">
						<button
							type="submit"
							className="btn btn-primary"
							onClick={() => navigate("/forgot-Password")}
						>
							Forgot Password
						</button>
					</div>
					<button type="submit" className="btn btn-primary">
						Login
					</button>
				</form>
			</div>
		</Layout>
	);
};
