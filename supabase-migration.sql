-- Add onboarding status to customers if not present
ALTER TABLE customers
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- Add created_at if not present
ALTER TABLE customers
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Add onboarding_steps table if not present
CREATE TABLE IF NOT EXISTS onboarding_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  step_name text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz
);

-- Add status to transactions if not present
ALTER TABLE transactions
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';

-- Add created_at to wallets and transactions if not present
ALTER TABLE wallets
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

ALTER TABLE transactions
ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Add businesses table if not present
CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES customers(id),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Add business_customers join table if not present
CREATE TABLE IF NOT EXISTS business_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  role text, -- e.g., 'admin', 'member'
  created_at timestamptz DEFAULT now()
);

-- Add bank_accounts table if not present
CREATE TABLE IF NOT EXISTS bank_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  business_id uuid REFERENCES businesses(id),
  bank_name text NOT NULL,
  account_number text NOT NULL,
  routing_number text NOT NULL,
  type text NOT NULL, -- e.g., 'checking', 'savings'
  created_at timestamptz DEFAULT now()
);

-- Add kyc_verifications table if not present
CREATE TABLE IF NOT EXISTS kyc_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  status text NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'approved', 'rejected'
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  rejection_reason text,
  document_url text
);

-- Add audit_logs table if not present
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid, -- could be customer_id, business_id, or admin
  action text NOT NULL,
  target_type text, -- e.g., 'customer', 'business', 'wallet'
  target_id uuid,
  details jsonb,
  created_at timestamptz DEFAULT now()
);

-- Add notifications table if not present
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
