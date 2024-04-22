import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	tasks: [],
	error: "",
};

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () =>
	axios
		.get("http://localhost:3000/tasks")
		.then((res) => res.data)
		.catch((error) => console.log(error.message))
);

export const addTask = createAsyncThunk("task/addTask", async () =>
	axios
		.post("http://localhost:3000/tasks", )
		.then((res) => res.data)
		.catch((error) => console.log(error.message))
);

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) =>
	axios
		.delete(`http://localhost:3000/tasks/${id}`)
		.then((res) => res.data)
		.catch((error) => console.log(error.message))
);



const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.tasks.push(action.payload);
		},
		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
		updateTask: (state, action) => {
			state.tasks = state.tasks.map((task) =>
				task.id === action.payload.id ? action.payload : task
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload);
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.tasks = state.tasks.filter((task) => task.id !== action.payload);
			});
	},
});

export const taskReducer = taskSlice.reducer;

export const taskActions = taskSlice.actions;
