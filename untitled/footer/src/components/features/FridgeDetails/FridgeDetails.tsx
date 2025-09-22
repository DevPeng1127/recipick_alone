import React, { useEffect } from "react";
import FridgeBoards from "./FridgeBoards";
import FridgePantry from "./FridgePantry";
import FridgeFreezer from "./FridgeFreezer";
import FridgeRefrigerator from "./FridgeRefrigerator";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import { useParams } from "react-router-dom";

const FridgeDetails: React.FC = () => {
    const { id: fridgeId } = useParams<{ id: string }>();
    const fridges = useFridgeStore((state) => state.fridges);
    const setSelectedFridge = useFridgeStore((state) => state.setSelectedFridge);

    useEffect(() => {
        if (fridgeId) setSelectedFridge(fridgeId);
    }, [fridgeId, setSelectedFridge]);

    const fridge = fridges.find((f) => f.id === fridgeId);

    if (!fridge) return <div className="p-4 text-center">냉장고 정보를 불러오는 중...</div>;

    return (
        <div className="flex flex-row justify-center">
            <div className="boardAndPantry w-[460px]">
                <FridgeBoards />
                <FridgePantry />
            </div>
            <div className="freezerAndFridge w-[460px]">
                <FridgeFreezer />
                <FridgeRefrigerator />
            </div>
        </div>
    );
};

export default FridgeDetails;
