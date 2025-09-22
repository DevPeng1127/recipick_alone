import * as React from "react";
import { useFridgeStore } from "../FridgeStores/fridgeStore";

export const BoardMenus: React.FC = () => {
    const selectedBoardMenu = useFridgeStore((state) => state.selectedBoardMenu);
    const setSelectedBoardMenu = useFridgeStore((state) => state.setSelectedBoardMenu);

    return (
        <div className="flex justify-between max-w-full md:max-w-full lg:max-w-full">
            <div
                className={`board_menu p-1.5 inline-block md:min-w-[70px] md:min-h-[15px] rounded-t-lg cursor-pointer ${
                    selectedBoardMenu === "memo" ? "bg-amber-100" : "bg-amber-200"
                }`}
                onClick={() => setSelectedBoardMenu("memo")}
            >
                <span className="px-4"> 메 모 </span>
            </div>
            <div
                className={`board_menu p-1.5 inline-block md:min-w-[70px] md:min-h-[15px] rounded-t-lg cursor-pointer ${
                    selectedBoardMenu === "expiry" ? "bg-amber-100" : "bg-amber-200"
                }`}
                onClick={() => setSelectedBoardMenu("expiry")}
            >
                <span className="px-4">소비기한</span>
            </div>
            <div
                className={`board_menu p-1.5 inline-block md:min-w-[70px] md:min-h-[15px] rounded-t-lg cursor-pointer ${
                    selectedBoardMenu === "recent" ? "bg-amber-100" : "bg-amber-200"
                }`}
                onClick={() => setSelectedBoardMenu("recent")}
            >
                <span className="px-4">최근 사용 식재료</span>
            </div>
        </div>
    );
};
