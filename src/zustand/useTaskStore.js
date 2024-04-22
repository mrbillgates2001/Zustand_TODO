import axios from "axios";
import { create } from "zustand";

const fetchTasks = async (set) => {
	set((state) => ({
		...state,
		loading: true,
	}));
	try {
		const res = await axios.get("http://localhost:3000/tasks");
		const data = await res.data;
		set((state) => ({
			...state,
			loading: false,
			tasks: data,
		}));
	} catch (err) {
		set((state) => ({
			...state,
			loading: false,
			tasks: [],
			error: err.message,
		}));
	}
};

const useStore = (set) => ({
	loading: false,
	tasks: [],
	error: "",
	fetchTasks: () => fetchTasks(set),
});

export const useTaskStore = create(useStore);
