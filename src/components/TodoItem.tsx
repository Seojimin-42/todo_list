"use client";

import Image from "next/image";
import styles from "@/styles/TodoMainPage.module.css";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { updateItem } from "@/lib/api";

type TodoItemProps = {
    itemId: number;
    name: string;
    isCompleted: boolean;
};

export default function TodoItem({ itemId, name, isCompleted }: TodoItemProps) {
    const router = useRouter();
    const handleToggle = async () => {
        try {
            await updateItem(itemId, {
                isCompleted: !isCompleted,
            });

            router.refresh();
        } catch (error) {
            console.error("완료 상태 변경 실패", error);
        }
    };
    
    return(
        <div 
            className={`${styles.todoItem} ${
                isCompleted ? styles.todoItemCompleted : ""
            }`}
        >
            <button 
                type="button"
                aria-label="할 일 완료 상태 변경"
                className={styles.checkboxButton}
                onClick={handleToggle}
            >
                <Image
                    src={
                        isCompleted
                            ? "/icons/checkbox/checked.png"
                            : "/icons/checkbox/unchecked.png"
                    }
                    alt="체크박스"
                    width={32}
                    height={32}
                />
            </button>
            
            <Link href={`/items/${itemId}`}>
                {name}
            </Link>
        </div>
    );
}