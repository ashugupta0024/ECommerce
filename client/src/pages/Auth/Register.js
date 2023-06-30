import React, { useState } from "react"; //UseState https://p.ip.fi/rWXR
import { Layout } from "../../components/Layout/Layout";
import axios from "axios"; //backEnd se link karne ke liye
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./AuthStyles.css";
export const Register = () => {
	const [name, setName] = useState(""); //useState
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const navigate = useNavigate(); //hook hai isliye use kiya hai

	//Form Function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("I am in");
			const res = await axios.post(
				`${process.env.REACT_APP_API}/api/v1/auth/register`, //authRoute aur Server.js dekho udhar apan ne handle kiya hai ise
				{ name, email, password, phone, address }
			);
			if (res.data.success) {
				toast.success(res.data.message);
				navigate("/login"); //Login page par navigate kra denge
			} else {
				toast.error(res.data.error);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};
	return (
		<Layout title={"Register- SwiftBuy"}>
			<div className="form-container">
				<h1>Register</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							value={name} //jo bakse se uthkar aa rahi hai
							onChange={(e) => {
								setName(e.target.value);
							}}
							type="text"
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Name"
							required
						/>
					</div>
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
					<div className="form-group">
						<input
							value={address}
							onChange={(e) => {
								setAddress(e.target.value);
							}}
							type="text"
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Address"
							required
						/>
					</div>
					<div className="form-group">
						<input
							value={phone}
							onChange={(e) => {
								setPhone(e.target.value);
							}}
							type="text"
							className="form-control"
							id="exampleInputEmail1"
							placeholder="Phone"
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Register
					</button>
				</form>
			</div>
		</Layout>
	);
};
