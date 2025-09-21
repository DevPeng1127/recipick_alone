// src/utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// src/components/FridgeUtil.ts
import type { Fridge } from "../FridgeStores/fridgeStore";

const STORAGE_KEY = "fridgeList";

// 원래 저장 함수
const rawPersist = (fridges: Fridge[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fridges));
};

// ✅ 디바운스 버전 (예: 500ms)
export const persistFridges = debounce(rawPersist, 1500);

export const loadFridges = (): Fridge[] | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
        return JSON.parse(saved) as Fridge[];
    } catch (e) {
        console.error("로컬스토리지 파싱 실패", e);
        return null;
    }
};

