import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "./pages/PageNotFound";
import { HomePage } from "./pages/HomePage";
import { Contact } from "./pages/Contact";
import { Policy } from "./pages/Policy";
import { About } from "./pages/About";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/Register" element={<Register />} />
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
