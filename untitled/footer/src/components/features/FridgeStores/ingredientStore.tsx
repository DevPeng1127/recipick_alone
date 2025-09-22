import { create } from "zustand";
import { persist } from "zustand/middleware";

// 식재료 타입 정의
export interface Ingredient {
    id: string;                // 기본키
    fridgeId: string;          // 어떤 냉장고 소속인지
    compartmentId: string;     // 보관칸 ID
    consumerId: string;        // 소비자 ID (사용한 사람)
    type: string;              // 카테고리
    name: string;              // 이름
    memo: string;              // 메모
    expirationDate: string;    // 소비기한 (ISO 문자열)
    isConsumed: boolean;       // 소비 여부
    isDisposed: boolean;       // 폐기 여부
    isDeleted: boolean;        // 삭제 여부
    usedAt?: string;           // 최근 사용 시각 (optional, ISO 문자열)
    createdAt?: string;        // 생성 시각 (optional)
    updatedAt?: string;        // 수정 시각 (optional)
}

// 상태 타입 정의
interface IngredientState {
    ingredients: Ingredient[];
    addIngredient: (ingredient: Ingredient) => void;
    updateIngredient: (id: string, updates: Partial<Ingredient>) => void;
    removeIngredient: (id: string) => void;
    getIngredientsByFridge: (fridgeId: string) => Ingredient[];
    getExpiringSoon: (fridgeId: string, days?: number) => Ingredient[];
    getRecentlyUsed: (fridgeId: string, limit?: number) => Ingredient[];
}

// zustand store 생성
export const useIngredientStore = create<IngredientState>()(
    persist(
        (set, get) => ({
            ingredients: [],

            addIngredient: (ingredient) =>
                set((state) => ({
                    ingredients: [...state.ingredients, ingredient],
                })),

            updateIngredient: (id, updates) =>
                set((state) => ({
                    ingredients: state.ingredients.map((ing) =>
                        ing.id === id ? { ...ing, ...updates, updatedAt: new Date().toISOString() } : ing
                    ),
                })),

            removeIngredient: (id) =>
                set((state) => ({
                    ingredients: state.ingredients.filter((ing) => ing.id !== id),
                })),

            getIngredientsByFridge: (fridgeId) =>
                get().ingredients.filter((ing) => ing.fridgeId === fridgeId && !ing.isDeleted),

            getExpiringSoon: (fridgeId, days = 3) => {
                const now = new Date();
                const limitDate = new Date();
                limitDate.setDate(now.getDate() + days);

                return get()
                    .ingredients.filter(
                        (ing) =>
                            ing.fridgeId === fridgeId &&
                            !ing.isDeleted &&
                            !ing.isConsumed &&
                            !ing.isDisposed &&
                            new Date(ing.expirationDate) <= limitDate
                    )
                    .sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
            },

            getRecentlyUsed: (fridgeId, limit = 5) =>
                get()
                    .ingredients
                    .filter((ing) => ing.fridgeId === fridgeId && ing.usedAt)
                    .sort((a, b) => new Date(b.usedAt!).getTime() - new Date(a.usedAt!).getTime())
                    .slice(0, limit),
        }),
        {
            name: "ingredient-store", // localStorage key
        }
    )
);
