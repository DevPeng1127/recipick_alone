import { BoardContents } from "./BoardContents.tsx";
import { BoardMenus } from "./BoardMenus.tsx";
import { useState } from "react";
import { BoardData } from "./types.ts";

interface FridgeBoardsProps {
    data: BoardData;
}

export type ActiveTab = 'memo' | 'expiry' | 'recent';

const FridgeBoards: React.FC<FridgeBoardsProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('memo');

    return (
        <div className={"fridge_boards_wrap md:w-[450px] h-[385px] p-3 m-2 bg-emerald-800"}>
            <BoardMenus activeTab={activeTab} setActiveTab={setActiveTab} />
            <BoardContents activeTab={activeTab} data={data} />
        </div>
    );
}

export default FridgeBoards;