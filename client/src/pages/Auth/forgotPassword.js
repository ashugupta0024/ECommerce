import React, { useState } from "react"; //UseState https://p.ip.fi/rWXR
import { Layout } from "../../components/Layout/Layout";
import axios from "axios"; //backEnd se link karne ke liye
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import "./AuthStyles.css";
import "../../styles/AuthStyles.css";

export const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [answer, setAnswer] = useState("");
	const navigate = useNavigate(); //hook hai isliye use kiya hai

	//Form Function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, //authRoute aur Server.js dekho udhar apan ne handle kiya hai ise
				{ email, newPassword, answer }
			);
			if (res.data.success) {
				toast.success(res.data.message);
				navigate("/login"); //Login page par navigate kra denge agr koi pichla page tha particular toh udhar kara dega
			} else {
				toast.error(res.data.error);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<Layout title={"ForgotPass- SwiftBuy"}>
			<div className="form-container " style={{ minHeight: "75vh" }}>
				<h1>Reset Password</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							style={{ marginTop: "3vh" }}
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
							style={{ marginTop: "3vh" }}
							value={answer}
							onChange={(e) => {
								setAnswer(e.target.value);
							}}
							type="text"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Which is your favourite Bollywood Movie?"
							required
						/>
					</div>
					<div className="form-group">
						<input
							style={{ marginTop: "3vh" }}
							value={newPassword}
							onChange={(e) => {
								setNewPassword(e.target.value);
							}}
							type="password"
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Password"
							required
						/>
					</div>

					<button
						style={{ marginTop: "3vh" }}
						type="submit"
						className="btn btn-primary"
					>
						Reset Password
					</button>
				</form>
			</div>
		</Layout>
	);
};
