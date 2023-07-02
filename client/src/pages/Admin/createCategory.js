import React, { useEffect, useState } from "react";
import { AdminMenu } from "../../components/Layout/adminMenu";
import { Layout } from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal, modal } from "antd";
export const CreateCategory = () => {
	const [categories, setCategories] = useState([]);
	const [name, setName] = useState("");
	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(null);
	const [updatedName, setUpdatedName] = useState("");

	//Handle Form for Create Category
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/api/v1/category/create-category`,
				{ name }
			);
			if (data?.success) {
				toast.success(`${name} is created`);
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong in input form");
		}
	};

	//Get all Categories
	const getAllCategory = async () => {
		try {
			const { data } = await axios(
				`${process.env.REACT_APP_API}/api/v1/category/get-category`
			);
			if (data?.success) {
				setCategories(data?.category);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong in getting category");
		}
	};

	useEffect(() => {
		getAllCategory();
	}, []);

	//Handle Update function
	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
				{ name: updatedName }
			);
			if (data.success) {
				toast.success(`${updatedName} is updated`);
				setSelected(null);
				setUpdatedName("");
				setVisible(false);
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};

	//Handle Delete function
	const handleDelete = async (pId) => {
		try {
			const { data } = await axios.delete(
				`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`,
			);
			if (data.success) {
				toast.success(`${name} is Deleted`);
				
				getAllCategory();
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error("Something went wrong");
		}
	};


	return (
		<Layout title={"Dashboard-CreateCategory"}>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<AdminMenu />
					</div>
					<div className="col-md-9">
						<h1>Manage Category</h1>
						<div className="p-3 w-75">
							<CategoryForm
								handleSubmit={handleSubmit}
								value={name}
								setValue={setName}
							/>
						</div>
						<div>
							<table className="table table-hover w-75">
								<thead>
									<tr>
										<th scope="col">Name</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody>
									{categories?.map(
										(
											c //c is variable for categories
										) => (
											<>
												<tr>
													<td key={c.id}>{c.name}</td>
													<td>
														<button
															className="btn btn-primary ms-2"
															onClick={() => {
																setVisible(true);
																setUpdatedName(c.name);
																setSelected(c);
															}}
														>
															Edit
														</button>{" "}
														<button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>
															Delete
														</button>{" "}
													</td>
												</tr>
											</>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>
					<Modal
						onCancel={() => setVisible(false)}
						footer={null}
						open={visible}
					>
						<CategoryForm
							value={updatedName}
							setValue={setUpdatedName}
							handleSubmit={handleUpdate}
						/>
					</Modal>
				</div>
			</div>
		</Layout>
	);
};
