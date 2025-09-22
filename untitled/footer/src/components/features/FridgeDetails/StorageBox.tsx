import React from "react";
import { FoodCategory, StorageCompartment } from "./types.ts";

interface StorageBoxProps {
    compartment: StorageCompartment;
    onClick: (compartment: StorageCompartment) => void;
}

const categoryEmoji: Record<FoodCategory, string> = {
    vegetable: '🥬',
    fruit: '🍎',
    meat: '🥩',
    seafood: '🐟',
    dairy: '🥛',
    grain: '🍞',
    processed: '🥫',
    beverage: '🧃',
    seasoning: '🧂',
    etc: '🧊',
};

const IconGrid: React.FC<{ compartment: StorageCompartment }> = ({ compartment }) => {
    // Get unique categories from items, limited to 9
    const uniqueCategories = Array.from(new Set(compartment.items.map(item => item.category))).slice(0, 9);

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full p-4">
            {Array.from({ length: 9 }).map((_, index) => {
                const category = uniqueCategories[index];
                return (
                    <div key={index} className="flex items-center justify-center text-3xl bg-white bg-opacity-30 rounded-full w-14 h-14 mx-auto">
                        {category ? categoryEmoji[category] : ''}
                    </div>
                );
            })}
        </div>
    );
};

export const StorageBoxGreen: React.FC<StorageBoxProps> = ({ compartment, onClick }) => {
    return (
        <div className={"storage_box_wrap max-w-52 h-60 cursor-pointer"} onClick={() => onClick(compartment)}>
            <div className={"compartment_name"}>
                <span className={"text-base font-bold text-blue-950 p-1 inline-block"}>{compartment.name}</span>
            </div>
            <div className={"storage_box w-[200px] h-[220px] bg-green-600 border-gray-50 border-4 rounded-xl p-3 flex items-center justify-center"}>
                <IconGrid compartment={compartment} />
            </div>
        </div>
    );
}

export const StorageBoxBlue: React.FC<StorageBoxProps> = ({ compartment, onClick }) => {
    return (
        <div className={"storage_box_wrap max-w-52 h-60 cursor-pointer"} onClick={() => onClick(compartment)}>
            <div className={"compartment_name"}>
                <span className={"text-base font-bold text-blue-950 p-1 inline-block"}>{compartment.name}</span>
            </div>
            <div className={"storage_box w-[200px] h-[220px] bg-sky-300 border-gray-50 border-4 rounded-xl p-3 flex items-center justify-center"}>
                <IconGrid compartment={compartment} />
            </div>
        </div>
    );
}
