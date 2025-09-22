// src/components/FridgePantry.tsx
import React, { useRef, useState } from "react";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import { StorageBoxGreen } from "./StorageBox";

interface AddBoxModalProps {
    onClose: () => void;
    onAdd: (name: string) => void;
}

const AddBoxModal: React.FC<AddBoxModalProps> = ({ onClose, onAdd }) => {
    const [name, setName] = useState("");

    const handleAdd = () => {
        if (!name.trim()) return;
        onAdd(name.trim());
        setName("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white rounded-lg p-6 w-[400px]"
                onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 전파 방지
            >
                <h2 className="text-lg font-bold mb-4">팬트리 칸 추가</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="칸 이름 입력"
                    className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
                        취소
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAdd}>
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
};

const FridgePantry: React.FC = () => {
    // ✅ 훅은 항상 최상단에서 선언
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const selectedId = useFridgeStore((state) => state.selectedFridgeId);
    const fridges = useFridgeStore((state) => state.fridges);
    const addBoxToFridge = useFridgeStore((state) => state.addBox);

    // fridge 찾기
    const fridge = fridges.find((f) => f.id === selectedId);

    // fridge 없으면 null 반환
    if (!fridge) return null;

    // pantry 타입 칸만 필터링
    const pantryBoxes = fridge.compartments.pantry;

    // 스크롤
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

    // 칸 추가
    const handleAddBox = (name: string) => {
        addBoxToFridge(fridge.id, "pantry", name);
    };

    return (
        <div className="relative fridge_pantry_wrap h-[450px] md:w-[450px] p-3 bg-amber-100 m-2 rounded">
            {/* 좌측 스크롤 버튼 */}
            {pantryBoxes.length + 1 > 2 && (
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
                className="carousel mt-3 h-64 md:w-[430px] flex flex-nowrap rounded overflow-x-auto scroll-smooth scrollbar-hide px-1 gap-4"
            >
                {pantryBoxes.map((box) => (
                    <StorageBoxGreen key={box.id} name={box.name} />
                ))}

                {/* 칸 추가 버튼 */}
                <div
                    className="storage_box_wrap max-w-52 h-60 cursor-pointer"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <div className="compartment_name">
                        <span className="text-base font-bold text-blue-950 p-1 inline-block">칸 추가</span>
                    </div>
                    <div className="storage_box w-[200px] h-[220px] bg-green-600 border-gray-50 border-4 rounded-xl p-3 flex items-center justify-center text-white font-bold">
                        +
                    </div>
                </div>
            </div>

            {/* 우측 스크롤 버튼 */}
            {pantryBoxes.length + 1 > 2 && (
                <button
                    type="button"
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full z-10"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            )}

            {/* 모달 */}
            {isAddModalOpen && <AddBoxModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddBox} />}
        </div>
    );
};

export default FridgePantry;
