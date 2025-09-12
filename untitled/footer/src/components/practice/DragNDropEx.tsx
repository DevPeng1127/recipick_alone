import {DragDropContext, Draggable, Droppable, type DropResult} from "react-beautiful-dnd";
import {useState} from "react";

const DragNDropEx = () => {
    const [list, setList] = useState([
        {id: "fridge01", content: <div className={"fridge01 z-10 min-w-24 min-h-24 border-2 border-b-gray-800 bg-orange-300 m-5"}>냉장고1
            </div> },
        {id: "fridge02", content: <div className={"fridge02 z-10 min-w-24 min-h-24 border-2 border-b-gray-800 bg-orange-300 m-5"}>냉장고2
            </div> },
        {id: "fridge03", content: <div className={"fridge03 z-10 min-w-24 min-h-24 border-2 border-b-gray-800 bg-orange-300 m-5"}>냉장고3
            </div> },
    ]);

    const onDragEnd = (result: DropResult) => {
        if (!result?.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const newList = [...list];
        const pickedFridge = newList[sourceIndex];
        newList.splice(sourceIndex, 1);
        newList.splice(destinationIndex, 0, pickedFridge);
        setList(newList);

    };

    return (
        <>
            여기서 드래그 앤 드롭을 연습
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="myFridge">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="outer-box flex min-w-96 min-h-96 border-2 border-b-gray-800 bg-cyan-500"
                        >
                            {list.map((fridge, index) => (
                                <Draggable key={fridge.id} draggableId={fridge.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {fridge.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
}

export default DragNDropEx;