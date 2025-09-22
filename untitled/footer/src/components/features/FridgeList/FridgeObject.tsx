// src/components/FridgeObject.tsx
import React, { useEffect, useState, useMemo } from "react";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import { FavoritesIcon, SettingsIcon } from "../FridgeButtons";
import { useNavigate } from "react-router-dom";
import { useMemberSearch } from "../FridgeHooks/useMemberSearch";

interface Props {
    fridgeId: string;
}

const FridgeObject: React.FC<Props> = ({ fridgeId }) => {
    const navigate = useNavigate();
    const {
        fridges,
        toggleFavorite,
        setDefaultFridge,
        addMember,
        removeMember,
        addPendingInvite,
        removePendingInvite,
        updateFridgeName,
        deleteFridge,
        currentUser,
    } = useFridgeStore();

    const fridge = fridges.find((f) => f.id === fridgeId);
    if (!fridge || fridge.isDeleted) return null;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editIsDefault, setEditIsDefault] = useState(false);
    const [localMembers, setLocalMembers] = useState<string[]>([]);

    const pendingInvitesMemo = useMemo(() => fridge.pendingInvites || [], [fridge.pendingInvites]);
    const { searchQuery, setSearchQuery, searchResults, setIsSearchOpen, resetSearch } =
        useMemberSearch(localMembers, pendingInvitesMemo);

    useEffect(() => {
        if (isModalOpen && fridge) {
            setEditName(fridge.name);
            setEditIsDefault(Boolean(fridge.isDefault));
            setLocalMembers(Array.from(new Set([fridge.owner, ...(fridge.members || []), ...pendingInvitesMemo])));
            resetSearch();
        }
    }, [isModalOpen, fridge, pendingInvitesMemo, resetSearch]);

    const handleSave = () => {
        if (!fridge) return;

        const trimmedName = editName.trim();
        if (trimmedName && trimmedName !== fridge.name) {
            updateFridgeName(fridge.id, trimmedName);
        }

        if (!fridge.isDefault && editIsDefault) {
            setDefaultFridge(fridge.id);
        }

        const currentMembers = fridge.members || [];
        const newMembers = localMembers.filter((m) => m !== fridge.owner && !pendingInvitesMemo.includes(m));

        // 추가/삭제 멤버 처리
        const toAdd = newMembers.filter((m) => !currentMembers.includes(m));
        const toRemove = currentMembers.filter((m) => !newMembers.includes(m));
        toAdd.forEach((m) => addMember(fridge.id, m));
        toRemove.forEach((m) => removeMember(fridge.id, m));

        // pending 멤버 처리
        const newPending = localMembers.filter((m) => pendingInvitesMemo.includes(m));
        const removedPending = pendingInvitesMemo.filter((m) => !newPending.includes(m));
        removedPending.forEach((m) => removePendingInvite(fridge.id, m));

        setIsModalOpen(false);
    };

    const handleInviteFromSearch = (userNickname: string) => {
        if (!fridge) return;
        addPendingInvite(fridge.id, userNickname);
        setLocalMembers((prev) => Array.from(new Set([...prev, userNickname])));
    };

    const handleRemoveMemberLocal = (member: string) => {
        if (!fridge) return;
        if (member === fridge.owner) {
            alert("생성자는 삭제할 수 없습니다.");
            return;
        }
        removeMember(fridge.id, member);
        removePendingInvite(fridge.id, member);
        setLocalMembers((prev) => prev.filter((m) => m !== member));
    };

    const handleConfirmDelete = async () => {
        if (!fridge || fridge.isDefault) return;
        const ok = await deleteFridge(fridge.id);
        if (ok) {
            setIsDeleteModalOpen(false);
            setIsModalOpen(false);
        } else {
            alert("삭제에 실패했습니다. (기본 냉장고일 수 있습니다.)");
        }
    };

    const handleNavigate = () => {
        if (isModalOpen || isDeleteModalOpen) return;
        navigate(`/fridge/${fridge.id}`);
    };

    return (
        <div
            className={`single_fridge_wrap w-[400px] h-[350px] bg-yellow-50 m-5 p-2 rounded inline-block cursor-pointer hover:shadow-lg transition-shadow relative ${
                fridge.isDefault ? "border-4 border-sky-200" : ""
            }`}
            onClick={handleNavigate}
        >
            <div className="fridge_setting m-2.5 text-right">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                    }}
                >
                    <SettingsIcon />
                </button>
            </div>

            <div className="fridge_name text-green-900 text-4xl font-bold m-7">
                <span>{fridge.name}</span>
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(fridgeId);
                }}
                className="fridge_fav absolute right-5 bottom-5 w-fit"
            >
                <FavoritesIcon isFav={fridge.isFavorite} />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[640px] relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            aria-label="닫기"
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold mb-4">냉장고 설정</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">냉장고 이름</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4 flex items-center gap-2">
                            <input
                                id="default-checkbox"
                                type="checkbox"
                                checked={editIsDefault}
                                onChange={(e) => setEditIsDefault(e.target.checked)}
                                disabled={fridge.isDefault}
                            />
                            <label htmlFor="default-checkbox" className="text-sm">
                                기본 냉장고로 설정
                            </label>
                        </div>

                        {fridge.owner === currentUser && (
                            <div className="mb-4 border-t pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">멤버 검색 & 초대</h3>
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        placeholder="닉네임으로 검색"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 p-2 border rounded focus:outline-none"
                                        onFocus={() => setIsSearchOpen(true)}
                                    />
                                    <button
                                        className="px-3 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => setSearchQuery(searchQuery.trim().toLowerCase())}
                                    >
                                        검색
                                    </button>
                                </div>

                                {searchResults.length > 0 && (
                                    <ul className="mt-2 space-y-2 max-h-40 overflow-auto">
                                        {searchResults.map((u)
