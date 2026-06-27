create table if not exists public.personal_profile (
  id serial primary key,
  name varchar(100) not null,
  title varchar(100) not null,
  avatar_url varchar(500),
  email varchar(100),
  phone varchar(50),
  education text,
  research_interests text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.research_results (
  id serial primary key,
  profile_id integer not null references public.personal_profile(id) on delete cascade,
  type varchar(50) not null,
  title varchar(255) not null,
  description text,
  authors text,
  journal varchar(200),
  year varchar(20) not null,
  link varchar(500),
  arxiv_id varchar(50),
  order_index integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists research_results_profile_id_idx on public.research_results(profile_id);
create index if not exists research_results_order_index_idx on public.research_results(order_index);

create table if not exists public.label_config (
  id serial primary key,
  key varchar(100) not null unique,
  value varchar(100) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

alter table public.personal_profile enable row level security;
alter table public.research_results enable row level security;
alter table public.label_config enable row level security;
