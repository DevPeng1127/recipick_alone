import { useRef } from "react";
import { StorageBoxBlue } from "./StorageBox.tsx";
import { StorageCompartment } from "./types.ts";

interface FridgeFreezerProps {
    data: StorageCompartment[];
    onCompartmentClick: (compartment: StorageCompartment) => void;
}

const FridgeFreezer: React.FC<FridgeFreezerProps> = ({ data, onCompartmentClick }) => {
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
        <div className="relative fridge_freezer_wrap h-72 md:w-[450px] p-3 bg-gray-200 m-2 rounded">
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
                className="carousel h-64 md:w-[430px] bg-gray-200 flex flex-nowrap rounded overflow-x-auto scroll-smooth scrollbar-hide px-1 gap-4"
            >
                {data.map((compartment) => (
                    <StorageBoxBlue
                        key={compartment.id}
                        compartment={compartment}
                        onClick={onCompartmentClick}
                    />
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

export default FridgeFreezer;
