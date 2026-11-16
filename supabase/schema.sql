-- Jalankan di Supabase > SQL Editor
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('booking','test_drive')),
  name text not null,
  phone text not null,
  variant text not null,
  note text,
  status text not null default 'new'
);
alter table public.leads enable row level security;
-- Tidak ada policy publik: insert hanya lewat API route (service role key, server-side).
