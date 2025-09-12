import { useState, useRef, useEffect } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import FridgeObject from "./FridgeObject.tsx";
import { AddFridge } from "./AddFridge.tsx";

// 냉장고 타입 정의
interface Fridge {
    id: string;
    name: string;
}

// 냉장고 그룹 타입 정의
type FridgeGroup = Fridge[];

const FridgeList: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

    // 초기 냉장고 데이터
    const initialFridges: Fridge[] = [
        { id: "fridge-1", name: "냉장고 1" },
        { id: "fridge-2", name: "냉장고 2" },
        { id: "fridge-3", name: "냉장고 3" },
        { id: "fridge-4", name: "냉장고 4" },
        { id: "fridge-5", name: "냉장고 5" },
        { id: "fridge-6", name: "냉장고 6" },
    ];

    const [fridgeList, setFridgeList] = useState<Fridge[]>(initialFridges);

    // 컴포넌트 마운트 시 localStorage에서 순서 불러오기
    useEffect(() => {
        const savedOrder = localStorage.getItem('fridgeOrder');
        if (savedOrder) {
            try {
                const parsedOrder: string[] = JSON.parse(savedOrder);
                // 저장된 순서대로 냉장고 배열 재정렬
                const reorderedFridges = parsedOrder
                    .map((id: string) => initialFridges.find((fridge: Fridge) => fridge.id === id))
                    .filter((fridge): fridge is Fridge => fridge !== undefined);

                // 새로 추가된 냉장고가 있다면 뒤에 추가
                const newFridges = initialFridges.filter(
                    (fridge: Fridge) => !parsedOrder.includes(fridge.id)
                );

                setFridgeList([...reorderedFridges, ...newFridges]);
            } catch (error) {
                console.error('냉장고 순서 불러오기 실패:', error);
                setFridgeList(initialFridges);
            }
        }
    }, []);

    // localStorage에 냉장고 순서 저장
    const saveFridgeOrder = (fridges: Fridge[]): void => {
        try {
            const orderIds: string[] = fridges.map((fridge: Fridge) => fridge.id);
            localStorage.setItem('fridgeOrder', JSON.stringify(orderIds));
            console.log('냉장고 순서가 저장되었습니다:', orderIds);

            // TODO: 추후 백엔드 API로 순서 저장
            // await saveFridgeOrderToServer(orderIds);
        } catch (error) {
            console.error('냉장고 순서 저장 실패:', error);
        }
    };

    // 4개씩 그룹화 (2x2 그리드)
    const fridgeGroups: FridgeGroup[] = [];
    for (let i = 0; i < fridgeList.length; i += 4) {
        fridgeGroups.push(fridgeList.slice(i, i + 4));
    }

    const onDragEnd = (result: DropResult): void => {
        // 드롭 위치가 없으면 아무것도 안함
        if (!result?.destination) return;

        const sourceIndex: number = result.source.index;
        const destinationIndex: number = result.destination.index;

        // 새로운 배열을 만들어서 순서 변경
        const newFridgeList: Fridge[] = [...fridgeList];
        const [movedFridge]: Fridge[] = newFridgeList.splice(sourceIndex, 1);
        newFridgeList.splice(destinationIndex, 0, movedFridge);

        setFridgeList(newFridgeList);

        // 변경된 순서를 localStorage에 저장
        saveFridgeOrder(newFridgeList);
    };

    const scrollLeft = (): void => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -900, behavior: "smooth" });
        }
    };

    const scrollRight = (): void => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 900, behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="fridge_list_wrap w-4/5 h-4/5 min-w-[500px] min-h-[900px] md:w-[900px] p-2.5 pb-5 bg-gray-400 justify-self-center relative">
                <AddFridge />

                {/* 캐러셀 화살표 버튼 - 5개 이상일 때만 표시 */}
                {fridgeList.length > 4 && (
                    <button
                        type="button"
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-transparent rounded-full z-20 text-gray-700 font-bold"
                        onClick={scrollLeft}
                        aria-label="이전 냉장고 그룹 보기"
                    >
                        ◀
                    </button>
                )}

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="fridge-list" direction="horizontal">
                        {(provided) => (
                            <div
                                ref={carouselRef}
                                className="draggable-fridge-container overflow-x-auto scrollbar-hide scroll-smooth"
                                {...provided.droppableProps}
                            >
                                <div
                                    ref={provided.innerRef}
                                    className="flex gap-4"
                                >
                                    {fridgeGroups.map((group: FridgeGroup, groupIndex: number) => (
                                        <div
                                            key={`group-${groupIndex}`}
                                            className="flex-shrink-0 grid grid-cols-2 gap-4 w-[850px]"
                                        >
                                            {group.map((fridge: Fridge, indexInGroup: number) => {
                                                const overallIndex: number = groupIndex * 4 + indexInGroup;
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
                                                                className={`${snapshot.isDragging ? 'opacity-70 z-50 transform rotate-3 scale-105' : 'transform-none'} transition-transform duration-200`}
                                                            >
                                                                <FridgeObject fridgeName={fridge.name} />
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

                {fridgeList.length > 4 && (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-transparent rounded-full z-20 text-gray-700 font-bold"
                        onClick={scrollRight}
                        aria-label="다음 냉장고 그룹 보기"
                    >
                        ▶
                    </button>
                )}
            </div>
        </>
    );
};

export default FridgeList;