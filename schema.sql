-- Create table for Goals
create table public.goals (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null check (type in ('daily', 'weekly')),
  start_date timestamp with time zone default now(),
  end_date timestamp with time zone,
  recurrence_days integer[], -- Array of integers 0-6
  created_at timestamp with time zone default now()
);

-- Create table for Goal Records (Completion Status)
create table public.goal_records (
  id uuid default gen_random_uuid() primary key,
  goal_id uuid references public.goals(id) on delete cascade not null,
  date_key text not null, -- Format "YYYY-MM-DD"
  status text not null check (status in ('completed', 'failed', 'open')),
  updated_at timestamp with time zone default now(),
  unique(goal_id, date_key)
);

-- Enable Row Level Security (RLS)
alter table public.goals enable row level security;
alter table public.goal_records enable row level security;

-- Create policies (For demo, we allow public access, but in production use auth)
create policy "Allow public read-write access to goals"
on public.goals for all using (true) with check (true);

create policy "Allow public read-write access to goal_records"
on public.goal_records for all using (true) with check (true);
