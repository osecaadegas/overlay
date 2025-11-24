-- Create user_permissions table
CREATE TABLE IF NOT EXISTS user_permissions (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated users to read" 
  ON user_permissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy to allow service role to manage all data
CREATE POLICY "Allow service role full access" 
  ON user_permissions 
  FOR ALL 
  USING (auth.role() = 'service_role');
