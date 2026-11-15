-- ========================================================
-- Burmese Food Recipes - Supabase Database Schema
-- Run this script in the Supabase SQL Editor
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. RECIPES TABLE
create table if not exists public.recipes (
  id text primary key,
  title text not null,
  title_en text,
  chef text default 'Burmese Food Master',
  chef_title text default 'Traditional Culinary Expert',
  category text not null,
  difficulty text default 'အသင့်အတင့်',
  prep_time text not null,
  cook_time text not null,
  base_servings int default 4,
  calories text,
  rating numeric(3, 2) default 5.0,
  reviews_count int default 0,
  image text not null,
  description text,
  chef_tip text,
  ingredients jsonb not null default '[]'::jsonb,
  garnishes jsonb default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. REVIEWS & RATINGS TABLE
create table if not exists public.reviews (
  id uuid default uuid_generate_v4() primary key,
  recipe_id text references public.recipes(id) on delete cascade not null,
  user_name text not null,
  user_email text,
  rating int check (rating >= 1 and rating <= 5) not null,
  comment text not null,
  cooked_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. FAVORITES / BOOKMARKS TABLE
create table if not exists public.favorites (
  id uuid default uuid_generate_v4() primary key,
  recipe_id text references public.recipes(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.recipes enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;

-- Policies for RECIPES:
-- Anyone can read recipes
create policy "Anyone can read recipes" on public.recipes
  for select using (true);

-- Authenticated Admin can insert/update/delete recipes
create policy "Authenticated users can insert recipes" on public.recipes
  for insert with check (auth.role() = 'authenticated');

create policy "Authenticated users can update recipes" on public.recipes
  for update using (auth.role() = 'authenticated');

create policy "Authenticated users can delete recipes" on public.recipes
  for delete using (auth.role() = 'authenticated');

-- Policies for REVIEWS:
-- Anyone can read reviews
create policy "Anyone can read reviews" on public.reviews
  for select using (true);

-- Anyone can submit a review
create policy "Anyone can insert reviews" on public.reviews
  for insert with check (true);

-- Authenticated admin can delete reviews
create policy "Authenticated users can delete reviews" on public.reviews
  for delete using (auth.role() = 'authenticated');

-- Policies for FAVORITES:
create policy "Anyone can manage favorites" on public.favorites
  for all using (true);
