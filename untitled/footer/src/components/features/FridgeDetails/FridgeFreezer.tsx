import { useRef } from "react";
import { StorageBoxBlue, StorageBoxAddButton } from "./StorageBox";
import { useFridgeStore } from "../FridgeStores/fridgeStore";

const FridgeFreezer: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const selectedId = useFridgeStore((state) => state.selectedFridgeId);
    const fridges = useFridgeStore((state) => state.fridges);
    const addBoxToFridge = useFridgeStore((state) => state.addBox);

    const fridge = fridges.find((f) => f.id === selectedId);
    if (!fridge) return null;

    const freezerBoxes = fridge.compartments.freezer;

    const scrollLeft = () => carouselRef.current?.scrollBy({ left: -430, behavior: "smooth" });
    const scrollRight = () => carouselRef.current?.scrollBy({ left: 430, behavior: "smooth" });

    const handleAddBox = () => {
        addBoxToFridge(fridge.id, "freezer", `새 칸 ${freezerBoxes.length + 1}`);
    };

    return (
        <div className="relative fridge_freezer_wrap h-72 md:w-[450px] p-3 bg-gray-200 m-2 rounded">
            {freezerBoxes.length + 1 > 2 && (
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-full z-10"
                    onClick={scrollLeft}
                >
                    ◀
                </button>
            )}

            <div
                ref={carouselRef}
                className="carousel h-64 md:w-[430px] flex flex-nowrap rounded overflow-x-auto scroll-smooth scrollbar-hide px-1 gap-4"
            >
                {freezerBoxes.map((box) => (
                    <StorageBoxBlue key={box.id} name={box.name} items={box.items || []} />
                ))}
                <StorageBoxAddButton onClick={handleAddBox} />
            </div>

            {freezerBoxes.length + 1 > 2 && (
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full z-10"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            )}
        </div>
    );
};

export default FridgeFreezer;
