import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Koleksi Buku Baru | PustakaKu",
  description: "Tambahkan buku baru ke dalam daftar bacaan lengkap dengan rating, status baca, dan catatan pribadi."
};

export default function NewBookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
