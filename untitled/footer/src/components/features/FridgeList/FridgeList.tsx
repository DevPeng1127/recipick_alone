// src/components/FridgeList.tsx
import { useRef } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
} from "react-beautiful-dnd";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import FridgeObject from "./FridgeObject";
import { AddFridge } from "./AddFridge";

const FridgeList: React.FC = () => {
    const { fridges, reorderFridges, addFridge } = useFridgeStore();
    const carouselRef = useRef<HTMLDivElement>(null);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const ids = [...fridges.map((f) => f.id)];
        const [moved] = ids.splice(result.source.index, 1);
        ids.splice(result.destination.index, 0, moved);
        reorderFridges(ids);
    };

    // 기본 → 즐겨찾기 → 일반 순서
    const sortedFridges = [
        ...fridges.filter((f) => f.isDefault),
        ...fridges.filter((f) => f.isFavorite && !f.isDefault),
        ...fridges.filter((f) => !f.isFavorite && !f.isDefault),
    ];

    // 4개씩 그룹화
    const fridgeGroups: typeof sortedFridges[] = [];
    for (let i = 0; i < sortedFridges.length; i += 4) {
        fridgeGroups.push(sortedFridges.slice(i, i + 4));
    }

    const scrollLeft = () =>
        carouselRef.current?.scrollBy({ left: -900, behavior: "smooth" });
    const scrollRight = () =>
        carouselRef.current?.scrollBy({ left: 900, behavior: "smooth" });

    return (
        <div className="fridge_list_wrap w-4/5 h-4/5 min-w-[500px] min-h-[900px] md:w-[900px] py-2.5 pb-5 bg-gray-400 justify-self-center relative">
            <AddFridge onAdd={addFridge} />

            {sortedFridges.length > 4 && (
                <button
                    className="absolute left-2 top-[440px] -translate-y-1/2 p-2 bg-transparent rounded-full z-20 text-gray-700 font-bold"
                    onClick={scrollLeft}
                >
                    ◀
                </button>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="fridge-list" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={(el) => {
                                // ref 두 개를 동시에 연결
                                carouselRef.current = el;
                                provided.innerRef(el);
                            }}
                            {...provided.droppableProps}
                            className="overflow-x-auto scroll-smooth scrollbar-hide"
                        >
                            <div className="flex gap-0 w-[900px]">
                                {fridgeGroups.map((group, groupIndex) => (
                                    <div
                                        key={`group-${groupIndex}`}
                                        className="flex-shrink-0 grid grid-cols-2 grid-rows-2 gap-0 w-[900px] place-items-center"
                                    >
                                        {group.map((fridge, indexInGroup) => {
                                            const overallIndex = groupIndex * 4 + indexInGroup;
                                            return (
                                                <Draggable
                                                    key={fridge.id}
                                                    draggableId={fridge.id}
                                                    index={overallIndex}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`${
                                                                snapshot.isDragging
                                                                    ? "opacity-70 z-50 transform rotate-3 scale-105"
                                                                    : "transform-none"
                                                            } transition-transform duration-200`}
                                                        >
                                                            <FridgeObject
                                                                fridgeId={fridge.id}
                                                                fridgeName={fridge.name}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    </div>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>


            {sortedFridges.length > 4 && (
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-transparent rounded-full z-20 text-gray-700 font-bold"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            )}
        </div>
    );
};

export default FridgeList;
