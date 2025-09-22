import React, { useState, useEffect } from "react";
import { ActiveTab } from "./FridgeBoards.tsx";
import { BoardData } from "./types.ts";

interface BoardContentsProps {
    activeTab: ActiveTab;
    data: BoardData;
    onSaveMemo: (newMemo: string) => void;
}

export const BoardContents: React.FC<BoardContentsProps> = ({ activeTab, data, onSaveMemo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(data.memo);

    useEffect(() => {
        setEditText(data.memo);
    }, [data.memo]);

    const handleSave = () => {
        onSaveMemo(editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(data.memo);
        setIsEditing(false);
    };

    const renderMemoContent = () => {
        if (isEditing) {
            return (
                <div className="flex flex-col h-full">
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-grow w-full p-2 border rounded border-amber-300 resize-none"
                    />
                    <div className="flex justify-end mt-2">
                        <button onClick={handleCancel} className="px-4 py-1 mr-2 bg-gray-300 rounded hover:bg-gray-400">
                            취소
                        </button>
                        <button onClick={handleSave} className="px-4 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                            저장
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <div className="relative h-full">
                <p className="whitespace-pre-wrap">{data.memo}</p>
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-2 right-2 px-3 py-1 bg-amber-300 rounded hover:bg-amber-400 text-sm font-semibold"
                >
                    수정
                </button>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'memo':
                return renderMemoContent();
            case 'expiry':
                return (
                    <ul>
                        {data.expiries.map(item => (
                            <li key={item.id} className="p-2 border-b border-amber-300 flex justify-between">
                                <span>{item.name}</span>
                                <span className={`font-bold ${item.daysLeft <= 3 ? 'text-red-600' : 'text-orange-600'}`}>
                                    D-{item.daysLeft}
                                </span>
                            </li>
                        ))}
                    </ul>
                );
            case 'recent':
                return (
                    <ul>
                        {data.recents.map(item => (
                            <li key={item.id} className="p-2 border-b border-amber-300">
                                {item.name} <span className="text-gray-600 text-sm">({item.usedAt})</span>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div className={"boards p-3 md:min-w-[380px] md:min-h-[320px] bg-amber-100 rounded-b-lg z-12"}>
            {renderContent()}
        </div>
    );
};
