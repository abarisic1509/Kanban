import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
	return (
		<Draggable draggableId={`${task?.id}`} key={task?.id} index={index}>
			{(provided, snapshot) => {
				return (
					<article
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						className={`w-full h-fit p-3 rounded text-black cursor-pointer flex flex-col justify-between ${
							snapshot.isDragging
								? "bg-green-300"
								: snapshot.draggingOver
								? "opacity-60"
								: " bg-zinc-100"
						}`}
					>
						<h3
							className="font-bold pointer-events-none"
							style={{ userSelect: "none" }}
						>
							{task?.name}
						</h3>
						<p className=" pointer-events-none" style={{ userSelect: "none" }}>
							{task?.description}
						</p>
					</article>
				);
			}}
		</Draggable>
	);
};

export default Task;
