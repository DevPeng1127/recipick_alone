import {FavoritesIcon, SettingsIcon} from "../FridgeButtons.tsx";

interface FridgeObjectProps {
    fridgeName?: string;
}

const FridgeObject = ({ fridgeName = "냉장고 이름" }: FridgeObjectProps) => {
    return (
        <div className="single_fridge_wrap w-[400px] h-[350px] bg-yellow-50 m-5 p-2 rounded inline-block cursor-grab hover:shadow-lg transition-shadow">
            <div className="fridge_setting m-2.5 justify-items-end">
                <SettingsIcon />
            </div>
            <div className="fridge_name text-green-900 text-4xl font-bold m-7">
                <span>{fridgeName}</span>
            </div>
            <div className="fridge_fav justify-items-end pr-5 pt-32">
                <FavoritesIcon />
            </div>
        </div>
    );
};

export default FridgeObject;