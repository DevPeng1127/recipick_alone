// src/FridgeHooks/useMemberSearch.tsx
import { useState, useEffect, useCallback } from "react";

const mockUsers = [
    "alice","bob","charlie","david","eva","frank",
    "grace","hannah","ivan","철수","영희","길동","찬호"
];

export const useMemberSearch = (localMembers: string[], pendingInvites: string[]) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // 🔹 검색 결과 업데이트
    const updateSearchResults = useCallback(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) {
            setSearchResults([]);
            return;
        }
        const results = mockUsers.filter(
            (u) =>
                u.toLowerCase().includes(q) &&
                !localMembers.includes(u) &&
                !pendingInvites.includes(u)
        );
        setSearchResults(results);
    }, [searchQuery, localMembers, pendingInvites]);

    useEffect(() => {
        updateSearchResults();
    }, [updateSearchResults]);

    // 🔹 모달 닫았다 열면 검색 초기화
    const resetSearch = useCallback(() => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSearchOpen(false);
    }, []);

    return {
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearchOpen,
        setIsSearchOpen,
        resetSearch,
    };
};
