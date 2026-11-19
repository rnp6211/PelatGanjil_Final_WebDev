"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import BookForm from "@/components/BookForm";
import { supabase } from "@/lib/supabase";
import { BookInput } from "@/lib/types";

export default function NewBookPage() {
  const router = useRouter();
  async function createBook(input: BookInput) {
    if (!supabase) throw new Error("Supabase belum dikonfigurasi.");
    const { error } = await supabase.from("books").insert(input);
    if (error) throw new Error(error.message);
    router.push("/");
  }
  return <main className="page-shell max-w-3xl py-10 sm:py-16"><Link href="/" className="text-sm font-semibold text-coral">← Kembali ke koleksi</Link><h1 className="mt-6 font-display text-4xl font-bold">Tambah buku baru</h1><p className="mb-8 mt-2 text-muted">Simpan buku yang sedang kamu baca atau ingin kamu baca.</p><BookForm onSubmit={createBook} /></main>;
}
