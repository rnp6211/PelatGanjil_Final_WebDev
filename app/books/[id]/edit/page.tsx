"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";
import { supabase } from "@/lib/supabase";
import { Book, BookInput } from "@/lib/types";

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<Book>();
  const [error, setError] = useState("");
  useEffect(() => { async function fetchBook() { if (!supabase) { setError("Supabase belum dikonfigurasi."); return; } const { data, error: fetchError } = await supabase.from("books").select("*").eq("id", id).single(); if (fetchError) setError(fetchError.message); else setBook(data as Book); } void fetchBook(); }, [id]);
  async function updateBook(input: BookInput) { if (!supabase) throw new Error("Supabase belum dikonfigurasi."); const { error: updateError } = await supabase.from("books").update(input).eq("id", id); if (updateError) throw new Error(updateError.message); router.push(`/books/${id}`); }
  return <main className="page-shell max-w-3xl py-10 sm:py-16"><Link href={book ? `/books/${id}` : "/"} className="text-sm font-semibold text-coral">← Kembali</Link><h1 className="mt-6 font-display text-4xl font-bold">Edit buku</h1>{error ? <div className="alert alert-error mt-8">{error}</div> : book ? <div className="mt-8"><BookForm book={book} onSubmit={updateBook} /></div> : <p className="mt-8 text-muted">Memuat data buku...</p>}</main>;
}
