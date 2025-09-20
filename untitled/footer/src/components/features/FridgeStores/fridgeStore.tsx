import { create } from "zustand";

interface FavoriteStore {
    favorites: Record<string, boolean>; // fridgeId별 즐겨찾기 상태
    toggleFavorite: (id: string) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
    favorites: {},
    toggleFavorite: (id: string) =>
        set((state) => ({
            favorites: { ...state.favorites, [id]: !state.favorites[id] },
        })),
}));


/*
// src/store/fridgeStore.ts
import { create } from "zustand";

interface FridgeStore {
    favorites: Record<string, boolean>; // fridgeId별 즐겨찾기 상태
    toggleFavorite: (id: string) => void;
}

export const useFridgeStore = create<FridgeStore>((set) => ({
    favorites: {},
    toggleFavorite: (id: string) =>
        set((state) => ({
            favorites: { ...state.favorites, [id]: !state.favorites[id] },
        })),

}));

interface StorageBox {
    id: string;
    color: "blue" | "green";
    name: string;
}

interface FridgeState {
    boxes: StorageBox[];
    addBox: (box: StorageBox) => void;
}

export const useFridgeStore = create<FridgeState>((set) => ({
    boxes: [
        { id: "1", color: "blue", name: "칸1" },
        { id: "2", color: "green", name: "칸2" },
    ],
    addBox: (box) =>
        set((state) => ({
            boxes: [...state.boxes, box],
        })),
}));*/
