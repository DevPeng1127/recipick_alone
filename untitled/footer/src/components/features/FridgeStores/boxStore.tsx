import { create } from "zustand";

interface StorageBox {
    id: string;
    color: "blue" | "green"; // 확장성 고려 (FridgeRefrigerator에서는 blue만 사용)
    name: string;
}

interface BoxStore {
    boxes: StorageBox[];
    addBox: (box: StorageBox) => void;
}

export const useBoxStore = create<BoxStore>((set) => ({
    boxes: [
        { id: "1", color: "blue", name: "칸1" },
        { id: "2", color: "blue", name: "칸2" },
    ],
    addBox: (box) =>
        set((state) => ({
            boxes: [...state.boxes, box],
        })),
}));
