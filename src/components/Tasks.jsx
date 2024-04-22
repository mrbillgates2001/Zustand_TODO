import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
// import { fetchTasks } from "../App/tasks/taskSlice";
import { Button, Form, Input, Space, Checkbox } from "antd";
import axios from "axios";
import { useTaskStore } from "../zustand/useTaskStore";

const Tasks = () => {
	// const dispatch = useDispatch();
	// const { loading, tasks, error } = useSelector((state) => state.task);
	const { loading, error, tasks, fetchTasks } = useTaskStore();
	const [form] = Form.useForm();
	const [isChecked, setIsChecked] = useState(false);
	const [editChecked, setEditChecked] = useState({
		title: "",
		completed: false,
	});
	const [addTask, setAddTask] = useState({
		title: "",
		completed: false,
	});

	const SubmitButton = ({ form, children }) => {
		const [submittable, setSubmittable] = React.useState(false);

		// Watch all values
		const values = Form.useWatch([], form);
		React.useEffect(() => {
			form
				.validateFields({
					validateOnly: true,
				})
				.then(() => setSubmittable(true))
				.catch(() => setSubmittable(false));
		}, [form, values]);
		return (
			<Button type="primary" htmlType="submit" disabled={!submittable}>
				{children}
			</Button>
		);
	};

	useEffect(() => {
		// dispatch(fetchTasks());
		fetchTasks();
	}, []);

	// CHECKBOX //////////////////////////////////

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	// ADD TASK //////////////////////////////////

	const handleAddTask = async () => {
		try {
			if (addTask.title !== "") {
				const res = await axios.post("http://localhost:3000/tasks", addTask);
				const data = await res.data;
				setAddTask(data);
			} else {
				alert("Please enter a title");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setAddTask({
				title: "",
				completed: false,
			});
			// dispatch(fetchTasks());
			fetchTasks();
		}
	};

	// DELETE TASK //////////////////////////////////

	const handleDeleteTask = async (id) => {
		try {
			if (confirm("Are you sure you want to delete this task?")) {
				const res = await axios.delete(`http://localhost:3000/tasks/${id}`);
				const data = await res.data;
				// dispatch(fetchTasks());
				fetchTasks();
			}
		} catch (error) {
			console.log(error);
		} finally {
			// dispatch(fetchTasks());
			fetchTasks();
		}
	};

	const totalTasks = tasks.length;

	return (
		<div>
			<div className="text-center bg-orange-300 bg-opacity-50 p-2 mb-3 font-extrabold">
				<h1>TO DO APP</h1>
				<h3>Number of tasks: {totalTasks}</h3>
			</div>
			<div className="input-group w-50 mx-auto bg-slate-400 rounded p-2">
				<Form
					onFinish={handleAddTask}
					form={form}
					name="validateOnly"
					layout="vertical"
					autoComplete="off"
					className="w-100 flex gap-2 items-end">
					<Form.Item
						className="w-100"
						name="task"
						label="Add a new task"
						value={addTask.title}
						onChange={(e) => setAddTask({ ...addTask, title: e.target.value })}
						rules={[
							{
								required: true,
							},
						]}>
						<Input />
					</Form.Item>

					<Form.Item>
						<Space>
							<SubmitButton form={form}>Submit</SubmitButton>
							<Button htmlType="reset">Clear</Button>
						</Space>
					</Form.Item>
				</Form>
			</div>

			<Table striped bordered hover className="mx-auto w-50 mt-11 text-sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Task Title</th>
						<th colSpan={2}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{loading && (
						<h2
							style={{
								display: "block",
								background: "#00",
								color: "white",
								fontSize: "50px",
							}}>
							LOADING...
						</h2>
					)}
					{error && (
						<h2
							style={{
								display: "block",
								background: "#00",
								color: "white",
								fontSize: "20px",
							}}>
							ERROR
						</h2>
					)}
					{tasks.map((task, index) => (
						<tr key={task.id}>
							<td>{index + 1}</td>
							<td
								style={{
									textDecoration: task.completed ? "line-through" : "none",
								}}>
								{task.title}
							</td>
							<td>
								<Checkbox
									onChange={(e) =>
										handleCheckboxChange({
											...editChecked,
											completed: e.target.value,
										})
									}>
									Complete
								</Checkbox>
							</td>
							<td>
								<Button
									onClick={() => handleDeleteTask(task.id)}
									variant="outline-danger"
									size="sm">
									Remove
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Tasks;
