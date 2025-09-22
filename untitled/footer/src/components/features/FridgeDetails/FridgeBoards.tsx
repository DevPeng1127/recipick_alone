import { BoardContents } from "./BoardContents";
import { BoardMenus } from "./BoardMenus";

const FridgeBoards = () => {
    return (
        <div className="fridge_boards_wrap md:w-[450px] h-[385px] p-3 m-2 bg-emerald-800">
            <BoardMenus />
            <BoardContents />
        </div>
    );
};

export default FridgeBoards;
