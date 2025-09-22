// src/components/StorageBox.tsx
import React from "react";

interface StorageBoxProps {
    name?: string;
    items?: string[]; // 식재료 카테고리 이모지 배열
    color?: "green" | "blue"; // 배경색 선택
    onClick?: () => void;
}

export const StorageBox: React.FC<StorageBoxProps> = ({
                                                          name = "",
                                                          items = [],
                                                          color = "green",
                                                          onClick,
                                                      }) => {
    const displayItems = items.slice(0, 8);
    const hasMore = items.length > 8;

    return (
        <div
            className="storage_box_wrap max-w-52 h-60 cursor-pointer"
            onClick={onClick}
        >
            <div className="compartment_name">
        <span className="text-base font-bold text-blue-950 p-1 inline-block">
          {name}
        </span>
            </div>
            <div
                className={`storage_box w-[200px] h-[220px] border-gray-50 border-4 rounded-xl p-3 flex flex-wrap content-start gap-1 items-center justify-center ${
                    color === "green" ? "bg-green-600 text-white" : "bg-sky-300 text-white"
                }`}
            >
                {displayItems.length > 0 ? (
                    displayItems.map((emoji, idx) => (
                        <span key={idx} className="text-xl">
              {emoji}
            </span>
                    ))
                ) : (
                    // items 없으면 중앙에 name + 또는 아무 표시
                    <span className="text-3xl font-bold">{name === "새 칸 추가" ? "+" : ""}</span>
                )}
                {hasMore && <span className="text-xl font-bold">…</span>}
            </div>
        </div>
    );
};

// 색상 전용 래퍼
export const StorageBoxGreen: React.FC<Omit<StorageBoxProps, "color">> = (props) => (
    <StorageBox {...props} color="green" />
);
export const StorageBoxBlue: React.FC<Omit<StorageBoxProps, "color">> = (props) => (
    <StorageBox {...props} color="blue" />
);

// 추가 버튼 전용 (선택적으로 사용 가능)
export const StorageBoxAddButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <StorageBoxBlue name="새 칸 추가" items={["+"]} onClick={onClick} />
);

export default StorageBox;
