import React from "react";

export const StorageBoxGreen = () => {
    return (
        <div className={"storage_box_wrap max-w-52 h-60"}>
            <div className={"compartment_name"}>
                <span className={"text-base font-bold text-blue-950 p-1 inline-block"}>칸이름 여기</span>
            </div>
            <div className={"storage_box w-[200px] h-[220px] bg-green-600 border-gray-50 border-4 rounded-xl p-3"}>
                여기에 식재료들
            </div>
        </div>
    );
}

export const StorageBoxBlue = () => {
    return (
        <div className={"storage_box_wrap max-w-52 h-60"}>
            <div className={"compartment_name"}>
                <span className={"text-base font-bold text-blue-950 p-1 inline-block"}>칸이름 여기</span>
            </div>
            <div className={"storage_box w-[200px] h-[220px] bg-sky-300 border-gray-50 border-4 rounded-xl p-3"}>
                여기에 식재료들
            </div>
        </div>
    );
}


interface StorageBoxAddButtonProps {
    onClick?: () => void;
}

export const StorageBoxAddButton: React.FC<StorageBoxAddButtonProps> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className="storage_box_wrap max-w-52 h-60 flex flex-col items-center cursor-pointer
                 hover:scale-105 transition-transform duration-200"
        >
            <div className="compartment_name">
        <span className="text-base font-bold text-gray-400 p-1 inline-block">
          새 칸 추가
        </span>
            </div>
            <div
                className="storage_box w-[200px] h-[220px] bg-white bg-opacity-30 border-gray-200 border-4
                   rounded-xl p-3 flex items-center justify-center shadow-md hover:shadow-lg
                   transition-shadow duration-200"
            >
                <span className="text-5xl text-gray-500">+</span>
            </div>
        </div>
    );
};

interface StorageBoxProps {
    boxName: string;
    ingredients: { id: string; name: string; category: string }[];
    onClick: () => void;
}

const StorageBox: React.FC<StorageBoxProps> = ({ boxName, ingredients, onClick }) => {
    return (
        <div className="storage_box_wrap max-w-52 h-60 cursor-pointer" onClick={onClick}>
            <div className="compartment_name mb-1">
                <span className="text-base font-bold text-blue-950">{boxName}</span>
            </div>
            <div className="storage_box w-[200px] h-[220px] bg-green-600 border-gray-50 border-4 rounded-xl p-2 flex flex-wrap gap-1 items-center justify-center">
                {ingredients.slice(0, 6).map((ing) => (
                    <div
                        key={ing.id}
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm"
                        title={ing.name}
                    >
                        {ing.emoji /* CompartmentDetails에서 매핑해서 넣어줌 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StorageBox;