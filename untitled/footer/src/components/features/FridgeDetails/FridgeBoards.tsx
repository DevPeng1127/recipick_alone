import { BoardContents } from "./BoardContents.tsx";
import { BoardMenus } from "./BoardMenus.tsx";
import { useState } from "react";
import { BoardData } from "./types.ts";

interface FridgeBoardsProps {
    initialData: BoardData;
}

export type ActiveTab = 'memo' | 'expiry' | 'recent';

const FridgeBoards: React.FC<FridgeBoardsProps> = ({ initialData }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('memo');
    const [boardData, setBoardData] = useState<BoardData>(initialData);

    const handleSaveMemo = (newMemo: string) => {
        setBoardData(prevData => ({ ...prevData, memo: newMemo }));
        // Here you would typically also make an API call to save the data
    };

    return (
        <div className={"fridge_boards_wrap md:w-[450px] h-[385px] p-3 m-2 bg-emerald-800"}>
            <BoardMenus activeTab={activeTab} setActiveTab={setActiveTab} />
            <BoardContents activeTab={activeTab} data={boardData} onSaveMemo={handleSaveMemo} />
        </div>
    );
}

export default FridgeBoards;
