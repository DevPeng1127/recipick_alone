import { FoodItem } from "./types.ts";

interface StorageBoxProps {
    name: string;
    items: FoodItem[];
}

const FoodListItem: React.FC<{ item: FoodItem }> = ({ item }) => (
    <div className="text-sm text-white bg-black bg-opacity-20 rounded-md px-2 py-1 mb-1 flex justify-between">
        <span>{item.name}</span>
        <span className="font-semibold">{item.quantity}</span>
    </div>
);

export const StorageBoxGreen: React.FC<StorageBoxProps> = ({ name, items }) => {
    return (
        <div className={"storage_box_wrap max-w-52 h-60"}>
            <div className={"compartment_name"}>
                <span className={"text-base font-bold text-blue-950 p-1 inline-block"}>{name}</span>
            </div>
            <div className={"storage_box w-[200px] h-[220px] bg-green-600 border-gray-50 border-4 rounded-xl p-3 overflow-y-auto"}>
                {items.map((item, index) => (
                    <FoodListItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export const StorageBoxBlue: React.FC<StorageBoxProps> = ({ name, items }) => {
    return (
        <div className={"storage_box_wrap max-w-52 h-60"}>
            <div className={"compartment_name"}>
                <span className={"text-base font-bold text-blue-950 p-1 inline-block"}>{name}</span>
            </div>
            <div className={"storage_box w-[200px] h-[220px] bg-sky-300 border-gray-50 border-4 rounded-xl p-3 overflow-y-auto"}>
                {items.map((item, index) => (
                    <FoodListItem key={index} item={item} />
                ))}
            </div>
        </div>
    );
}