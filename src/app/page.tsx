import Image from "next/image";
import styles from "@/styles/TodoMainPage.module.css";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";

import { getTodos } from "@/lib/api";

// 해당 페이지에서 즉시 탐색 검증을 해제하고 데이터 로딩을 기다리도록 허용
export const instant = false;

// 메인 페이지
export default async function TodoMainPage() {
  const todos = await getTodos();
  const todoItems = todos.filter((item) => !item.isCompleted); // 진행 중인 할 일
  const doneItems = todos.filter((item) => item.isCompleted); // 완료된 할 일
  
  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <TodoForm /> {/* 할 일 입력 양식 */}

        <div className={styles.todoContainer}>
          <section className={styles.todoSection}>
            <Image
              src="/images/label/todo.png"
              alt="TO DO"
              width={101}
              height={36}
            />

            {todoItems.length > 0 ? (

              // 할 일이 있을 때
              <div className={styles.todoList}>
                {todoItems.map((item) => (
                  <TodoItem
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    isCompleted={item.isCompleted}
                  />
                ))}
              </div>

            ) : (

              // 할 일이 없을 때
              <>
                {/* 데스크탑 / 태블릿 이미지 */}
                <Image
                  className={styles.emptyImageLarge}
                  src="/images/empty/todo-large.png"
                  alt="할 일이 없어요. TODO를 새롭게 추가해주세요!"
                  width={240}
                  height={240}
                />

                {/* 모바일 이미지 */}
                <Image
                  className={styles.emptyImageSmall}
                  src="/images/empty/todo-small.png"
                  alt=""
                  width={120}
                  height={120}
                />

                <p className={styles.emptyText}>
                  할 일이 없어요.
                  <br />
                  TODO를 새롭게 추가해주세요!
                </p>
              </>
            )}
          </section>

          <section className={styles.todoSection}>
            <Image
              src="/images/label/done.png"
              alt="DONE"
              width={101}
              height={36}
            />

            {doneItems.length > 0 ? (

              // 완료된 할 일이 있을 때
              <div className={styles.todoList}>
                {doneItems.map((item) => (
                  <TodoItem
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    isCompleted={item.isCompleted}
                  />
                ))}
              </div>
            ) : (

              // 완료된 할 일이 없을 때
              <>
                {/* 데스크탑 / 태블릿 이미지 */}
                <Image
                  className={styles.emptyImageLarge}
                  src="/images/empty/done-large.png"
                  alt="아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!"
                  width={240}
                  height={240}
                />

                {/* 모바일 이미지 */}
                <Image
                  className={styles.emptyImageSmall}
                  src="/images/empty/done-small.png"
                  alt=""
                  width={120}
                  height={120}
                />

                <p className={styles.emptyText}>
                  아직 다 한 일이 없어요.
                  <br />
                  해야 할 일을 체크해보세요!
                </p>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}