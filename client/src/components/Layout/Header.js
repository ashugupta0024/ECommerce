import React from "react";
import { Link,NavLink } from "react-router-dom";
import {} from 'react-icons';
export const Header = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg bg-light">
				<div className="container-fluid">
        <img width={48} height={48} src="https://img.icons8.com/material-outlined/48/000000/fast-cart.png" alt="fast-cart" />
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
							<li className="nav-item">
								<NavLink
									to="/"
									className="nav-link"
								>
									Home
								</NavLink>
							</li>
              <li className="nav-item">
								<NavLink
									to="/Category"
									className="nav-link"
								>
									Category
								</NavLink>
							</li>
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
