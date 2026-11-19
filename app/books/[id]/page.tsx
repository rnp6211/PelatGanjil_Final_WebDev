"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BookCover from "@/components/BookCover";
import Rating from "@/components/Rating";
import StatusBadge from "@/components/StatusBadge";
import { supabase } from "@/lib/supabase";
import { Book } from "@/lib/types";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { async function fetchBook() { if (!supabase) { setError("Supabase belum dikonfigurasi."); return; } const { data, error: fetchError } = await supabase.from("books").select("*").eq("id", id).single(); if (fetchError) setError(fetchError.message); else setBook(data as Book); } void fetchBook(); }, [id]);
  async function remove() { if (!supabase || !book || !window.confirm("Hapus buku ini dari koleksi?")) return; const { error: deleteError } = await supabase.from("books").delete().eq("id", book.id); if (deleteError) setError(deleteError.message); else router.push("/"); }
  if (error) return <main className="page-shell py-16"><div className="alert alert-error">{error}</div></main>;
  if (!book) return <main className="page-shell py-16 text-muted">Memuat detail buku...</main>;
  return <main className="page-shell max-w-4xl py-10 sm:py-16"><Link href="/" className="text-sm font-semibold text-coral">← Kembali ke koleksi</Link><article className="card mt-6 grid gap-8 p-5 sm:grid-cols-[220px_1fr] sm:p-8"><BookCover title={book.title} coverUrl={book.cover_url} className="mx-auto h-72 w-52 sm:mx-0" /><div><StatusBadge status={book.status} /><h1 className="mt-4 font-display text-4xl font-bold">{book.title}</h1><p className="mt-2 text-lg text-muted">{book.author}</p><div className="mt-5"><Rating value={book.rating} /></div><p className="mt-8 whitespace-pre-wrap leading-7 text-ink/80">{book.notes || "Belum ada catatan untuk buku ini."}</p><p className="mt-8 text-sm text-muted">Ditambahkan {new Date(book.created_at).toLocaleDateString("id-ID", { dateStyle: "long" })}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={`/books/${book.id}/edit`} className="button button-primary">Edit Buku</Link><button className="button button-secondary" onClick={remove}>Hapus Buku</button></div></div></article></main>;
}
