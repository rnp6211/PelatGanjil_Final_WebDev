import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "PustakaKu - Kelola & Lacak Koleksi Buku Pribadimu",
  description: "Pantau progres membaca, cari koleksi buku, dan filter berdasarkan status bacaan dengan mudah di PustakaKu."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><Header />{children}</body></html>;
}
