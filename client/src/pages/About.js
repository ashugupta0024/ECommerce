import React from "react";
import { Layout } from "../components/Layout/Layout";

export const About = () => {
	return (
		<Layout title={"About-Us"}>
			<div className="container about-page">
				<h1 className="h-about">About SwiftBuy</h1>
				<p className="p-about">
					SwiftBuy is an online marketplace that connects buyers and sellers,
					providing a convenient and secure platform for purchasing a wide range
					of products.
				</p>
				<p className="p-about">
					At SwiftBuy, our mission is to offer a seamless shopping experience,
					empowering users to find the products they need from the comfort of
					their homes.
				</p>
				<p className="p-about">
					With a diverse selection of products, competitive prices, and reliable
					sellers, SwiftBuy strives to exceed customer expectations and build
					lasting relationships.
				</p>
				<p className="p-about">
					We are committed to delivering exceptional customer service, ensuring
					secure transactions, and providing efficient delivery services for a
					hassle-free shopping experience.
				</p>
				<p className="p-about">
					Thank you for choosing SwiftBuy. We appreciate your trust and look
					forward to serving you with the best products and services.
				</p>
        <div className="img-container">
        <div className="img-about-centered">
					<img className="img-about" src="/Logo.png" alt="Description of the image"/>
				</div>
        </div>
			</div>
		</Layout>
	);
};
