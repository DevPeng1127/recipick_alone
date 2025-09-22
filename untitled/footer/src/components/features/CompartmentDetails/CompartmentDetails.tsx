import React, { useState } from "react";
import { StorageCompartment, FoodCategory } from "./types.ts";

interface CompartmentDetailsProps {
    compartment: StorageCompartment;
    onClose: () => void;
    onSave: (id: number, newName: string) => void;
    onDelete: (id: number) => void;
}

const categoryEmoji: Record<FoodCategory, string> = {
    vegetable: '🥬',
    fruit: '🍎',
    meat: '🥩',
    seafood: '🐟',
    dairy: '🥛',
    grain: '🍞',
    processed: '🥫',
    beverage: '🧃',
    seasoning: '🧂',
    etc: '🧊',
};

const CompartmentDetails: React.FC<CompartmentDetailsProps> = ({ compartment, onClose, onSave, onDelete }) => {
    const [tempName, setTempName] = useState(compartment.name);

    const handleSaveClick = () => {
        onSave(compartment.id, tempName);
    };

    const handleDeleteClick = () => {
        // A confirmation dialog is recommended in a real application
        onDelete(compartment.id);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-full max-w-sm m-4">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-bold text-gray-800">칸 상세 정보</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">칸 이름</label>
                    <input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full border p-2 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">포함된 재료</label>
                    <div className="mt-1 flex flex-wrap gap-2 p-2 bg-gray-50 rounded-md border min-h-[40px]">
                        {compartment.items.map((ing, index) => (
                            <div
                                key={index}
                                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xl border shadow-sm"
                                title={ing.name}
                            >
                                {categoryEmoji[ing.category] || "📦"}
                            </div>
                        ))}
                        {compartment.items.length === 0 && (
                            <p className="text-sm text-gray-400">재료가 없습니다.</p>
                        )}
                    </div>
                </div>


                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={onClose}>
                        취소
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleDeleteClick}>
                        삭제
                    </button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSaveClick}>
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompartmentDetails;

