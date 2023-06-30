import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
	return (
		<div className="footer">
			<h4 className="text-center">All Rights Reserved &copy; SwiftBuy</h4>
			<p className="text-center mt-3">
				<Link to="/About">About</Link> | <Link to="/Contact">Contact</Link> | <Link to="/Policy">Privacy Policy</Link>
			</p>
		</div>
	);
};
