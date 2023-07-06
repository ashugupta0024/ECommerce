import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import { Layout } from "../components/Layout/Layout";

export const Categories = () => {
	const categories = useCategory();
	return (
		<Layout title={"All Categories"}>
			<div className="container all-cat">
				<div className="row">	
					{categories.map((c) => (
						<div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
							<card>
								<Link to={`/category/${c.slug}`} className="btn cat-btn">
									{c.name}
								</Link>
							</card>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
};
