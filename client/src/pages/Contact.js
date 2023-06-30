import React from "react";
import { Layout } from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
export const Contact = () => {
	return (
		<Layout title={"Contact-Us"}>
			<div className="row contactus ">
				<div className="col-md-6 ">
					<img
						src="/images/contactus.jpeg"
						alt="contactus"
						style={{ width: "100%" }}
					/>
				</div>
				<div className="col-md-4">
					<h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
					<p className="text-justify mt-2">
          Welcome to our Contact Us page! We value your feedback and are here to assist you. Whether you have questions, suggestions, or need assistance with your orders, our dedicated team is ready to help. Feel free to reach out to us using the contact information provided below. Our friendly staff will promptly respond to your inquiries and provide the support you need. We appreciate your interest in our e-commerce site and look forward to hearing from you.
					</p>
					<p className="mt-3">
						<BiMailSend /> : swiftcart-contact@gmail.com
					</p>
					<p className="mt-3">
						<BiPhoneCall /> : 012-3456789
					</p>
					<p className="mt-3">
						<BiSupport /> : 1800-0000-0000 (toll free)
					</p>
				</div>
			</div>
		</Layout>
	);
};
