import type { Item, CreateItemDto, UpdateItemDto } from "@/types/item";

const BASE_URL = "https://assignment-todolist-api.vercel.app/api";

const TENANT_ID = "jimin";

const ITEMS_URL = `${BASE_URL}/${TENANT_ID}/items`;

// 할 일 목록 추가
export async function createTodo(data: CreateItemDto): Promise<Item> {
    const response = await fetch(ITEMS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("할 일 추가에 실패했습니다.");
    }

    return await response.json();
}

// 할 일 목록 조회
export async function getTodos(): Promise<Item[]> {
    const response = await fetch(ITEMS_URL);

    if (!response.ok) {
        throw new Error("할 일 목록 조회에 실패했습니다.");
    }

    return await response.json();
}

// 할 일 수정
export async function updateItem(
    itemId: number,
    data: UpdateItemDto
): Promise<Item> {
    const response = await fetch(`${ITEMS_URL}/${itemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("할 일 수정에 실패했습니다.");
    }

    return await response.json();
}

// 할 일 상세 조회
export async function getItem(itemId: number): Promise<Item> {
    const response = await fetch(`${ITEMS_URL}/${itemId}`);

    if (!response.ok) {
        throw new Error("할 일 상세 조회에 실패했습니다.");
    }

    return await response.json();
}

// 할 일 삭제
export async function deleteItem(itemId: number) {
    const response = await fetch(`${ITEMS_URL}/${itemId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("할 일 삭제에 실패했습니다.");
    }
}

// 이미지 업로드
export async function uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
        `${BASE_URL}/${TENANT_ID}/images/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
    }

    return await response.json();
}