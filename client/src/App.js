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
import { ForgotPassword } from './pages/Auth/forgotPassword';


function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/Dashboard" element={<PrivateRoute />}>
					<Route path="" element={<DashBoard />} />
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
