import { BookStatus, statusLabels } from "@/lib/types";

export default function StatusBadge({ status }: { status: BookStatus }) {
  return <span className={`status-badge status-${status}`}>{statusLabels[status]}</span>;
}
