import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound";
import { HomePage } from "./pages/HomePage";
import { Contact } from "./pages/Contact";
import { Policy } from "./pages/Policy";
import { About } from "./pages/About";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import DashBoard from "./pages/user/DashBoard";
import PrivateRoute from "./components/routes/Private";
import { ForgotPassword } from "./pages/Auth/forgotPassword";
import AdminRoute from "./components/routes/AdminRoute";
import { AdminDashboard } from "./pages/Admin/adminDashboard";
import { CreateCategory } from "./pages/Admin/createCategory";
import { CreateProduct } from "./pages/Admin/createProduct";
import { Users } from "./pages/Admin/users";
import { Orders } from "./pages/user/orders";
import { Profile } from "./pages/user/Profile";
import { Products } from "./pages/Admin/Products";
import { UpdateProduct } from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import { Categories } from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/search" element={<Search />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/product/:slug" element={<ProductDetails />} />
				<Route path="/category/:slug" element={<CategoryProduct />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/Dashboard" element={<PrivateRoute />}>
					<Route path="user" element={<DashBoard />} />
					<Route path="user/orders" element={<Orders />} />
					<Route path="user/Profile" element={<Profile />} />
				</Route>
				<Route path="/Dashboard" element={<AdminRoute />}>
					<Route path="admin" element={<AdminDashboard />} />
					<Route path="admin/create-category" element={<CreateCategory />} />
					<Route path="admin/create-product" element={<CreateProduct />} />
					<Route path="admin/product/:slug" element={<UpdateProduct />} />
					<Route path="admin/products" element={<Products />} />
					<Route path="admin/users" element={<Users />} />
				</Route>
				<Route path="/Register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/About" element={<About />} />
				<Route path="/Contact" element={<Contact />} />
				<Route path="/Policy" element={<Policy />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
