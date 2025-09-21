// src/components/FridgeObject.tsx
import React, { useEffect, useState } from "react";
import { useFridgeStore } from "../FridgeStores/fridgeStore";
import { FavoritesIcon, SettingsIcon } from "../FridgeButtons";

interface Props {
    fridgeId: string;
}

const mockUsers = [
    "alice",
    "bob",
    "charlie",
    "david",
    "eva",
    "frank",
    "grace",
    "hannah",
    "ivan",
];

const FridgeObject: React.FC<Props> = ({ fridgeId }) => {
    const {
        fridges,
        toggleFavorite,
        setDefaultFridge,
        addMember,
        removeMember,
        updateFridgeName,
        deleteFridge,
        currentUser,
    } = useFridgeStore();

    const fridge = fridges.find((f) => f.id === fridgeId);

    // if fridge not found or soft-deleted, render nothing
    if (!fridge || fridge.isDeleted) return null;

    // modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // local edit states (modal 내부에서 편집)
    const [editName, setEditName] = useState("");
    const [editIsDefault, setEditIsDefault] = useState(false);
    const [localMembers, setLocalMembers] = useState<string[]>([]);

    // 검색 모달 상태
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    // 모달 열 때 초기화
    useEffect(() => {
        if (isModalOpen && fridge) {
            setEditName(fridge.name);
            setEditIsDefault(Boolean(fridge.isDefault));
            // owner는 항상 포함
            setLocalMembers(Array.from(new Set([fridge.owner, ...(fridge.members || [])])));
        }
    }, [isModalOpen, fridge]);

    // 검색 (mock)
    useEffect(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) {
            setSearchResults([]);
            return;
        }
        // 결과는 mockUsers에서 nickname 포함하고, 이미 localMembers에 없는 것들만
        setSearchResults(
            mockUsers.filter((u) => u.toLowerCase().includes(q) && !localMembers.includes(u))
        );
    }, [searchQuery, localMembers]);

    // 저장: 이름, 기본설정, 멤버 변경(로컬 -> store)
    const handleSave = () => {
        if (!fridge) return;

        // 이름 변경 (store를 통해 변경해야 리액트가 재렌더링함)
        if (editName.trim() && editName.trim() !== fridge.name) {
            updateFridgeName(fridge.id, editName.trim());
        }

        // 기본냉장고로 설정 (체크하면 setDefaultFridge 호출)
        if (!fridge.isDefault && editIsDefault) {
            setDefaultFridge(fridge.id);
        }

        // 멤버 변경: 로컬 멤버(localMembers)와 store의 fridge.members 비교해서 추가/삭제
        // 멤버 변경은 오너만 가능하도록 UI에서 제어했지만 안전상 store에서 다시 검사함.
        const currentMembers = fridge.members || [];
        // 제외할 owner
        const newMembers = localMembers.filter((m) => m !== fridge.owner);

        const toAdd = newMembers.filter((m) => !currentMembers.includes(m));
        const toRemove = currentMembers.filter((m) => !newMembers.includes(m));

        toAdd.forEach((m) => addMember(fridge.id, m));
        toRemove.forEach((m) => removeMember(fridge.id, m));

        // 닫기
        setIsModalOpen(false);
    };

    // 서브 모달: 검색 결과에서 초대 (로컬에 추가 — 저장 시에 store 반영)
    const handleInviteFromSearch = (userNickname: string) => {
        if (!fridge) return;
        // 초대 UI 자체는 오너만 보이므로 여기서 별도 경고는 생략
        setLocalMembers((prev) => Array.from(new Set([...prev, userNickname])));
        // 검색 결과에서 제거
        setSearchResults((prev) => prev.filter((x) => x !== userNickname));
    };

    // 로컬 멤버에서 제거 (owner는 삭제 불가)
    const handleRemoveMemberLocal = (member: string) => {
        if (!fridge) return;
        if (member === fridge.owner) {
            alert("생성자는 삭제할 수 없습니다.");
            return;
        }
        setLocalMembers((prev) => prev.filter((m) => m !== member));
    };

    // 삭제 확인: 기본 냉장고면 삭제 불가 (안내 문구 보여주고 예버튼 비활성화)
    const handleConfirmDelete = async () => {
        if (!fridge) return;
        if (fridge.isDefault) {
            // 안전장치: should not delete; show message in UI (delete button disabled there)
            return;
        }
        const ok = await deleteFridge(fridge.id);
        if (ok) {
            setIsDeleteModalOpen(false);
            setIsModalOpen(false);
            // store에서 isDeleted=true 이므로 컴포넌트는 곧 사라짐
        } else {
            alert("삭제에 실패했습니다. (기본 냉장고일 수 있습니다.)");
        }
    };

    return (
        <div className="single_fridge_wrap w-[400px] h-[350px] bg-yellow-50 m-5 p-2 rounded inline-block cursor-grab hover:shadow-lg transition-shadow object-center">
            {/* 설정 아이콘 → 모달 토글 */}
            <div className="fridge_setting m-2.5 text-right">
                <button onClick={() => setIsModalOpen(true)}>
                    <SettingsIcon />
                </button>
            </div>

            <div className="fridge_name text-green-900 text-4xl font-bold m-7">
                {/* 화면에는 store의 실제 fridge.name을 사용하도록 변경 (props에 의존하지 않음) */}
                <span>{fridge.name}</span>
            </div>

            {/* 즐겨찾기 버튼 */}
            <div onClick={() => toggleFavorite(fridgeId)} className="fridge_fav text-right pr-5 pt-32">
                <FavoritesIcon isFav={fridge.isFavorite} />
            </div>

            {/* 설정 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[640px] relative">
                        {/* 우측 상단 X */}
                        <button
                            aria-label="닫기"
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold mb-4">냉장고 설정</h2>

                        {/* 1) 냉장고 이름 수정 */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">냉장고 이름</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {/* 2) 기본 냉장고 체크박스 — 이미 기본이면 disabled (해제 불가) */}
                        <div className="mb-4 flex items-center gap-2">
                            <input
                                id="default-checkbox"
                                type="checkbox"
                                checked={editIsDefault}
                                onChange={(e) => setEditIsDefault(e.target.checked)}
                                disabled={fridge.isDefault} // 기본 냉장고이면 체크 해제 불가
                            />
                            <label htmlFor="default-checkbox" className="text-sm">
                                기본 냉장고로 설정
                            </label>
                        </div>

                        {/* 3) 멤버 검색 & 초대 (오너만 보임) */}
                        {fridge.owner === currentUser && (
                            <div className="mb-4 border-t pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">멤버 검색 & 초대</h3>
                                    <button
                                        className="text-sm text-blue-600"
                                        onClick={() => {
                                            setIsSearchOpen(true);
                                            setSearchQuery("");
                                            setSearchResults([]);
                                        }}
                                    >
                                        검색하기
                                    </button>
                                </div>

                                {/* 간단히 입력 후 즉시 결과 보여주기 */}
                                <div className="flex gap-2">
                                    <input
                                        placeholder="닉네임으로 검색"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="flex-1 p-2 border rounded"
                                    />
                                    <button
                                        className="px-3 py-2 bg-blue-500 text-white rounded"
                                        onClick={() => {
                                            // 검색 실행 (mock)
                                            const q = searchQuery.trim().toLowerCase();
                                            if (!q) {
                                                setSearchResults([]);
                                                return;
                                            }
                                            setSearchResults(mockUsers.filter((u) => u.toLowerCase().includes(q) && !localMembers.includes(u)));
                                        }}
                                    >
                                        검색
                                    </button>
                                </div>

                                {/* 검색 결과 (인라인) */}
                                {searchResults.length > 0 && (
                                    <ul className="mt-2 space-y-2 max-h-40 overflow-auto">
                                        {searchResults.map((u) => (
                                            <li key={u} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                                <span>{u}</span>
                                                <button
                                                    className="px-2 py-1 bg-green-500 text-white rounded"
                                                    onClick={() => handleInviteFromSearch(u)}
                                                >
                                                    초대하기
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* 4) 공유 멤버 목록 (항상 owner 포함) */}
                        <div className="mb-4 border-t pt-4">
                            <h3 className="font-semibold mb-2">공유 멤버</h3>
                            <ul className="space-y-2">
                                {localMembers.map((m) => (
                                    <li key={m} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                        <div>
                                            <div className="font-medium">{m}</div>
                                            {m === fridge.owner && <div className="text-xs text-gray-500">생성자 (owner)</div>}
                                        </div>
                                        <div>
                                            {m !== fridge.owner && fridge.owner === currentUser && (
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => handleRemoveMemberLocal(m)}
                                                >
                                                    제거
                                                </button>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 5) 냉장고 삭제 */}
                        <div className="mb-4 border-t pt-4">
                            <button
                                className="w-full py-2 bg-red-500 text-white rounded"
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                냉장고 삭제
                            </button>
                        </div>

                        {/* 하단 : 취소 / 저장 */}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-gray-300"
                                onClick={() => setIsModalOpen(false)} // 취소 -> 변경사항 반영 안함(로컬상태만 변경)
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-blue-500 text-white"
                                onClick={handleSave}
                            >
                                저장하기
                            </button>
                        </div>

                        {/* 검색 전용 서브 모달 (owner 전용) */}
                        {isSearchOpen && (
                            <div
                                className="fixed inset-0 bg-black/40 flex items-center justify-center z-60"
                                onClick={() => setIsSearchOpen(false)}
                            >
                                <div
                                    className="bg-white rounded-lg p-4 w-[520px]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold">멤버 검색</h4>
                                        <button className="text-gray-600" onClick={() => setIsSearchOpen(false)}>✕</button>
                                    </div>
                                    <input
                                        className="w-full p-2 border rounded mb-2"
                                        placeholder="닉네임으로 검색"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                const q = searchQuery.trim().toLowerCase();
                                                if (!q) { setSearchResults([]); return; }
                                                setSearchResults(mockUsers.filter((u) => u.toLowerCase().includes(q) && !localMembers.includes(u)));
                                            }
                                        }}
                                    />
                                    <div className="max-h-64 overflow-auto">
                                        {searchResults.length === 0 ? (
                                            <div className="text-sm text-gray-500">검색 결과가 없습니다.</div>
                                        ) : (
                                            <ul className="space-y-2">
                                                {searchResults.map((u) => (
                                                    <li key={u} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                                        <span>{u}</span>
                                                        <button
                                                            className="px-2 py-1 bg-green-500 text-white rounded"
                                                            onClick={() => {
                                                                handleInviteFromSearch(u);
                                                                // 검색 결과에서 제거
                                                                setSearchResults((prev) => prev.filter((x) => x !== u));
                                                            }}
                                                        >
                                                            초대하기
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 삭제 확인 커스텀 모달 */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[420px]">
                        <h3 className="text-lg font-semibold mb-2">냉장고 삭제</h3>

                        {fridge.isDefault ? (
                            <>
                                <p className="mb-4 text-red-600">
                                    기본 냉장고는 삭제할 수 없습니다. 먼저 다른 냉장고를 기본 냉장고로 설정해주세요.
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        className="px-3 py-1 bg-gray-300 rounded"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                    >
                                        닫기
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="mb-4">"{fridge.name}" 을/를 정말 삭제하시겠습니까?</p>
                                <div className="flex justify-end gap-2">
                                    <button
                                        className="px-3 py-1 bg-gray-300 rounded"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                    >
                                        아니오
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                        onClick={async () => {
                                            await handleConfirmDelete();
                                        }}
                                    >
                                        예
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FridgeObject;
