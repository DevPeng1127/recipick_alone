import * as React from "react";
import { ActiveTab } from "./FridgeBoards.tsx";
import { BoardData } from "./types.ts";

interface BoardContentsProps {
    activeTab: ActiveTab;
    data: BoardData;
}

export const BoardContents: React.FC<BoardContentsProps> = ({ activeTab, data }) => {
    const renderContent = () => {
        switch (activeTab) {
            case 'memo':
                return (
                    <ul>
                        {data.memos.map(memo => (
                            <li key={memo.id} className="p-2 border-b border-amber-300">📝 {memo.content}</li>
                        ))}
                    </ul>
                );
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
}