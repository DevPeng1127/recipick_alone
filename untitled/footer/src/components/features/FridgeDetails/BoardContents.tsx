import * as React from "react";
import { useState } from "react";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react"; // 팬/저장/취소 아이콘

interface BoardContentsProps {
    fridgeId: string;
}

export const BoardContents: React.FC<BoardContentsProps> = ({ fridgeId }) => {
    const fridge = useFridgeStore((state) =>
        state.fridges.find((f) => f.id === fridgeId)
    );
    const updateMemo = useFridgeStore((state) => state.updateMemo);

    const [isEditing, setIsEditing] = useState(false);
    const [tempMemo, setTempMemo] = useState(fridge?.memo || "");

    if (!fridge) return null;

    const handleSave = () => {
        updateMemo(fridge.id, tempMemo);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempMemo(fridge.memo); // 원래 내용으로 복원
        setIsEditing(false);
    };

    return (
        <div className="boards p-3 md:min-w-[380px] md:min-h-[320px] bg-amber-100 rounded-b-lg z-12 relative">
            {isEditing ? (
                <div>
                    <textarea
                        className="w-full h-40 p-2 border rounded resize-none focus:outline-none"
                        value={tempMemo}
                        onChange={(e) => setTempMemo(e.target.value)}
                    />
                    <div className="flex justify-end mt-2 gap-2">
                        <button
                            className="p-1 bg-green-500 text-white rounded"
                            onClick={handleSave}
                        >
                            <CheckIcon size={16} />
                        </button>
                        <button
                            className="p-1 bg-red-500 text-white rounded"
                            onClick={handleCancel}
                        >
                            <XIcon size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <div>{fridge.memo}</div>
                    <button
                        className="ml-2"
                        onClick={() => setIsEditing(true)}
                        title="메모 수정"
                    >
                        <PencilIcon size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};
