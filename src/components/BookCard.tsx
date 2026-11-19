import Link from "next/link";
import BookCover from "@/components/BookCover";
import Rating from "@/components/Rating";
import { Book, BookStatus, statusLabels } from "@/lib/types";

export default function BookCard({ book, onDelete, onStatusChange }: { book: Book; onDelete: (id: string) => void; onStatusChange: (id: string, status: BookStatus) => void }) {
  return (
    <article className="card flex min-h-[185px] gap-4 p-4">
      <Link href={`/books/${book.id}`} className="shrink-0">
        <BookCover title={book.title} coverUrl={book.cover_url} className="h-40 w-28" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/books/${book.id}`} className="line-clamp-2 font-display text-xl font-bold text-ink hover:text-coral">
              {book.title}
            </Link>
            <p className="mt-1 truncate text-sm text-muted">{book.author}</p>
          </div>
          <button type="button" onClick={() => onDelete(book.id)} className="icon-button" aria-label={`Hapus ${book.title}`}>
            ×
          </button>
        </div>
        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="sr-only" htmlFor={`status-${book.id}`}>Status {book.title}</label>
            <select id={`status-${book.id}`} className="rounded-full border-0 bg-cream px-2 py-1 text-xs font-bold text-ink outline-none" value={book.status} onChange={(event) => onStatusChange(book.id, event.target.value as BookStatus)}>
              {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <Rating value={book.rating} />
          </div>
          <Link href={`/books/${book.id}/edit`} className="text-sm font-semibold text-coral hover:text-coral-dark">
            Edit buku →
          </Link>
        </div>
      </div>
    </article>
  );
}
