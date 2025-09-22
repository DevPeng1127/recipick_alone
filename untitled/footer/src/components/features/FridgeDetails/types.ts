export type FoodCategory =
    | 'vegetable'
    | 'fruit'
    | 'meat'
    | 'seafood'
    | 'dairy'
    | 'grain'
    | 'processed'
    | 'beverage'
    | 'seasoning'
    | 'etc';

export interface FoodItem {
    name: string;
    quantity: string;
    category: FoodCategory;
}

export interface StorageCompartment {
    id: number;
    name: string;
    items: FoodItem[];
}

export interface ExpiryItem {
    id: number;
    name: string;
    daysLeft: number;
}

export interface RecentItem {
    id: number;
    name: string;
    usedAt: string; // "YYYY-MM-DD"
}

export interface BoardData {
    memo: string;
    expiries: ExpiryItem[];
    recents: RecentItem[];
}
