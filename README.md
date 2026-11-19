# PustakaKu

PustakaKu adalah personal book tracker untuk mencatat koleksi, status bacaan, rating, dan catatan pribadi.

## Tech stack

- Next.js 14 App Router dan React
- Tailwind CSS
- Supabase (PostgreSQL + Row Level Security)
- Vercel-ready

## Menjalankan secara lokal

1. Pastikan Node.js 18.17+ terpasang.
2. Jalankan `npm install`.
3. Buat project Supabase, lalu jalankan isi [`supabase/schema.sql`](./supabase/schema.sql) di SQL Editor.
4. Salin `.env.example` menjadi `.env.local`, lalu isi URL dan publishable/anon key Supabase.
5. Jalankan `npm run dev`, kemudian buka `http://localhost:3000`.

Untuk produksi, masukkan environment variables yang sama ke dashboard Vercel sebelum deploy.

## Deploy

https://pelat-ganjil-final-web-hf827wgdq-rnp4.vercel.app

## Screenshot

### Halaman

Home:
![Home Page](https://i.postimg.cc/15SmVZvR/Screenshot-2026-11-19-205930.png)

/new/
![New Book Page](https://i.postimg.cc/QN1NMMJH/Screenshot-2026-11-19-210033.png)

/edit/
![Edit Book Page](https://i.postimg.cc/h4T4GG1v/Screenshot-2026-11-19-210048.png)

### Responsiveness

Desktop:
![Tampilan Desktop](https://i.postimg.cc/pVzVddJM/Screenshot-2026-11-19-205920.png)

Phone:
![Tampilan Phone](https://i.postimg.cc/SN4SYpgS/Screenshot-2026-11-19-205913.png)
