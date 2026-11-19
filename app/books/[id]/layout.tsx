import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";

type LayoutProps = { children: React.ReactNode; params: { id: string } };

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  if (!supabase) {
    return { title: "Detail Buku | PustakaKu", description: "Detail buku dan catatan pribadi di PustakaKu." };
  }
  const { data } = await supabase.from("books").select("title").eq("id", params.id).maybeSingle();
  const title = data?.title ?? "Detail Buku";
  return {
    title: `${title} - Detail & Catatan | PustakaKu`,
    description: `Baca ulasan lengkap, catatan pribadi, dan detail informasi mengenai buku ${title}.`
  };
}

export default function BookLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
