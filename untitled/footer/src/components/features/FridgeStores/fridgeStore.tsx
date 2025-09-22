// src/FridgeStores/fridgeStore.ts
import { create } from "zustand";
import { persistFridges, loadFridges } from "../FridgeDetails/FridgeUtil.tsx";

export type CompartmentType = "pantry" | "refrigerator" | "freezer";

export interface StorageBox {
    id: string;
    name: string;
    color: string; // compartment별 색 지정
}

export interface Fridge {
    id: string;
    name: string;
    memo: string;
    isFavorite: boolean;
    isDefault: boolean;
    members: string[];
    pendingInvites: string[];
    owner: string;
    isDeleted: boolean;
    compartments: {
        [key in CompartmentType]: StorageBox[];
    };
}

interface FridgeState {
    fridges: Fridge[];
    currentUser: string;
    selectedFridgeId: string | null;
    selectedBoardMenu: "memo" | "expiry" | "recent";

    setSelectedFridge: (id: string) => void;
    setSelectedBoardMenu: (menu: "memo" | "expiry" | "recent") => void;

    // 기존 기능
    addFridge: (name: string) => void;
    toggleFavorite: (id: string) => void;
    setDefaultFridge: (id: string) => void;
    updateMemo: (id: string, memo: string) => void;
    addMember: (id: string, member: string) => void;
    removeMember: (id: string, member: string) => void;
    addPendingInvite: (id: string, member: string) => void;
    removePendingInvite: (id: string, member: string) => void;
    updateFridgeName: (id: string, name: string) => void;
    deleteFridge: (id: string) => Promise<boolean>;

    // **추가된 칸 CRUD**
    addBox: (fridgeId: string, compartment: CompartmentType, name: string) => void;
    updateBoxName: (fridgeId: string, compartment: CompartmentType, boxId: string, name: string) => void;
    removeBox: (fridgeId: string, compartment: CompartmentType, boxId: string) => void;
}

async function fakeApiDeleteFridge(id: string) {
    return new Promise<void>((resolve) => setTimeout(resolve, 300));
}

export const useFridgeStore = create<FridgeState>((set, get) => ({
    currentUser: "김자취3498",
    fridges:
        loadFridges() || [
            {
                id: "fridge-1",
                name: "냉장고 1",
                memo: "기본 메모입니다.",
                isFavorite: true,
                isDefault: true,
                members: [],
                pendingInvites: [],
                owner: "김자취3498",
                isDeleted: false,
                compartments: {
                    pantry: [],
                    refrigerator: [],
                    freezer: [],
                },
            },
        ],
    selectedFridgeId: null,
    selectedBoardMenu: "memo",

    setSelectedFridge: (id) => set({ selectedFridgeId: id }),
    setSelectedBoardMenu: (menu) => set({ selectedBoardMenu: menu }),

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
                    pendingInvites: [],
                    owner: state.currentUser,
                    isDeleted: false,
                    compartments: {
                        pantry: [],
                        refrigerator: [],
                        freezer: [],
                    },
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
            const updated = state.fridges.map((f) => ({
                ...f,
                isDefault: f.id === id,
            }));
            persistFridges(updated);
            return { fridges: updated };
        }),

    updateMemo: (id, memo) =>
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, memo } : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    addMember: (id, member) =>
        set((state) => {
            const fridge = state.fridges.find((f) => f.id === id);
            if (!fridge || fridge.owner !== state.currentUser) return state;
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
            if (!fridge || fridge.owner !== state.currentUser) return state;
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, members: f.members.filter((m) => m !== member) } : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    addPendingInvite: (id, member) =>
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id
                    ? { ...f, pendingInvites: Array.from(new Set([...f.pendingInvites, member])) }
                    : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    removePendingInvite: (id, member) =>
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id
                    ? { ...f, pendingInvites: f.pendingInvites.filter((m) => m !== member) }
                    : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    updateFridgeName: (id, name) =>
        set((state) => {
            const updated = state.fridges.map((f) =>
                f.id === id ? { ...f, name } : f
            );
            persistFridges(updated);
            return { fridges: updated };
        }),

    deleteFridge: async (id) => {
        const fridge = get().fridges.find((f) => f.id === id);
        if (!fridge || fridge.isDefault) return false;

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

    // **Box CRUD**
    addBox: (fridgeId, compartment, name) =>
        set((state) => {
            const updated = state.fridges.map((f) => {
                if (f.id !== fridgeId) return f;
                const color = compartment === "pantry" ? "green" : compartment === "refrigerator" ? "blue" : "cyan";
                return {
                    ...f,
                    compartments: {
                        ...f.compartments,
                        [compartment]: [
                            ...f.compartments[compartment],
                            { id: `box-${Date.now()}`, name, color },
                        ],
                    },
                };
            });
            persistFridges(updated);
            return { fridges: updated };
        }),

    updateBoxName: (fridgeId, compartment, boxId, name) =>
        set((state) => {
            const updated = state.fridges.map((f) => {
                if (f.id !== fridgeId) return f;
                return {
                    ...f,
                    compartments: {
                        ...f.compartments,
                        [compartment]: f.compartments[compartment].map((b) =>
                            b.id === boxId ? { ...b, name } : b
                        ),
                    },
                };
            });
            persistFridges(updated);
            return { fridges: updated };
        }),

    removeBox: (fridgeId, compartment, boxId) =>
        set((state) => {
            const updated = state.fridges.map((f) => {
                if (f.id !== fridgeId) return f;
                return {
                    ...f,
                    compartments: {
                        ...f.compartments,
                        [compartment]: f.compartments[compartment].filter((b) => b.id !== boxId),
                    },
                };
            });
            persistFridges(updated);
            return { fridges: updated };
        }),
}));
