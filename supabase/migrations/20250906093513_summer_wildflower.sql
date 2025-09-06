/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `firstName` (text)
      - `lastName` (text)
      - `role` (text)
      - `department` (text)
      - `avatar` (text, optional)
      - `phone` (text, optional)
      - `location` (text, optional)
      - `bio` (text, optional)
      - `joinDate` (timestamp)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)

  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read all users
    - Add policy for users to update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  firstName text NOT NULL,
  lastName text NOT NULL,
  role text NOT NULL DEFAULT 'Member',
  department text NOT NULL DEFAULT 'General',
  avatar text,
  phone text,
  location text,
  bio text,
  joinDate timestamptz DEFAULT now(),
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);