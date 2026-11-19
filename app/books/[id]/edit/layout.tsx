import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Buku | PustakaKu",
  description: "Perbarui status baca, rating, sampul, dan catatan pribadi bukumu di PustakaKu."
};

export default function EditBookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
