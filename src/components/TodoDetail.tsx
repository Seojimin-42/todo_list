"use client";

import styles from "@/styles/TodoDetail.module.css";
import Image from "next/image";

import { useRef, useState } from "react";
import { uploadImage, updateItem, deleteItem } from "@/lib/api";
import { useRouter } from "next/navigation";
import type { Item } from "@/types/item";

type TodoDetailProps = {
    item: Item;
};

export default function TodoDetail({ item }: TodoDetailProps) {
    const [name, setName] = useState(item.name);
    const [isCompleted, setIsCompleted] = useState(item.isCompleted);
    const [memo, setMemo] = useState(item.memo ?? "");
    const [imageUrl, setImageUrl] = useState<string | null>(item.imageUrl);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isModified = name !== item.name || isCompleted !== item.isCompleted || memo !== (item.memo ?? "") || imageUrl !== item.imageUrl;
    const handleSave = async () => {
        try {
            setIsSaving(true);

            await updateItem(item.id, {
                name: name,
                memo: memo,
                isCompleted: isCompleted,
                imageUrl: imageUrl ?? undefined,
        });
        
        router.push("/");
        } catch (error) {
            console.error("할 일 수정 실패:", error);
            alert("할 일 수정에 실패했습니다. 다시 시도해 주세요.");
        } finally {
            setIsSaving(false);
        }
    };
    const handleDelete = async () => { 
        try {
            setIsDeleting(true);
            await deleteItem(item.id);
            router.push("/");
        } catch (error) {
            console.error("할 일 삭제 실패:", error);
            alert("할 일 삭제에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsDeleting(false);
        }
    };
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    
    return (
        <>
            <div
                className={`${styles.detailTitle} ${
                    isCompleted ? styles.detailTitleCompleted : ""
                }`}
            >
                <button
                    className={styles.detailCheckbox}
                    type="button"
                    onClick={() => setIsCompleted(!isCompleted)}
                >
                    <Image
                        src={
                            isCompleted
                                ? "/icons/checkbox/checked.png"
                                : "/icons/checkbox/unchecked.png"
                        }
                        alt={isCompleted ? "완료됨" : "진행 중"}
                        width={32}
                        height={32}
                    />
                </button>

                <input
                    className={styles.detailInput}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.detailBody}>
                <div className={`${styles.imageArea} ${
                    imageUrl ? styles.imageAreaFilled : ""}`}
                >

                    {/* 이미지 첨부 영역 */}

                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt="첨부된 이미지"
                            width={400}
                            height={350}
                            className={styles.attachedImage}
                        />
                    ) : (
                        <Image
                            src="/images/gallery/gallery.png"
                            alt="첨부된 이미지 없음"
                            width={64}
                            height={64}  
                        />
                    )}

                    <button
                        type="button"
                        className={`${styles.imageAddButton} ${
                            imageUrl ? styles.imageEditButton : ""
                        }`}
                        aria-label="이미지 추가"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image
                            src={
                                imageUrl
                                    ? "/icons/edit/edit.png"
                                    : "/icons/plus/plus(1).png"
                            }
                            alt=""
                            width={30}
                            height={30}
                        />
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            console.log(file);

                            if (!file) return;

                            // 파일 크기 검증
                            if (file.size > 5 * 1024 * 1024) {
                                alert("이미지 크기는 5MB 이하여야 합니다.");
                                return;
                            }

                            // 파일 이름 검증
                            const englishFileName = /^[a-zA-Z0-9._-]+$/;

                            if (!englishFileName.test(file.name)) {
                                alert("이미지 파일 이름은 영문으로 작성해야 합니다.");
                                return;
                            }

                            // 이미지 업로드
                            const result = await uploadImage(file);
                            
                            // 업로드한 이미지 URL 저장
                            setImageUrl(result.url);
                        }}
                    />
                </div>

                <div className={styles.memoArea}>
                    <p className={styles.memoTitle}>Memo</p>

                    <div className={styles.memoInputWrapper}>
                        <textarea
                            className={styles.memoInput}
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            aria-label="할 일 메모"
                        />
                    </div>
                </div>
            </div>

            {/* 수정 완료, 삭제하기 버튼 */}
            <div className={styles.detailActions}>
                <button
                    type="button"
                    className={`${styles.saveButton} ${
                        isModified && !isSaving ? styles.saveButtonActive : ""
                    }`}
                    disabled={!isModified || isSaving || isDeleting}
                    onClick={handleSave}
                >
                    <Image
                        src="/icons/check/check.png"
                        alt="수정 완료 버튼"
                        width={16}
                        height={16}
                    />
                        수정 완료
                </button>

                <button 
                    type="button"
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    disabled={isDeleting || isSaving}
                >
                    <Image
                        src="/icons/x/x.png"
                        alt="삭제하기 버튼"
                        width={16}
                        height={16}
                    />
                        삭제하기
                </button>
            </div>
        </>
    );
}