import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import "../styles/CategoryProductStyles.css";
import axios from "axios";

const CategoryProduct = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState([]);

	useEffect(() => {
		if (params?.slug) getProductsByCat();
	}, [params?.slug]);

	const getProductsByCat = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`
			);
			setProducts(data?.products);
			setCategory(data?.category);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<div className="container mt-3 category">
				<h4 className="text-center">Category - {category?.name}</h4>
				<h6 className="text-center">{products?.length} results found</h6>
				<div className="row">
					<div className="d-flex flex-wrap card-wrap">
						{products?.map((p) => (
							<div className="card m-2" style={{ width: "18rem" }}>
								<img
									src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
									className="card-img-top"
									alt={p.name}
								/>
								<div className="card-body">
									<h5 className="card-title">{p.name}</h5>
									<p className="card-text">{p.description.substring(0.3)}</p>
									<p className="card-text">₹ {p.price}</p>
									<button
										class="btn btn-primary ms-1"
										onClick={() => navigate(`/product/${p.slug}`)}
									>
										More Details
									</button>
									<button class="btn btn-secondary ms-1">Add to Cart</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CategoryProduct;
