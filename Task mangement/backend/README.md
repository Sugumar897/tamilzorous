Task Management System (Node.js + Express + PostgreSQL + JWT)

This is the **backend API** for a Task Management System built using **Node.js**, **Express**, **PostgreSQL**, and **JWT authentication**.  
It handles user registration, login, and task management for **Admins** and **Employees**.


User Registration & Login (with JWT Authentication)  
Encrypted Passwords (bcrypt)  
Role-based Access (Admin / Employee)  
Task CRUD APIs  
PostgreSQL Database Integration  
Organized Folder Structure  


install backend 

open backend code path in cmd

### `npm install`

### `node index.js`


postgres table script

-- Table: public.tasks

-- DROP TABLE IF EXISTS public.tasks;

CREATE TABLE IF NOT EXISTS public.tasks
(
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    assigned_to text COLLATE pg_catalog."default" NOT NULL,
    status text COLLATE pg_catalog."default" DEFAULT 'Pending'::text,
    created_at timestamp without time zone DEFAULT now(),
    isactive boolean DEFAULT true,
    priority text COLLATE pg_catalog."default" DEFAULT 'Low'::text,
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tasks
    OWNER to postgres;




    -- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    role text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;


