import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
export const Header = () => {
	const [auth, setAuth] = useAuth();
	const handleLogout = () => {
		setAuth({
			...auth,
			user: null,
			token: "",
		});
		localStorage.removeItem("auth");
		toast.success("Logout Successfully");
	};
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container-fluid">
					<img
						width={48}
						height={48}
						src="https://img.icons8.com/material-outlined/48/000000/fast-cart.png"
						alt="fast-cart"
					/>
					<Link to="/" className="navbar-brand">
						SwiftCart
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo02"
						aria-controls="navbarTogglerDemo02"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<SearchInput />
							<li className="nav-item">
								<NavLink to="/" className="nav-link">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/Category" className="nav-link">
									Category
								</NavLink>
							</li>
							{!auth.user ? ( //Check krre user hai ki nahi
								<>
									<li className="nav-item">
										<NavLink to="/Register" className="nav-link" href="#">
											Register
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink to="/Login" className="nav-link" href="#">
											Login
										</NavLink>
									</li>
								</>
							) : (
								//ternary operator
								<>
									<li className="nav-item dropdown">
										<NavLink
											className="nav-link dropdown-toggle"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											{auth?.user.name}
										</NavLink>
										<ul className="dropdown-menu">
											<li>
												<NavLink
													to={`/dashboard/${
														auth?.user?.role === 1 ? "admin" : "user "
													}`}
													className="dropdown-item"
												>
													DashBoard
												</NavLink>
											</li>
											<li>
												<NavLink
													onClick={handleLogout}
													to="/Login"
													className="dropdown-item"
												>
													Logout
												</NavLink>
											</li>
										</ul>
									</li>
								</>
							)}
							<li className="nav-item">
								<NavLink to="/Cart" className="nav-link" href="#">
									Cart(0)
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
