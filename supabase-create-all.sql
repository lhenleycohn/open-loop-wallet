-- Drop tables if they exist (for a clean start)
drop table if exists onboarding_steps cascade;
drop table if exists transactions cascade;
drop table if exists wallets cascade;
drop table if exists customers cascade;

-- Create customers table
create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  status text not null default 'new',
  created_at timestamptz default now()
);

-- Create wallets table
create table wallets (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  balance numeric not null default 0,
  created_at timestamptz default now()
);

-- Create transactions table
create table transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid references wallets(id) on delete cascade,
  type text not null,
  amount numeric not null,
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- Create onboarding_steps table
create table onboarding_steps (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  step_name text not null,
  completed boolean not null default false,
  completed_at timestamptz
);
