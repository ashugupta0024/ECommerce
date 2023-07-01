import React from "react";
import { AdminMenu } from "../../components/Layout/adminMenu";
import { Layout } from "../../components/Layout/Layout";

export const CreateProduct = () => {
	return (
		<Layout title={"Dashboard- CreateProducts"}>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<h1>Create Product</h1>
					</div>
				</div>
			</div>
		</Layout>
	);
};
