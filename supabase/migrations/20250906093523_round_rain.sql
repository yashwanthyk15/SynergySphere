/*
  # Create project_members table

  1. New Tables
    - `project_members`
      - `id` (uuid, primary key)
      - `projectId` (uuid, foreign key)
      - `userId` (uuid, foreign key)
      - `role` (text)
      - `joinedAt` (timestamp)

  2. Security
    - Enable RLS on `project_members` table
    - Add policy for project members to read membership data
    - Add policy for project owners to manage members
*/

CREATE TABLE IF NOT EXISTS project_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  projectId uuid REFERENCES projects(id) ON DELETE CASCADE,
  userId uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member', 'viewer')),
  joinedAt timestamptz DEFAULT now(),
  UNIQUE(projectId, userId)
);

ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read project memberships they are part of"
  ON project_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_members pm 
      WHERE pm.projectId = project_members.projectId 
      AND pm.userId = auth.uid()
    )
  );

CREATE POLICY "Project owners can manage members"
  ON project_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_members.projectId 
      AND projects.ownerId = auth.uid()
    )
  );

CREATE POLICY "Users can join projects"
  ON project_members
  FOR INSERT
  TO authenticated
  WITH CHECK (userId = auth.uid());