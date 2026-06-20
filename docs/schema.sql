-- =============================================================
-- Cora Database Schema
-- PostgreSQL
-- =============================================================


-- =============================================================
-- USERS
-- =============================================================

CREATE TABLE users (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username                 VARCHAR(30) NOT NULL UNIQUE,
  email                    VARCHAR(255) NOT NULL UNIQUE,
  first_name               VARCHAR(50) NOT NULL,
  last_name                VARCHAR(50) NOT NULL,
  bio                      TEXT,
  profile_photo_url        TEXT,
  is_private               BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified              BOOLEAN NOT NULL DEFAULT FALSE,
  email_verified           BOOLEAN NOT NULL DEFAULT FALSE,
  password_hash            VARCHAR(255),
  total_fuel               INTEGER NOT NULL DEFAULT 0,
  challenges_completed     INTEGER NOT NULL DEFAULT 0,
  longest_streak           INTEGER NOT NULL DEFAULT 0,
  hide_fuel_by_default     BOOLEAN NOT NULL DEFAULT FALSE,
  account_status           VARCHAR(20) NOT NULL DEFAULT 'active',
  -- account_status: active, suspended, pending_deletion
  deletion_scheduled_at    TIMESTAMP,
  cognito_id               VARCHAR(255) UNIQUE,
  created_at               TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- AUTH TOKENS
-- =============================================================

CREATE TABLE email_verification_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       VARCHAR(255) NOT NULL UNIQUE,
  expires_at  TIMESTAMP NOT NULL,
  used_at     TIMESTAMP,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE password_reset_tokens (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       VARCHAR(255) NOT NULL UNIQUE,
  expires_at  TIMESTAMP NOT NULL,
  used_at     TIMESTAMP,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- FOLLOWS
-- =============================================================

CREATE TABLE follows (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status        VARCHAR(20) NOT NULL DEFAULT 'pending',
  -- status: pending, accepted
  created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (follower_id, following_id),
  CHECK (follower_id != following_id)
);


-- =============================================================
-- CHALLENGE TEMPLATES
-- =============================================================

CREATE TABLE challenge_templates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  name            VARCHAR(100) NOT NULL,
  description     TEXT NOT NULL,
  category        VARCHAR(50) NOT NULL,
  -- category: fitness, nutrition, mental_health, creativity, reading, other
  duration_days   INTEGER NOT NULL,
  is_public       BOOLEAN NOT NULL DEFAULT FALSE,
  is_community    BOOLEAN NOT NULL DEFAULT FALSE,
  is_archived     BOOLEAN NOT NULL DEFAULT FALSE,
  instance_count  INTEGER NOT NULL DEFAULT 0,
  total_fuel      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- REQUIREMENTS
-- Each requirement belongs to a challenge template.
-- Defines what a user must do and how they must prove it.
-- =============================================================

CREATE TABLE requirements (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id           UUID NOT NULL REFERENCES challenge_templates(id) ON DELETE CASCADE,
  title                 VARCHAR(100) NOT NULL,
  description           TEXT,
  times_per_day INTEGER NOT NULL DEFAULT 1,
  frequency_days VARCHAR(50) NOT NULL DEFAULT 'everyday',
  specific_days TEXT[],
  proof_type TEXT[] NOT NULL DEFAULT '{checkbox}',
  -- proof_type: photo, video, journal, checkbox
  media_required        BOOLEAN NOT NULL DEFAULT FALSE,
  journal_required      BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order            INTEGER NOT NULL DEFAULT 0,
  created_at            TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- CHALLENGE INSTANCES
-- A user's personal run of a challenge template.
-- =============================================================

CREATE TABLE challenge_instances (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id       UUID NOT NULL REFERENCES challenge_templates(id) ON DELETE RESTRICT,
  owner_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  custom_name       VARCHAR(150) NOT NULL,
  privacy           VARCHAR(30) NOT NULL DEFAULT 'public',
  -- privacy: public, private
  status            VARCHAR(20) NOT NULL DEFAULT 'active',
  -- status: active, completed, abandoned
  start_date        DATE NOT NULL,
  end_date          DATE NOT NULL,
  current_streak    INTEGER NOT NULL DEFAULT 0,
  longest_streak    INTEGER NOT NULL DEFAULT 0,
  total_fuel        INTEGER NOT NULL DEFAULT 0,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at      TIMESTAMP,
  abandoned_at      TIMESTAMP,
  created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- INSTANCE PARTICIPANTS
-- Tracks users who are linked via a challenge request.
-- =============================================================

CREATE TABLE instance_participants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instance_id     UUID NOT NULL REFERENCES challenge_instances(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  invited_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  status          VARCHAR(20) NOT NULL DEFAULT 'pending',
  -- status: pending, accepted, declined
  joined_at       TIMESTAMP,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (instance_id, user_id)
);


-- =============================================================
-- PROOF SUBMISSIONS
-- Individual proof posts against a requirement.
-- =============================================================

CREATE TABLE proof_submissions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instance_id       UUID NOT NULL REFERENCES challenge_instances(id) ON DELETE CASCADE,
  requirement_id    UUID NOT NULL REFERENCES requirements(id) ON DELETE RESTRICT,
  owner_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  caption           TEXT,
  proof_type        VARCHAR(30) NOT NULL,
  -- proof_type: photo, video, journal, checkbox, combination
  media_url         TEXT,
  journal_text      TEXT,
  privacy           VARCHAR(30) NOT NULL DEFAULT 'public',
  -- privacy: public, private, participants_only
  fuel_hidden       BOOLEAN NOT NULL DEFAULT FALSE,
  fuel_count        INTEGER NOT NULL DEFAULT 0,
  comment_count     INTEGER NOT NULL DEFAULT 0,
  submitted_date    DATE NOT NULL,
  created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (instance_id, requirement_id, submitted_date)
  -- enforces one proof submission per requirement per day
);


-- =============================================================
-- FUEL
-- Tracks which users have fuelled which proof submissions.
-- =============================================================

CREATE TABLE fuel (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proof_submission_id   UUID NOT NULL REFERENCES proof_submissions(id) ON DELETE CASCADE,
  user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at            TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (proof_submission_id, user_id)
);


-- =============================================================
-- COMMENTS
-- Comments on proof submission parent cards.
-- =============================================================

CREATE TABLE comments (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proof_submission_id   UUID NOT NULL REFERENCES proof_submissions(id) ON DELETE CASCADE,
  author_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body                  TEXT NOT NULL,
  created_at            TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- GROUPS
-- =============================================================

CREATE TABLE groups (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              VARCHAR(100) NOT NULL,
  description       TEXT,
  profile_photo_url TEXT,
  privacy           VARCHAR(20) NOT NULL DEFAULT 'invite_only',
  -- privacy: invite_only, request_to_join
  invite_link_token VARCHAR(255) UNIQUE,
  invite_link_active BOOLEAN NOT NULL DEFAULT TRUE,
  member_count      INTEGER NOT NULL DEFAULT 1,
  created_by        UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- GROUP MEMBERS
-- =============================================================

CREATE TABLE group_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id    UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role        VARCHAR(20) NOT NULL DEFAULT 'member',
  -- role: admin, member
  can_invite  BOOLEAN NOT NULL DEFAULT FALSE,
  status      VARCHAR(20) NOT NULL DEFAULT 'active',
  -- status: active, removed
  joined_at   TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE (group_id, user_id)
);


-- =============================================================
-- GROUP CHALLENGES
-- Links a challenge instance to a group.
-- =============================================================

CREATE TABLE group_challenges (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id      UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  template_id   UUID NOT NULL REFERENCES challenge_templates(id) ON DELETE RESTRICT,
  posted_by     UUID NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  status        VARCHAR(20) NOT NULL DEFAULT 'active',
  -- status: active, inactive, expired
  expires_at    TIMESTAMP NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- NOTIFICATIONS
-- =============================================================

CREATE TABLE notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  type          VARCHAR(50) NOT NULL,
  -- type: fuel_received, comment_posted, challenge_request, challenge_accepted,
  --       challenge_declined, new_follower, follow_request, group_invite,
  --       group_challenge_posted, streak_milestone, challenge_completed
  entity_type   VARCHAR(50),
  -- entity_type: proof_submission, challenge_instance, group, user
  entity_id     UUID,
  body          TEXT,
  is_read       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =============================================================
-- INDEXES
-- =============================================================

-- Users
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_account_status ON users(account_status);

-- Follows
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
CREATE INDEX idx_follows_status ON follows(status);

-- Challenge templates
CREATE INDEX idx_challenge_templates_creator_id ON challenge_templates(creator_id);
CREATE INDEX idx_challenge_templates_category ON challenge_templates(category);
CREATE INDEX idx_challenge_templates_is_public ON challenge_templates(is_public);

-- Requirements
CREATE INDEX idx_requirements_template_id ON requirements(template_id);

-- Challenge instances
CREATE INDEX idx_challenge_instances_owner_id ON challenge_instances(owner_id);
CREATE INDEX idx_challenge_instances_template_id ON challenge_instances(template_id);
CREATE INDEX idx_challenge_instances_status ON challenge_instances(status);

-- Instance participants
CREATE INDEX idx_instance_participants_instance_id ON instance_participants(instance_id);
CREATE INDEX idx_instance_participants_user_id ON instance_participants(user_id);

-- Proof submissions
CREATE INDEX idx_proof_submissions_instance_id ON proof_submissions(instance_id);
CREATE INDEX idx_proof_submissions_owner_id ON proof_submissions(owner_id);
CREATE INDEX idx_proof_submissions_submitted_date ON proof_submissions(submitted_date);
CREATE INDEX idx_proof_submissions_privacy ON proof_submissions(privacy);

-- Fuel
CREATE INDEX idx_fuel_proof_submission_id ON fuel(proof_submission_id);
CREATE INDEX idx_fuel_user_id ON fuel(user_id);

-- Comments
CREATE INDEX idx_comments_proof_submission_id ON comments(proof_submission_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);

-- Groups
CREATE INDEX idx_groups_created_by ON groups(created_by);
CREATE INDEX idx_groups_invite_link_token ON groups(invite_link_token);

-- Group members
CREATE INDEX idx_group_members_group_id ON group_members(group_id);
CREATE INDEX idx_group_members_user_id ON group_members(user_id);

-- Group challenges
CREATE INDEX idx_group_challenges_group_id ON group_challenges(group_id);
CREATE INDEX idx_group_challenges_template_id ON group_challenges(template_id);

-- Notifications
CREATE INDEX idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
