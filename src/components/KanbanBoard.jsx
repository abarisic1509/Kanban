import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const KanbanBoard = () => {
	const [tasks, setTasks] = useState({
		draft: [
			{
				id: 1,
				name: "User Authentication Module",
				description: "Plan and design the user authentication module.",
			},
			{
				id: 2,
				name: "Payment Gateway Integration",
				description: "Research and choose a payment gateway for integration.",
			},
		],
		open: [
			{
				id: 3,
				name: "Homepage Development",
				description: "Develop the homepage based on the approved design.",
			},
			{
				id: 4,
				name: "API Setup",
				description:
					"Set up the initial API endpoints and server configurations.",
			},
		],
		inProgress: [
			{
				id: 5,
				name: "Project Setup",
				description:
					"Set up the project structure, version control, and initial configurations.",
			},
			{
				id: 6,
				name: "Database Design",
				description: "Design the database schema and set up the database.",
			},
		],
		done: [
			{
				id: 7,
				name: "Logo Design",
				description: "Create and approve the project logo.",
			},
			{
				id: 8,
				name: "Homepage Design",
				description: "Design and approve the homepage layout and elements.",
			},
		],
	});

	function getColumnColor(key) {
		if (key === "draft") return "lightgrey";
		if (key === "open") return "lightblue";
		if (key === "inProgress") return "orange";
		if (key === "done") return "lightgreen";
	}
	function handleDragEnd(result) {
		const { destination, source, draggableId } = result;

		//is item in current status
		if (source.droppableId === destination.droppableId) {
			//find index and compare
			const currentIndex = tasks[source.droppableId].findIndex(
				(item) => item.id === Number(draggableId)
			);

			//exit if indexes are the same
			if (currentIndex === destination.index) return;

			//if indexes are not the same, filter out current item and insert it to new index
			const currentItem = tasks[source.droppableId].find(
				(item) => item.id === Number(draggableId)
			);
			const newList = tasks[source.droppableId].filter(
				(item) => item.id !== Number(draggableId)
			);

			newList.splice(destination.index, 0, currentItem);

			setTasks((prev) => ({
				...prev,
				[source.droppableId]: newList,
			}));
		} else {
			//find currently active status
			let currentList = tasks[destination.droppableId];

			//get current item and filter out from old list
			const currentItem = tasks[source.droppableId].find(
				(item) => item.id === Number(draggableId)
			);
			const oldList = tasks[source.droppableId].filter(
				(item) => item.id !== Number(draggableId)
			);

			currentList.splice(destination.index, 0, currentItem);

			setTasks((prev) => ({
				...prev,
				[source.droppableId]: oldList,
				[destination.droppableId]: currentList,
			}));
		}
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<h1 className="text-center font-bold text-3xl text-black my-10">
				Progress board
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center px-6 gap-3 w-full max-w-screen-2xl mx-auto">
				{Object.keys(tasks).map((key) => {
					console.log(key);
					return (
						<Column
							title={key}
							id={key}
							key={key}
							color={() => getColumnColor(key)}
							tasks={tasks[key]}
						/>
					);
				})}
				{/*  <Column title={"Draft"} id={"draft"} color={"lightgrey"} /> */}
				{/* <Column title={"Open"} id={"open"} color={"lightblue"} />
				<Column title={"In progress"} id={"inProgress"} color={"orange"} />
				<Column title={"Done"} id={"done"} color={"lightgreen"} /> */}
			</div>
		</DragDropContext>
	);
};

export default KanbanBoard;
