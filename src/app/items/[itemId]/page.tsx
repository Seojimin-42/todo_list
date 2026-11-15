import TodoDetail from "@/components/TodoDetail";
import styles from "@/styles/TodoDetail.module.css";

import { getItem } from "@/lib/api";

// 해당 페이지에서 즉시 탐색 검증을 해제하고 데이터 로딩을 기다리도록 허용
export const instant = false;

type TodoDetailPageProps = {
  params: Promise<{
    itemId: string;
  }>;
};

// 상세 페이지
export default async function TodoDetailPage({ params, }: TodoDetailPageProps) {
  const { itemId } = await params;
  const id = Number(itemId);
  const item = await getItem(id);
  
  return (
    <div className={styles.detailBackground}>
      <main className={styles.detailMain}>
        <div className={styles.detailContent}>
          <TodoDetail item={item} />
        </div>
      </main>
    </div>
  );
}