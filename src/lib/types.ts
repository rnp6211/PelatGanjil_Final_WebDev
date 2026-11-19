export const BOOK_STATUSES = ["want_to_read", "reading", "completed"] as const;

export type BookStatus = (typeof BOOK_STATUSES)[number];

export type Book = {
  id: string;
  created_at: string;
  title: string;
  author: string;
  cover_url: string | null;
  status: BookStatus;
  rating: number;
  notes: string | null;
};

export type BookInput = Omit<Book, "id" | "created_at">;

export const statusLabels: Record<BookStatus, string> = {
  want_to_read: "Want to Read",
  reading: "Sedang Dibaca",
  completed: "Selesai"
};
