import FridgeBoards from "./FridgeBoards.tsx";
import FridgePantry from "./FridgePantry.tsx";
import FridgeFreezer from "./FridgeFreezer.tsx";
import FridgeRefrigerator from "./FridgeRefrigerator.tsx";
import { boardData, freezerData, pantryData, refrigeratorData } from "./mockData.ts";

const FridgeDetails = () => {
    return (
        <div className={"flex flex-row justify-center"}>
            <div className={"boardAndPantry w-[460px]"}>
                <FridgeBoards data={boardData} />
                <FridgePantry data={pantryData} />
            </div>
            <div className="freezerAndFridge w-[460px]">
                <FridgeFreezer data={freezerData} />
                <FridgeRefrigerator data={refrigeratorData} />
            </div>
        </div>
    );
}

export default FridgeDetails;