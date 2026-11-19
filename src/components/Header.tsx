import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-ink/10 bg-cream/90">
      <div className="page-shell flex items-center justify-between py-5">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-ink">
          Pustaka<span className="text-coral">Ku</span>
        </Link>
        <Link href="/books/new" className="button button-primary hidden sm:inline-flex">
          <span aria-hidden="true">+</span> Tambah Buku
        </Link>
      </div>
    </header>
  );
}
