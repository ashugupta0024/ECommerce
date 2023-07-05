import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useAuth();
	const [cart, setCart] = useCart();

	//total price
	const totalPrice = () => {
		try {
			let total = 0;
			cart?.map((item) => {
				total = total + item.price;
			});
			return total;
		} catch (error) {
			console.log(error);
		}
	};

	//Delete Item
	const removeCartItem = (pid) => {
		try {
			let myCart = [...cart];
			let index = myCart.findIndex((item) => item._id === pid); //array hai na items ka isliy index mei baat krre hai apn
			myCart.splice(index, 1);
			setCart(myCart);
			localStorage.setItem("cart", JSON.stringify(myCart));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Layout>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="text-center bg-light p-2">
							{`Hello ${auth?.token && auth?.user?.name}`}
						</h1>
						<h4 className="text-center">
							{cart?.length
								? `You Have ${cart.length} items in your cart ${
										auth?.token ? "" : "please login to checkout"
								  }`
								: " Your Cart Is Empty"}
						</h4>
					</div>
					<div className="col-md-6">
						<h6 className="text-center">Cart</h6>
						{cart?.map((p) => (
							<div className="row mb-2 p-3 card flex-row">
								<div className="col-md-4">
									<img
										src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
										className="card-img-top"
										alt={p.name}
										width="100px"
										height={"100px"}
									/>
								</div>
								<div className="col-md-8">
									<p>{p.name}</p>
									<p>{p.description.substring(0, 30)}</p>
									<p>Price : {p.price}</p>
									<button
										className="btn btn-danger"
										onClick={() => removeCartItem(p._id)}
									>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="col-md-4 p-3 text-center">
						<h2>Cart Summary</h2>
						<hr />
						<p>Total | Checkout | Payment</p>
						<hr />
						<h4>Total : ₹{totalPrice()} </h4>

						{auth?.user?.address ? (
							<>
								<div className="mb-3">
									<h4>Current Address</h4>
									<h5>{auth?.user?.address}</h5>
									<button
										className="btn btn-outline-dark"
										onClick={() => navigate("/dashboard/user/profile")}
									>
										Update Address
									</button>
								</div>
							</>
						) : (
							<div className="mb-3">
								{auth?.token ? (
									<button
										className="btn btn-dark"
										onClick={() => navigate("/dashboard/user/profile")}
									>
										Update Address
									</button>
								) : (
									<button
										className="btn btn-dark"
										onClick={() =>
											navigate("/login", {
												state: "/cart",
											})
										}
									>
										Please Login to checkout
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default CartPage;
