// src/FridgeStores/fridgeStore.ts
import { create } from "zustand";
import { persistFridges, loadFridges } from "../FridgeDetails/FridgeUtil.tsx";

export interface Fridge {
    id: string;
    name: string;
    memo: string;
    isFavorite: boolean;
    isDefault: boolean;
    members: string[];
    boxes: string[];
    owner: string; // 최초 생성자 (권한 체크용)
}

interface FridgeState {
    fridges: Fridge[];
    currentUser: string; // 로그인한 유저 (임시)
    addFridge: (name: string) => void;
    toggleFavorite: (id: string) => void;
    setDefaultFridge: (id: string) => void;
    updateMemo: (id: string, memo: string) => void;
    addMember: (id: string, member: string) => void;
    removeMember: (id: string, member: string) => void;
    reorderFridges: (ids: string[]) => void;
}

export const useFridgeStore = create<FridgeState>((set, get) => ({
    currentUser: "me@example.com", // 나중에 로그인과 연동

    // ✅ 초기값을 로컬스토리지에서 불러오고, 없으면 기본값 사용
    fridges:
        loadFridges() || [
            {
                id: "fridge-1",
                name: "냉장고 1",
                memo: "",
                isFavorite: true,
                isDefault: true,
                members: [],
                boxes: [],
                owner: "me@example.com",
            },
            {
                id: "fridge-2",
                name: "냉장고 2",
                memo: "",
                isFavorite: false,
                isDefault: false,
                members: [],
                boxes: [],
                owner: "me@example.com",
            },
        ],

    addFridge: (name) =>
        set((state) => {
            const updated = [
                ...state.fridges,
                {
                    id: `fridge-${Date.now()}`,
                    name,
                    memo: "",
                    isFavorite: false,
                    isDefault: state.fridges.length === 0,
                    members: [],
                    boxes: [],
                    owner: state.currentUser,
                },
            ];
            persistFridges(updated); // ✅ 추가 후 저장
            return { fridges: updated };
        }),

    toggleFavorite: (id) =>
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, isFavorite: !f.isFavorite } : f
            );
            persistFridges(updated); // ✅ 저장
            return { fridges: updated };
        }),

    setDefaultFridge: (id) =>
        set((state) => {
            const updated = state.fridges.map((f) => {
                if (f.id === id) {
                    // 새 기본냉장고 → 기본+즐겨찾기 true
                    return { ...f, isDefault: true, isFavorite: true };
                }
                if (f.isDefault) {
                    // 기존 기본냉장고 → 기본 해제, 즐겨찾기는 유지
                    return { ...f, isDefault: false, isFavorite: f.isFavorite };
                }
                return f;
            });
            persistFridges(updated); // ✅ 저장
            return { fridges: updated };
        }),

    updateMemo: (id, memo) =>
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, memo } : f
            );
            persistFridges(updated); // ✅ 저장
            return { fridges: updated };
        }),

    addMember: (id, member) =>
        set((state) => {
            const fridge = state.fridges.find((f) => f.id === id);
            if (!fridge) return state;
            if (fridge.owner !== state.currentUser) return state; // 권한 체크
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, members: [...f.members, member] } : f
            );
            persistFridges(updated); // ✅ 저장
            return { fridges: updated };
        }),

    removeMember: (id, member) =>
        set((state) => {
            const fridge = state.fridges.find((f) => f.id === id);
            if (!fridge) return state;
            if (fridge.owner !== state.currentUser) return state; // 권한 체크
            const updated = state.fridges.map((f) =>
                f.id === id
                    ? { ...f, members: f.members.filter((m) => m !== member) }
                    : f
            );
            persistFridges(updated); // ✅ 저장
            return { fridges: updated };
        }),

    reorderFridges: (ids) =>
        set((state) => {
            const map = new Map(state.fridges.map((f) => [f.id, f]));
            const reordered = ids.map((id) => map.get(id)!).filter(Boolean);
            persistFridges(reordered); // ✅ 저장
            return { fridges: reordered };
        }),
}));
