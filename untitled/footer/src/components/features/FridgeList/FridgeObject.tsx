// src/components/FridgeObject.tsx
import { useState } from "react";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import { FavoritesIcon, SettingsIcon } from "../FridgeButtons";

interface Props {
    fridgeId: string;
    fridgeName?: string;
}

const FridgeObject = ({ fridgeId, fridgeName = "냉장고" }: Props) => {
    const { fridges, toggleFavorite, setDefaultFridge, addMember, removeMember } =
        useFridgeStore();
    const fridge = fridges.find((f) => f.id === fridgeId)!;
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="single_fridge_wrap w-[400px] h-[350px] bg-yellow-50 m-5 p-2 rounded inline-block cursor-grab hover:shadow-lg transition-shadow object-center">
            {/* 설정 아이콘 → 모달 토글 */}
            <div className="fridge_setting m-2.5 text-right">
                <button onClick={() => setIsModalOpen(true)}>
                    <SettingsIcon />
                </button>
            </div>

            <div className="fridge_name text-green-900 text-4xl font-bold m-7">
                <span>{fridgeName}</span>
            </div>

            {/* 즐겨찾기 버튼 */}
            <div
                onClick={() => toggleFavorite(fridgeId)}
                className="fridge_fav text-right pr-5 pt-32"
            >
                <FavoritesIcon isFav={fridge.isFavorite} />
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-[400px]">
                        <h2 className="text-xl font-bold mb-4">냉장고 설정</h2>

                        {/* 기본냉장고 설정 */}
                        <button
                            className="w-full py-2 mb-2 bg-green-500 text-white rounded"
                            onClick={() => {
                                setDefaultFridge(fridgeId);
                                setIsModalOpen(false);
                            }}
                        >
                            기본 냉장고로 설정
                        </button>

                        {/* 공유 멤버 목록 */}
                        <div className="mb-4">
                            <h3 className="font-semibold">공유 멤버</h3>
                            <ul className="mb-2">
                                {fridge.members.map((m) => (
                                    <li key={m} className="flex justify-between">
                                        {m}
                                        <button
                                            className="text-red-500"
                                            onClick={() => removeMember(fridgeId, m)}
                                        >
                                            제거
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className="w-full py-1 bg-blue-500 text-white rounded"
                                onClick={() => addMember(fridgeId, prompt("멤버 이메일?") || "")}
                            >
                                멤버 추가
                            </button>
                        </div>

                        <button
                            className="mt-4 w-full py-2 bg-gray-300 rounded"
                            onClick={() => setIsModalOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FridgeObject;
