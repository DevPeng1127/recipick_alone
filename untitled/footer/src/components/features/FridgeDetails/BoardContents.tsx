import * as React from "react";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import { useIngredientStore } from "../FridgeStores/ingredientStore";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";

export const BoardContents: React.FC = () => {
    const selectedId = useFridgeStore((state) => state.selectedFridgeId);
    const fridge = useFridgeStore((state) =>
        state.fridges.find((f) => f.id === selectedId)
    );
    const updateMemo = useFridgeStore((state) => state.updateMemo);
    const selectedBoardMenu = useFridgeStore((state) => state.selectedBoardMenu);

    const [isEditing, setIsEditing] = useState(false);
    const [tempMemo, setTempMemo] = useState(fridge?.memo || "");

    const getExpiringSoon = useIngredientStore((s) => s.getExpiringSoon);
    const getRecentlyUsed = useIngredientStore((s) => s.getRecentlyUsed);

    useEffect(() => {
        if (fridge) setTempMemo(fridge.memo);
    }, [fridge]);

    if (!fridge) return null;

    const handleSave = () => {
        updateMemo(fridge.id, tempMemo);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempMemo(fridge.memo);
        setIsEditing(false);
    };

    const expiringIngredients = getExpiringSoon(fridge.id, 3);
    const recentIngredients = getRecentlyUsed(fridge.id, 5);

    // ✅ 공유 멤버 전체 리스트 (실제 멤버 + 초대 보냄 상태)
    const members = fridge.members || [];
    const pendingInvites = fridge.pendingInvites || [];
    const allMembers = Array.from(new Set([...members, ...pendingInvites]));

    return (
        <div className="boards p-3 md:min-w-[380px] md:min-h-[320px] bg-amber-100 rounded-b-lg z-12 relative">
            {selectedBoardMenu === "memo" && (
                <>
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
                        <div className="flex flex-col gap-4">
                            {/* 메모 */}
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

                            {/* 공유 멤버 리스트 */}
                            <div className="mt-2">
                                <h3 className="font-bold mb-1">공유 멤버</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {allMembers.map((nickname, idx) => (
                                        <li key={idx}>
                                            {nickname}
                                            {pendingInvites.includes(nickname) ? " (초대 보냄)" : ""}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            )}

            {selectedBoardMenu === "expiry" && (
                <div>
                    <h3 className="font-bold mb-2">소비기한 임박 재료</h3>
                    {expiringIngredients.length === 0 ? (
                        <p className="text-sm text-gray-600">임박한 재료가 없습니다.</p>
                    ) : (
                        <ul className="list-disc pl-5 space-y-1">
                            {expiringIngredients.map((ing) => (
                                <li key={ing.id}>
                                    {ing.name} (
                                    {new Date(ing.expirationDate).toLocaleDateString()})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {selectedBoardMenu === "recent" && (
                <div>
                    <h3 className="font-bold mb-2">최근 사용한 재료</h3>
                    {recentIngredients.length === 0 ? (
                        <p className="text-sm text-gray-600">최근 사용된 재료가 없습니다</p>
                    ) : (
                        <ul className="list-disc pl-5 space-y-1">
                            {recentIngredients.map((ing) => (
                                <li key={ing.id}>
                                    {ing.name} (
                                    {ing.usedAt
                                        ? new Date(ing.usedAt).toLocaleString()
                                        : "시간 없음"}
                                    )
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};
