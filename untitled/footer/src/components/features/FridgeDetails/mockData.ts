import { BoardData, StorageCompartment } from "./types.ts";

export const pantryData: StorageCompartment[] = [
    {
        id: 1,
        name: "곡물/면",
        items: [
            { name: "스파게티면", quantity: "1봉", category: "grain" },
            { name: "햇반", quantity: "5개", category: "grain" },
            { name: "라면", quantity: "3개", category: "processed" },
        ],
    },
    {
        id: 2,
        name: "소스/조미료",
        items: [
            { name: "올리브유", quantity: "1병", category: "seasoning" },
            { name: "소금", quantity: "1통", category: "seasoning" },
            { name: "간장", quantity: "1병", category: "seasoning" },
        ],
    },
    {
        id: 3,
        name: "통조림/건조",
        items: [
            { name: "참치캔", quantity: "3개", category: "processed" },
            { name: "건미역", quantity: "1봉", category: "seafood" },
        ],
    },
];

export const freezerData: StorageCompartment[] = [
    {
        id: 1,
        name: "냉동 육류",
        items: [
            { name: "냉동 삼겹살", quantity: "600g", category: "meat" },
            { name: "다진 소고기", quantity: "250g", category: "meat" },
        ],
    },
    {
        id: 2,
        name: "냉동 해산물",
        items: [
            { name: "새우", quantity: "1팩", category: "seafood" },
            { name: "오징어", quantity: "2마리", category: "seafood" },
        ],
    },
    {
        id: 3,
        name: "냉동 식품",
        items: [
            { name: "냉동 만두", quantity: "1봉", category: "processed" },
            { name: "아이스크림", quantity: "1통", category: "dairy" },
            { name: "블루베리", quantity: "500g", category: "fruit" },
        ],
    },
];

export const refrigeratorData: StorageCompartment[] = [
    {
        id: 1, name: "채소칸", items: [
            { name: "양파", quantity: "3개", category: "vegetable" },
            { name: "대파", quantity: "1단", category: "vegetable" },
            { name: "양상추", quantity: "1통", category: "vegetable" },
        ],
    },
    {
        id: 2, name: "과일칸", items: [
            { name: "사과", quantity: "4개", category: "fruit" },
            { name: "바나나", quantity: "1송이", category: "fruit" },
        ],
    },
    {
        id: 3, name: "반찬/메인", items: [
            { name: "계란", quantity: "10개", category: "etc" },
            { name: "두부", quantity: "1모", category: "processed" },
            { name: "김치", quantity: "1통", category: "vegetable" },
        ],
    },
    {
        id: 4, name: "음료/유제품", items: [
            { name: "우유", quantity: "1L", category: "dairy" },
            { name: "치즈", quantity: "1팩", category: "dairy" },
            { name: "오렌지주스", quantity: "1.5L", category: "beverage" },
        ],
    },
    {
        id: 5, name: "신선 육류", items: [
            { name: "닭가슴살", quantity: "2팩", category: "meat" },
            { name: "돼지고기 목살", quantity: "500g", category: "meat" },
        ],
    },
    {
        id: 6, name: "기타", items: [
            { name: "쌈장", quantity: "1통", category: "seasoning" },
            { name: "버터", quantity: "1개", category: "dairy" },
        ],
    },
];

export const boardData: BoardData = {
    memo: "이번 주말에 카레 만들기\n- 우유, 계란 사오기!\n- 양파 거의 다 먹어감",
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
