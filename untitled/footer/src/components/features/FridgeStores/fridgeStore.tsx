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
    owner: string;
    isDeleted: boolean; // soft delete 플래그
}

interface FridgeState {
    fridges: Fridge[];
    currentUser: string;

    addFridge: (name: string) => void;
    toggleFavorite: (id: string) => void;
    setDefaultFridge: (id: string) => void;
    updateMemo: (id: string, memo: string) => void;
    addMember: (id: string, member: string) => void;
    removeMember: (id: string, member: string) => void;
    reorderFridges: (ids: string[]) => void;

    updateFridgeName: (id: string, name: string) => void;
    deleteFridge: (id: string) => Promise<boolean>;
}

async function fakeApiDeleteFridge(id: string) {
    return new Promise<void>((resolve) => setTimeout(resolve, 300));
}

export const useFridgeStore = create<FridgeState>((set, get) => ({
    currentUser: "me@example.com",

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
                isDeleted: false,
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
                isDeleted: false,
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
                    isDeleted: false,
                },
            ];
            persistFridges(updated);
            return { fridges: updated };
        }),

    toggleFavorite: (id) =>
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, isFavorite: !f.isFavorite } : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    setDefaultFridge: (id) =>
        set((state) => {
            const updated = state.fridges.map((f) => {
                if (f.id === id) return { ...f, isDefault: true, isFavorite: true };
                if (f.isDefault) return { ...f, isDefault: false, isFavorite: f.isFavorite };
                return f;
            });
            persistFridges(updated);
            return { fridges: updated };
        }),

    updateMemo: (id, memo) =>
        set((state) => {
            const updated = state.fridges.map((f) => (f.id === id ? { ...f, memo } : f));
            persistFridges(updated);
            return { fridges: updated };
        }),

    addMember: (id, member) =>
        set((state) => {
            const fridge = state.fridges.find((f) => f.id === id);
            if (!fridge) return state;
            if (fridge.owner !== state.currentUser) return state;
            if (fridge.members.includes(member)) return state;
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, members: [...f.members, member] } : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    removeMember: (id, member) =>
        set((state) => {
            const fridge = state.fridges.find((f) => f.id === id);
            if (!fridge) return state;
            if (fridge.owner !== state.currentUser) return state;
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, members: f.members.filter((m) => m !== member) } : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    reorderFridges: (ids) =>
        set((state) => {
            const map = new Map(state.fridges.map((f) => [f.id, f]));
            const reordered = ids.map((id) => map.get(id)!).filter(Boolean);
            persistFridges(reordered);
            return { fridges: reordered };
        }),

    updateFridgeName: (id, name) =>
        set((state) => {
            const updated = state.fridges.map((f) => (f.id === id ? { ...f, name } : f));
            persistFridges(updated);
            return { fridges: updated };
        }),

    deleteFridge: async (id) => {
        const store = get();
        const fridge = store.fridges.find((f) => f.id === id);
        if (!fridge) return false;

        if (fridge.isDefault) return false; // 기본 냉장고는 삭제 불가

        await fakeApiDeleteFridge(id);
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, isDeleted: true } : f
            );
            persistFridges(updated);
            return { fridges: updated };
        });
        return true;
    },
}));
