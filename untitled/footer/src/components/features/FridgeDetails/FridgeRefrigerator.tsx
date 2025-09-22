import { useRef } from "react";
import { StorageBoxBlue } from "./StorageBox.tsx";
import { StorageCompartment } from "./types.ts";

interface FridgeRefrigeratorProps {
    data: StorageCompartment[];
    onCompartmentClick: (compartment: StorageCompartment) => void;
}

const FridgeRefrigerator: React.FC<FridgeRefrigeratorProps> = ({ data, onCompartmentClick }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const itemGroups = [];
    for (let i = 0; i < data.length; i += 4) {
        itemGroups.push(data.slice(i, i + 4));
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

            <div
                ref={carouselRef}
                className="carousel h-[520px] md:w-[420px] bg-gray-200 flex flex-nowrap rounded overflow-x-auto scroll-smooth scrollbar-hide gap-4"
            >
                {itemGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="flex-shrink-0 grid grid-cols-2 h-[420px] w-[430px] px-2">
                        {group.map((compartment) => (
                            <div key={compartment.id} className={"py-2 px-1"}>
                                <StorageBoxBlue
                                    compartment={compartment}
                                    onClick={onCompartmentClick}
                                />
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
