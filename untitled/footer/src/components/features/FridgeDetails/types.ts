export interface FoodItem {
    name: string;
    quantity: string;
}

export interface StorageCompartment {
    id: number;
    name: string;
    items: FoodItem[];
}

export interface Memo {
    id: number;
    content: string;
}

export interface ExpiryItem {
    id: number;
    name: string;
    daysLeft: number;
}

export interface RecentItem {
    id: number;
    name: string;
    usedAt: string; // "Y-m-d"
}

export interface BoardData {
    memos: Memo[];
    expiries: ExpiryItem[];
    recents: RecentItem[];
}