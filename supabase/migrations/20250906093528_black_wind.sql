/*
  # Create tasks table

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `status` (text)
      - `priority` (text)
      - `assigneeId` (uuid, foreign key)
      - `projectId` (uuid, foreign key)
      - `dueDate` (timestamp)
      - `createdAt` (timestamp)
      - `updatedAt` (timestamp)

  2. Security
    - Enable RLS on `tasks` table
    - Add policy for project members to read tasks
    - Add policy for assignees and project owners to update tasks
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'review', 'done')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  assigneeId uuid REFERENCES users(id) ON DELETE SET NULL,
  projectId uuid REFERENCES projects(id) ON DELETE CASCADE,
  dueDate timestamptz,
  createdAt timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project members can read tasks"
  ON tasks
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_members 
      WHERE project_members.projectId = tasks.projectId 
      AND project_members.userId = auth.uid()
    )
  );

CREATE POLICY "Assignees and project owners can update tasks"
  ON tasks
  FOR UPDATE
  TO authenticated
  USING (
    assigneeId = auth.uid() OR
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = tasks.projectId 
      AND projects.ownerId = auth.uid()
    )
  );

CREATE POLICY "Project members can create tasks"
  ON tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM project_members 
      WHERE project_members.projectId = tasks.projectId 
      AND project_members.userId = auth.uid()
    )
  );