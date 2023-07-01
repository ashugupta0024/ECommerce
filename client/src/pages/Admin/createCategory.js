import React from "react";
import { AdminMenu } from "../../components/Layout/adminMenu";
import { Layout } from "../../components/Layout/Layout";

export const CreateCategory = () => {
	return (
		<Layout title={"Dashboard-CreateCategory"}>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<h1>Create Category</h1>
					</div>
				</div>
			</div>
		</Layout>
	);
};
