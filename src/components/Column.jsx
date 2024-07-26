import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ title, tasks, id, color }) => {
	return (
		<section className="w-full border border-zinc-500 bg-white shadow-lg rounded min-h-[50vh] max-h-[900px] overflow-y-auto flex flex-col relative">
			{/* Header */}
			<div
				className={`w-full py-1 sticky top-0 left-0 px-3`}
				style={{ backgroundColor: color() }}
			>
				<h2 className="text-black text-center text-2xl font-medium">{title}</h2>
			</div>

			<Droppable droppableId={id}>
				{(provided, snapshot) => {
					return (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={`flex-1 min-h-28 px-3 py-6 transition-colors ease-linear duration-200 flex flex-col gap-2  ${
								snapshot.isDraggingOver ? " bg-blue-100" : "bg-white"
							}`}
						>
							{tasks.map((task, i) => (
								<Task key={task.id} task={task} index={i} />
							))}
							{provided.placeholder}
							{/* <Task task={{ id: 1 }} index={1} />
							<Task task={{ id: 2 }} index={2} /> */}
						</div>
					);
				}}
			</Droppable>
		</section>
	);
};

export default Column;
