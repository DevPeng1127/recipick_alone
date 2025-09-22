// src/components/CompartmentDetails.tsx
import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { CategoryEmojiMap } from "../FridgeDetails/FridgeUtil.tsx";
import { useFridgeStore } from "../FridgeStores/fridgeStore";

interface CompartmentDetailsProps {
    box: any;
    onClose: () => void;
}

const CompartmentDetails: React.FC<CompartmentDetailsProps> = ({ box, onClose }) => {
    const updateBoxName = useFridgeStore((s) => s.updateBoxName);
    const removeBox = useFridgeStore((s) => s.removeBox);
    const [tempName, setTempName] = useState(box.name);

    const handleSave = () => {
        updateBoxName(box.id, tempName);
        onClose();
    };

    const handleDelete = () => {
        removeBox(box.id);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg w-[400px]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">칸 상세</h3>
                    <button onClick={onClose}>
                        <XIcon />
                    </button>
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium">칸 이름</label>
                    <input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* 재료 리스트 */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {box.ingredients.map((ing: any) => (
                        <div
                            key={ing.id}
                            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm"
                            title={ing.name}
                        >
                            {CategoryEmojiMap[ing.category] || "📦"}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>
                        취소
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSave}>
                        저장
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={handleDelete}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompartmentDetails;
