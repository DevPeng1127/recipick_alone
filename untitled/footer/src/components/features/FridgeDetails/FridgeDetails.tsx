import React, { useState } from "react";
import FridgeBoards from "./FridgeBoards.tsx";
import FridgePantry from "./FridgePantry.tsx";
import FridgeFreezer from "./FridgeFreezer.tsx";
import FridgeRefrigerator from "./FridgeRefrigerator.tsx";
import { boardData, freezerData, pantryData, refrigeratorData } from "./mockData.ts";
import { StorageCompartment } from "./types.ts";
import CompartmentDetails from "../CompartmentDetails/CompartmentDetails.tsx";

const FridgeDetails: React.FC = () => {
    const [pantryState, setPantryState] = useState<StorageCompartment[]>(pantryData);
    const [freezerState, setFreezerState] = useState<StorageCompartment[]>(freezerData);
    const [refrigeratorState, setRefrigeratorState] = useState<StorageCompartment[]>(refrigeratorData);

    const [selectedCompartment, setSelectedCompartment] = useState<StorageCompartment | null>(null);

    const handleCompartmentClick = (compartment: StorageCompartment) => {
        setSelectedCompartment(compartment);
    };

    const handleCloseModal = () => {
        setSelectedCompartment(null);
    };

    const handleSaveCompartment = (id: number, newName: string) => {
        const updateState = (setter: React.Dispatch<React.SetStateAction<StorageCompartment[]>>) => {
            setter(prev => prev.map(c => c.id === id ? { ...c, name: newName } : c));
        };

        updateState(setPantryState);
        updateState(setFreezerState);
        updateState(setRefrigeratorState);

        handleCloseModal();
    };

    const handleDeleteCompartment = (id: number) => {
        const updateState = (setter: React.Dispatch<React.SetStateAction<StorageCompartment[]>>) => {
            setter(prev => prev.filter(c => c.id !== id));
        };

        updateState(setPantryState);
        updateState(setFreezerState);
        updateState(setRefrigeratorState);

        handleCloseModal();
    };

    return (
        <div className={"flex flex-row justify-center"}>
            <div className={"boardAndPantry w-[460px]"}>
                <FridgeBoards initialData={boardData} />
                <FridgePantry data={pantryState} onCompartmentClick={handleCompartmentClick} />
            </div>
            <div className="freezerAndFridge w-[460px]">
                <FridgeFreezer data={freezerState} onCompartmentClick={handleCompartmentClick} />
                <FridgeRefrigerator data={refrigeratorState} onCompartmentClick={handleCompartmentClick} />
            </div>

            {selectedCompartment && (
                <CompartmentDetails
                    compartment={selectedCompartment}
                    onClose={handleCloseModal}
                    onSave={handleSaveCompartment}
                    onDelete={handleDeleteCompartment}
                />
            )}
        </div>
    );
};

export default FridgeDetails;

