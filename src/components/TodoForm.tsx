// 할 일 입력 양식
"use client";

import styles from "@/styles/TodoMainPage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTodo } from "@/lib/api";

export default function TodoForm() {
    const router = useRouter();
    const [todo, setTodo] = useState("");
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!todo.trim()) return;

        try {
            await createTodo({ name: todo.trim() });
            setTodo("");
            router.refresh();
        } catch (error) {
            console.error("할 일 추가 실패:", error);
        }
    };

    return (
        <form className={styles.todoForm} onSubmit={handleSubmit}>
            <input
                className={styles.todoInput}
                type="text"
                placeholder="할 일을 입력해주세요"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />

            <button 
                type="submit"
                className={`${styles.addButton} ${todo.trim() ? styles.addButtonActive : ""}`}
            >
                <span>+</span>
                <span className={styles.addButtonText}> 추가하기</span>
            </button>
        </form>
    );
}