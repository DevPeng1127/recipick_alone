import { useRef } from "react";
import { StorageBoxAddButton } from "./StorageBox.tsx";
import { StorageBoxBlue } from "./StorageBox";
import { useBoxStore } from "../FridgeStores/boxStore.tsx";

const FridgeRefrigerator = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const { boxes, addBox } = useBoxStore();

    // 2×2 그리드 단위로 그룹화
    const itemGroups: typeof boxes[] = [];
    for (let i = 0; i < boxes.length; i += 4) {
        itemGroups.push(boxes.slice(i, i + 4));
    }

    // 마지막 그룹에 항상 "추가 버튼" 삽입
    if (itemGroups.length === 0 || itemGroups[itemGroups.length - 1].length < 4) {
        itemGroups[itemGroups.length - 1] = [
            ...(itemGroups[itemGroups.length - 1] || []),
            { id: "add", color: "blue", name: "새 칸 추가" },
        ];
    } else {
        itemGroups.push([{ id: "add", color: "blue", name: "새 칸 추가" }]);
    }

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -445, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 445, behavior: "smooth" });
        }
    };

    return (
        <div className="relative fridge_refrigerator_wrap h-[550px] md:w-[450px] overflow-y-hidden p-2 bg-gray-200 m-2 rounded">
            {itemGroups.length > 1 && (
                <button
                    type="button"
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-full z-10"
                    onClick={scrollLeft}
                >
                    ◀
                </button>
            )}

            {/* 캐러셀 */}
            <div
                ref={carouselRef}
                className="carousel h-[520px] md:w-[420px] bg-gray-200 flex flex-nowrap rounded overflow-x-auto scroll-smooth scrollbar-hide gap-4"
            >
                {itemGroups.map((group, groupIdx) => (
                    <div
                        key={groupIdx}
                        className="flex-shrink-0 grid grid-cols-2 h-[420px] w-[430px] px-2"
                    >
                        {group.map((box) => (
                            <div key={box.id} className="py-2 px-1">
                                {box.id === "add" ? (
                                    <StorageBoxAddButton
                                        onClick={() =>
                                            addBox({
                                                id: Date.now().toString(),
                                                color: "blue", // FridgeRefrigerator에서는 항상 blue
                                                name: `새 칸 ${boxes.length + 1}`,
                                            })
                                        }
                                    />
                                ) : (
                                    <StorageBoxBlue />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {itemGroups.length > 1 && (
                <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full z-10"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            )}
        </div>
    );
};

export default FridgeRefrigerator;
