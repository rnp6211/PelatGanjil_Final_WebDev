"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { supabase } from "@/lib/supabase";
import { Book, BOOK_STATUSES, BookStatus, statusLabels } from "@/lib/types";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BookStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadBooks() {
    setLoading(true);
    setError("");
    if (!supabase) {
      setError("Supabase belum dikonfigurasi. Tambahkan environment variables untuk memuat koleksi.");
      setLoading(false);
      return;
    }
    const { data, error: fetchError } = await supabase.from("books").select("*").order("created_at", { ascending: false });
    if (fetchError) setError(fetchError.message);
    else setBooks((data as Book[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadBooks();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function removeBook(id: string) {
    if (!supabase || !window.confirm("Hapus buku ini dari koleksi?")) return;
    const { error: deleteError } = await supabase.from("books").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else setBooks((current) => current.filter((book) => book.id !== id));
  }

  async function changeStatus(id: string, nextStatus: BookStatus) {
    if (!supabase) return;
    const { error: updateError } = await supabase.from("books").update({ status: nextStatus }).eq("id", id);
    if (updateError) setError(updateError.message);
    else setBooks((current) => current.map((book) => book.id === id ? { ...book, status: nextStatus } : book));
  }

  const filteredBooks = useMemo(() => books.filter((book) => {
    const matchesQuery = `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (status === "all" || book.status === status);
  }), [books, query, status]);

  return (
    <main className="page-shell py-10 sm:py-16">
      <section className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-coral">Ruang baca pribadi</p><h1 className="font-display text-4xl font-bold sm:text-5xl">Koleksi bukumu,<br /><span className="text-coral">cerita hidupmu.</span></h1><p className="mt-4 max-w-lg text-muted">Catat, lacak, dan nikmati perjalanan membaca dalam satu tempat.</p></div>
        <Link href="/books/new" className="button button-primary sm:hidden">+ Tambah Buku</Link>
      </section>
      <section className="mb-8 grid grid-cols-3 gap-3 sm:gap-5">
        {([["total", "Total Buku", books.length], ...BOOK_STATUSES.map((item) => [item, statusLabels[item], books.filter((book) => book.status === item).length])] as [string, string, number][]).map(([key, label, value]) => <div className="card p-4 sm:p-5" key={key}><p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p><p className="mt-2 font-display text-3xl font-bold">{value}</p></div>)}
      </section>
      <section className="mb-6 flex flex-col gap-3">
        <label className="sr-only" htmlFor="search">Cari buku</label>
        <input id="search" className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 outline-none focus:border-coral" placeholder="Cari berdasarkan judul atau penulis..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button className={`button whitespace-nowrap text-sm ${status === "all" ? "button-primary" : "button-secondary"}`} onClick={() => setStatus("all")}>Semua</button>
          {BOOK_STATUSES.map((item) => <button key={item} className={`button whitespace-nowrap text-sm ${status === item ? "button-primary" : "button-secondary"}`} onClick={() => setStatus(item)}>{statusLabels[item]}</button>)}
        </div>
      </section>
      {error && <div className="alert alert-error mb-5" role="alert">{error}</div>}
      {loading ? <div className="card p-10 text-center text-muted">Memuat koleksi buku...</div> : filteredBooks.length === 0 ? <div className="card p-10 text-center"><p className="font-display text-2xl font-bold">Belum ada buku di sini</p><p className="mt-2 text-muted">Tambahkan buku pertama untuk memulai perjalanan membacamu.</p></div> : <div className="grid gap-4 md:grid-cols-2">{filteredBooks.map((book) => <BookCard key={book.id} book={book} onDelete={removeBook} onStatusChange={changeStatus} />)}</div>}
    </main>
  );
}
