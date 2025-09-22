import { useState, useEffect, useMemo } from "react";

const mockUsers = [
    "alice","bob","charlie","david","eva","frank",
    "grace","hannah","ivan","철수","영희","길동","찬호"
];

export const useMemberSearch = (localMembers: string[], pendingInvites: string[]) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // 배열을 useMemo로 고정
    const localMembersSet = useMemo(() => new Set(localMembers), [localMembers]);
    const pendingInvitesSet = useMemo(() => new Set(pendingInvites), [pendingInvites]);

    useEffect(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) {
            setSearchResults([]);
            return;
        }

        setSearchResults(
            mockUsers.filter(
                (u) =>
                    u.toLowerCase().includes(q) &&
                    !localMembersSet.has(u) &&
                    !pendingInvitesSet.has(u)
            )
        );
    }, [searchQuery, localMembersSet, pendingInvitesSet]); // 안전하게 Set 참조를 의존성으로 사용

    // 모달 닫았다 열면 검색 초기화
    const resetSearch = () => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSearchOpen(false);
    };

    return {
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearchOpen,
        setIsSearchOpen,
        resetSearch
    };
};
