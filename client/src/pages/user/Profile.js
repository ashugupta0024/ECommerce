import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/userMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

export const Profile = () => {
	//Context
	const [auth, setAuth] = useAuth();
	//State
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	//Get User Data
	useEffect(() => {
		const { email, name, phone, address } = auth?.user;
		setName(name);
		setPhone(phone);
		setAddress(address);
		setEmail(email);
	}, [auth?.user]);
	//Form Function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/api/v1/auth/profile`,
				{ name, email, password, phone, address }
			);
			if (data?.error) {
				toast.error(data?.error);
			} else {
				setAuth({ ...auth, user: data?.updatedUser }); //Local Storage mei bhi user ko update krre hai
				let ls = localStorage.getItem("auth");
				ls = JSON.parse(ls);
				ls.user = data.updatedUser;
				localStorage.setItem("auth", JSON.stringify(ls));
				toast.success("Yippee! Your Profile is Updated!");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<Layout title={"My Profile"}>
			<div className="container-fluid p-3 m-3">
				<div className="row">
					<div className="col-md-3">
						<UserMenu />
					</div>
					<div className="col-md-9">
						<div className="form-container">
							<h1>User Profile</h1>
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
										disabled
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
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									Update
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};
