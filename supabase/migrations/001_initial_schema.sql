-- ============================================
-- StrataReady Schema v1.0
-- ============================================

create extension if not exists "pgcrypto";

-- 21 course sections
create table sections (
  id          serial primary key,
  number      integer not null unique,
  title       text not null,
  description text,
  created_at  timestamptz default now()
);

-- 20 questions per section = 420 total
create table questions (
  id                  uuid primary key default gen_random_uuid(),
  section_id          integer references sections(id) on delete cascade,
  question_text       text not null,
  option_a            text not null,
  option_b            text not null,
  option_c            text not null,
  option_d            text not null,
  correct_answer      char(1) not null check (correct_answer in ('A','B','C','D')),
  explanation         text not null,
  textbook_chapter    integer,
  textbook_pages      text,
  act_reference       text,
  regulation_ref      text,
  difficulty          integer default 2 check (difficulty in (1,2,3)),
  is_active           boolean default true,
  created_at          timestamptz default now()
);

-- users (auth wires in later)
create table users (
  id          uuid primary key,
  email       text unique not null,
  full_name   text,
  plan        text default 'free' check (plan in ('free','monthly','lifetime')),
  created_at  timestamptz default now()
);

-- one row per exam session
create table exam_attempts (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references users(id) on delete cascade,
  started_at      timestamptz default now(),
  completed_at    timestamptz,
  score           integer,
  total_questions integer default 105,
  passed          boolean,
  status          text default 'in_progress' check (status in ('in_progress','completed','abandoned'))
);

-- one row per question per attempt
create table attempt_answers (
  id              uuid primary key default gen_random_uuid(),
  attempt_id      uuid references exam_attempts(id) on delete cascade,
  question_id     uuid references questions(id) on delete cascade,
  selected_answer char(1) check (selected_answer in ('A','B','C','D')),
  is_correct      boolean,
  flagged         boolean default false,
  answered_at     timestamptz default now()
);

-- aggregated scores per section per attempt
create table section_performance (
  id              uuid primary key default gen_random_uuid(),
  attempt_id      uuid references exam_attempts(id) on delete cascade,
  section_id      integer references sections(id) on delete cascade,
  questions_count integer not null,
  correct_count   integer not null,
  score_pct       numeric(5,2),
  created_at      timestamptz default now()
);

-- indexes
create index idx_questions_section on questions(section_id);
create index idx_questions_active on questions(is_active);
create index idx_attempt_answers_attempt on attempt_answers(attempt_id);
create index idx_attempt_answers_question on attempt_answers(question_id);
create index idx_exam_attempts_user on exam_attempts(user_id);
create index idx_section_performance_attempt on section_performance(attempt_id);

-- seed: exact UBC lesson titles
insert into sections (number, title) values
  (1,  'Fundamentals of Law and the Real Estate Services Act'),
  (2,  'Professionalism and Ethics'),
  (3,  'Estates and Interests in Land, the Subdivision of Land and Title Registration'),
  (4,  'The Professional Liability of Real Estate Licensees'),
  (5,  'Residential and Commercial Tenancies'),
  (6,  'The Law of Contract'),
  (7,  'Strata Management Contracts and the Law of Agency'),
  (8,  'Effective Negotiations and Alternative Dispute Resolution'),
  (9,  'Strata Properties (Condominiums) and Cooperatives in British Columbia'),
  (10, 'Overview of the Strata Property Act and Regulation'),
  (11, 'Sections'),
  (12, 'Strata Meetings and Communications; and Strata Governance: Meetings, Rules, and Effective Decision Making'),
  (13, 'Protection of Personal Information'),
  (14, 'Building Design and Construction'),
  (15, 'Controls, Maintenance and Energy Conservation'),
  (16, 'Insurance and Risk Management; and Security, Environmental Protection, and Hazardous Materials'),
  (17, 'Local Government Law'),
  (18, 'Accounting Fundamentals for Strata Management'),
  (19, 'Budgeting: The Operating Budget and Fund'),
  (20, 'Budgeting: The Contingency Reserve Fund and Depreciation Reports'),
  (21, 'Purchasing and Personnel Management');

  -- Grants
grant usage on schema public to anon, authenticated, service_role;
grant select on sections to anon, authenticated, service_role;
grant select on questions to anon, authenticated, service_role;

-- Knowledge base documents table
create table kb_documents (
  id            uuid primary key default gen_random_uuid(),
  file_name     text not null,
  file_path     text not null unique,
  doc_type      text not null check (doc_type in ('chapter','assignment','act','regulation')),
  lesson_number integer,          -- for chapters/assignments: which lesson (1-21)
  chapter_number integer,         -- for chapters: chapter number (1-27)
  act_name      text,             -- for acts: e.g. 'BCSPA', 'RESA', 'PIPA'
  extracted_text text,            -- full text content extracted from PDF
  page_count    integer,
  processed     boolean default false,
  created_at    timestamptz default now()
);

-- Grant access
grant all on kb_documents to service_role;
grant select on kb_documents to anon, authenticated;