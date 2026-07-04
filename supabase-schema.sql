-- ═══════════════════════════════════════════════════════════════════
-- MicroClaw — Database Schema (Supabase / PostgreSQL)
-- ═══════════════════════════════════════════════════════════════════

-- ── Plans (reference data) ──
CREATE TABLE plans (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  price_monthly INT NOT NULL,            -- in IDR
  vps_size    TEXT NOT NULL,              -- DO slug: s-1vcpu-1gb etc
  token_limit INT NOT NULL DEFAULT 50000, -- monthly AI token limit
  storage_gb  INT NOT NULL DEFAULT 25,
  max_agents  INT NOT NULL DEFAULT 1,
  features    JSONB NOT NULL DEFAULT '[]'
);

INSERT INTO plans (id, name, price_monthly, vps_size, token_limit, storage_gb, max_agents) VALUES
  ('starter',  'Starter',  150000, 's-1vcpu-1gb',  50000,  25, 1),
  ('pro',      'Pro',      300000, 's-1vcpu-2gb',  150000, 50, 3),
  ('business', 'Business', 500000, 's-2vcpu-2gb',  500000, 100, 5);

-- ── Users ──
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  whatsapp      TEXT,
  business_type TEXT,
  use_case      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Subscriptions ──
CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id),
  plan_id         TEXT NOT NULL REFERENCES plans(id),

  -- DO droplet
  droplet_id      INT,                 -- DigitalOcean droplet ID
  droplet_ip      TEXT,
  droplet_region  TEXT NOT NULL DEFAULT 'sgp1',

  -- OpenClaw access
  gateway_token   TEXT,
  gateway_port    INT NOT NULL DEFAULT 3000,

  -- AI model
  model_provider  TEXT NOT NULL DEFAULT 'google/gemini-2.0-flash',
  model_api_key   TEXT,                -- encrypted at rest

  -- Usage tracking
  tokens_used     INT NOT NULL DEFAULT 0,
  billing_period  DATE NOT NULL,       -- start of current billing period

  -- Status
  status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active', 'suspended', 'cancelled', 'provisioning')),
  trial_ends_at   TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Usage Logs ──
CREATE TABLE usage_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  tokens_used     INT NOT NULL,
  model           TEXT NOT NULL,
  endpoint        TEXT,
  response_time_ms INT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Payments (Midtrans) ──
CREATE TABLE payments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  midtrans_id     TEXT,
  amount          INT NOT NULL,          -- in IDR
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Indexes ──
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_usage_logs_subscription_id ON usage_logs(subscription_id);
CREATE INDEX idx_usage_logs_created_at ON usage_logs(created_at);
CREATE INDEX idx_payments_subscription_id ON payments(subscription_id);

-- ── Auto-update updated_at ──
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
