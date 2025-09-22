import * as React from "react";
import { ActiveTab } from "./FridgeBoards.tsx";

interface BoardMenusProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
}

export const BoardMenus: React.FC<BoardMenusProps> = ({ activeTab, setActiveTab }) => {
    const getMenuStyle = (tabName: ActiveTab) => {
        return `board_menu p-1.5 inline-block md:min-w-[70px] md:min-h-[15px] rounded-t-lg z-11 cursor-pointer transition-colors ${
            activeTab === tabName ? 'bg-amber-100 font-bold' : 'bg-amber-200 hover:bg-amber-50'
        }`;
    };

    return (
        <div className={"flex justify-between max-w-full md:max-w-full lg:max-w-full"}>
            <div className={getMenuStyle('memo')} onClick={() => setActiveTab('memo')}>
                <span className={"px-4"}>메 모</span>
            </div>
            <div className={getMenuStyle('expiry')} onClick={() => setActiveTab('expiry')}>
                <span className={"px-4"}>소비기한</span>
            </div>
            <div className={getMenuStyle('recent')} onClick={() => setActiveTab('recent')}>
                <span className={"px-4"}>최근 사용</span>
            </div>
        </div>
    );
}