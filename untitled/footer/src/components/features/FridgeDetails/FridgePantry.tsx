import { StorageBoxGreen } from "./StorageBox.tsx";
import { useRef } from "react";
import { StorageCompartment } from "./types.ts";

interface FridgePantryProps {
    data: StorageCompartment[];
}

const FridgePantry: React.FC<FridgePantryProps> = ({ data }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -430, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 430, behavior: "smooth" });
        }
    };

    return (
        <div className="relative fridge_pantry_wrap h-[450px] md:w-[450px] p-3 bg-amber-100 m-2 rounded">
            {data.length > 2 && (
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
                className="carousel mt-3 h-64 md:w-[430px] bg-amber-100 flex flex-nowrap rounded overflow-x-auto scroll-smooth scrollbar-hide px-1 gap-4"
            >
                {data.map((compartment) => (
                    <StorageBoxGreen key={compartment.id} name={compartment.name} items={compartment.items} />
                ))}
            </div>

            {data.length > 2 && (
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

export default FridgePantry;