"use client";

import { FormEvent, useState } from "react";
import { Book, BookInput, BOOK_STATUSES, statusLabels } from "@/lib/types";

type BookFormProps = { book?: Book; onSubmit: (input: BookInput) => Promise<void> };

export default function BookForm({ book, onSubmit }: BookFormProps) {
  const [form, setForm] = useState<BookInput>({
    title: book?.title ?? "",
    author: book?.author ?? "",
    cover_url: book?.cover_url ?? "",
    status: book?.status ?? "want_to_read",
    rating: book?.rating ?? 0,
    notes: book?.notes ?? ""
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof BookInput>(field: K, value: BookInput[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!form.title.trim() || !form.author.trim()) {
      setMessage("Judul buku dan penulis wajib diisi.");
      return;
    }
    setSaving(true);
    try {
      await onSubmit({ ...form, title: form.title.trim(), author: form.author.trim() });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Buku gagal disimpan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-5 sm:p-8">
      {message && <p className="alert alert-error" role="alert">{message}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field sm:col-span-2">Judul Buku
          <input id="title" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Contoh: The Midnight Library" required />
        </label>
        <label className="field">Penulis
          <input id="author" value={form.author} onChange={(e) => update("author", e.target.value)} placeholder="Nama penulis" required />
        </label>
        <label className="field">Status Baca
          <select id="status" value={form.status} onChange={(e) => update("status", e.target.value as BookInput["status"])}>
            {BOOK_STATUSES.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
          </select>
        </label>
        <label className="field sm:col-span-2">URL Gambar Sampul <span className="font-normal text-muted">(opsional)</span>
          <input id="cover_url" type="url" value={form.cover_url ?? ""} onChange={(e) => update("cover_url", e.target.value)} placeholder="https://..." />
        </label>
        <fieldset className="field">
          <legend>Rating</legend>
          <div className="flex gap-2 pt-2">
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="cursor-pointer">
                <input className="sr-only" type="radio" name="rating" value={rating} checked={form.rating === rating} onChange={() => update("rating", rating)} />
                <span className={`rating-choice ${form.rating === rating ? "rating-selected" : ""}`}>{rating}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field sm:col-span-2">Catatan Pribadi <span className="font-normal text-muted">(opsional)</span>
          <textarea id="notes" rows={6} value={form.notes ?? ""} onChange={(e) => update("notes", e.target.value)} placeholder="Apa yang ingin kamu ingat dari buku ini?" />
        </label>
      </div>
      <button type="submit" className="button button-primary w-full sm:w-auto" disabled={saving}>{saving ? "Menyimpan..." : book ? "Simpan Perubahan" : "Tambahkan ke Koleksi"}</button>
    </form>
  );
}
