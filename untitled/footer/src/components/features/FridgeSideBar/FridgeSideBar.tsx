// src/components/FridgeSideBar.tsx
import React from "react";

interface FridgeInviteProps {
    fridgeName: string;
    owner: string;
    onAccept: () => void;
    onDecline: () => void;
}

export const FridgeInvite: React.FC<FridgeInviteProps> = ({
                                                              fridgeName,
                                                              owner,
                                                              onAccept,
                                                              onDecline,
                                                          }) => {
    return (
        <div className="bg-gray-400 border rounded-lg p-4 shadow-md w-full max-w-sm">
            <p className="mb-4 text-gray-900">
                {owner}님이 <span className="font-semibold">'{fridgeName}'</span> 냉장고를 공유하려고 합니다.
                수락하시겠습니까?
            </p>
            <div className="flex gap-2 justify-end">
                <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    onClick={onDecline}
                >
                    거절
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={onAccept}
                >
                    수락
                </button>
            </div>
        </div>
    );
};

export default FridgeInvite;
