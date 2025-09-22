import { BoardData, StorageCompartment } from "./types.ts";

export const pantryData: StorageCompartment[] = [
    {
        id: 1,
        name: "곡물/면",
        items: [
            { name: "스파게티면", quantity: "1봉" },
            { name: "햇반", quantity: "5개" },
            { name: "라면", quantity: "3개" },
        ],
    },
    {
        id: 2,
        name: "소스/조미료",
        items: [
            { name: "올리브유", quantity: "1병" },
            { name: "소금", quantity: "1통" },
            { name: "간장", quantity: "1병" },
            { name: "설탕", quantity: "1봉" },
        ],
    },
    {
        id: 3,
        name: "통조림/건조식품",
        items: [
            { name: "참치캔", quantity: "3개" },
            { name: "건미역", quantity: "1봉" },
        ],
    },
];

export const freezerData: StorageCompartment[] = [
    {
        id: 1,
        name: "냉동 육류",
        items: [
            { name: "냉동 삼겹살", quantity: "600g" },
            { name: "다진 소고기", quantity: "250g" },
        ],
    },
    {
        id: 2,
        name: "냉동 해산물",
        items: [
            { name: "새우", quantity: "1팩" },
            { name: "오징어", quantity: "2마리" },
        ],
    },
    {
        id: 3,
        name: "냉동 식품",
        items: [
            { name: "냉동 만두", quantity: "1봉" },
            { name: "아이스크림", quantity: "1통" },
            { name: "블루베리", quantity: "500g" },
        ],
    },
];

export const refrigeratorData: StorageCompartment[] = [
    {
        id: 1,
        name: "채소칸",
        items: [
            { name: "양파", quantity: "3개" },
            { name: "대파", quantity: "1단" },
            { name: "양상추", quantity: "1통" },
            { name: "파프리카", quantity: "2개" },
        ],
    },
    {
        id: 2,
        name: "과일칸",
        items: [
            { name: "사과", quantity: "4개" },
            { name: "바나나", quantity: "1송이" },
        ],
    },
    {
        id: 3,
        name: "반찬/메인",
        items: [
            { name: "계란", quantity: "10개" },
            { name: "두부", quantity: "1모" },
            { name: "김치", quantity: "1통" },
        ],
    },
    {
        id: 4,
        name: "음료/유제품",
        items: [
            { name: "우유", quantity: "1L" },
            { name: "치즈", quantity: "1팩" },
            { name: "오렌지주스", quantity: "1.5L" },
        ],
    },
    {
        id: 5,
        name: "신선 육류",
        items: [
            { name: "닭가슴살", quantity: "2팩" },
            { name: "돼지고기 목살", quantity: "500g" },
        ],
    },
    {
        id: 6,
        name: "기타",
        items: [
            { name: "쌈장", quantity: "1통" },
            { name: "버터", quantity: "1개" },
        ],
    },
];

export const boardData: BoardData = {
    memos: [
        { id: 1, content: "이번 주말에 카레 만들기" },
        { id: 2, content: "우유, 계란 사오기!" },
        { id: 3, content: "양파 거의 다 먹어감" },
    ],
    expiries: [
        { id: 1, name: "우유", daysLeft: 2 },
        { id: 2, name: "두부", daysLeft: 3 },
        { id: 3, name: "닭가슴살", daysLeft: 5 },
    ],
    recents: [
        { id: 1, name: "계란", usedAt: "2025-09-22" },
        { id: 2, name: "대파", usedAt: "2025-09-22" },
        { id: 3, name: "양파", usedAt: "2025-09-21" },
    ],
};