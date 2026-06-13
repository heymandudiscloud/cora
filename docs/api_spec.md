# Cora — API Specification

## Overview

This document defines all API endpoints for the Cora backend. The API follows RESTful conventions. HTTP methods indicate the action being performed — GET to read, POST to create, PUT to update, DELETE to remove.

All authenticated endpoints require a valid session token in the request header. All endpoints return JSON.

Base URL: `https://api.cora.app/v1`

---

## Table of Contents

- [Auth](#auth)
- [Users](#users)
- [Feed](#feed)
- [Follows](#follows)
- [Challenges](#challenges)
- [Proof Submissions](#proof-submissions)
- [Fuel](#fuel)
- [Comments](#comments)
- [Groups](#groups)
- [Notifications](#notifications)
- [Search](#search)
- [Settings](#settings)

---

## Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Register a new user account | No |
| POST | /auth/login | Log in with email and password or SSO | No |
| POST | /auth/logout | Log out and invalidate session | Yes |
| POST | /auth/session | Validate an existing session token | No |
| POST | /auth/forgot-password | Request a password reset email | No |
| POST | /auth/reset-password | Submit a new password using reset token | No |

---

## Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /users/me | Get own profile | Yes |
| PUT | /users/me | Update own profile | Yes |
| DELETE | /users/me | Initiate account deletion | Yes |
| GET | /users/:id | View another user's profile | No |
| GET | /users/me/followers | Get own followers list | Yes |
| GET | /users/me/following | Get own following list | Yes |
| GET | /users/me/challenges | Get own challenge instances | Yes |
| GET | /users/:id/challenges | Get another user's challenge instances | No |
| GET | /users/me/groups | Get groups the current user belongs to | Yes |
| GET | /users/me/feed | Get personalised home feed | Yes |
| GET | /users/me/notifications | Get all notifications | Yes |
| PUT | /users/me/notifications | Mark all notifications as read | Yes |
| PUT | /users/me/notifications/:id | Mark a single notification as read | Yes |
| DELETE | /users/me/notifications/:id | Delete a notification | Yes |
| GET | /users/me/settings | Get account settings | Yes |
| PUT | /users/me/settings | Update account settings | Yes |

---

## Feed

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /users/me/feed | Get unified home feed — own activity, follows and groups | Yes |

Query parameters:
- `page` — page number for pagination
- `limit` — number of results per page, default 20

---

## Follows

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /users/:id/follow | Follow a user or send a follow request | Yes |
| DELETE | /users/:id/follow | Unfollow a user | Yes |

---

## Challenges

### Templates

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /challenges/templates | Get all public community challenge templates | No |
| POST | /challenges/templates | Create a new challenge template | Yes |
| GET | /challenges/templates/:id | Get a specific challenge template | No |
| PUT | /challenges/templates/:id | Update a challenge template | Yes |
| DELETE | /challenges/templates/:id | Delete or archive a challenge template | Yes |

Query parameters for GET /challenges/templates:
- `category` — filter by category (fitness, nutrition, mental_health, creativity, reading, other)
- `sort` — sort by (popular, newest, most_fuelled)
- `page` — page number
- `limit` — results per page, default 20

### Instances

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /challenges/instances | Start a new challenge instance from a template | Yes |
| GET | /challenges/instances/:id | Get a specific challenge instance | Yes |
| PUT | /challenges/instances/:id | Update a challenge instance (name, privacy, status) | Yes |
| DELETE | /challenges/instances/:id | Delete a challenge instance | Yes |

Notes:
- Starting an instance requires a `template_id` in the request body
- Updating status to `completed` or `abandoned` triggers the relevant completion or abandon flow
- DELETE is only permitted on instances the requesting user owns

---

## Proof Submissions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /challenges/instances/:id/proof | Get all proof submissions for an instance | Yes |
| POST | /challenges/instances/:id/proof | Submit a proof post for a requirement | Yes |
| GET | /challenges/instances/:id/proof/:proofId | Get a specific proof submission | Yes |
| PUT | /challenges/instances/:id/proof/:proofId | Update proof post (privacy, caption, fuel_hidden) | Yes |
| DELETE | /challenges/instances/:id/proof/:proofId | Delete a proof submission | Yes |

Notes:
- One proof submission per requirement per day is enforced at the database level
- Media uploads go directly to S3 — the endpoint receives the S3 URL not the file itself
- Multiple proof submissions on the same day are grouped into a parent feed card on the frontend

---

## Fuel

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /posts/:id/fuel | Fuel a proof submission | Yes |
| DELETE | /posts/:id/fuel | Remove fuel from a proof submission | Yes |

Notes:
- A user cannot fuel their own posts
- Fuel is a toggle — POST adds it, DELETE removes it
- Fuel count is stored on the proof submission record and updated on each action

---

## Comments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /challenges/instances/:id/proof/:proofId/comments | Get comments on a proof submission | Yes |
| POST | /challenges/instances/:id/proof/:proofId/comments | Post a comment | Yes |
| DELETE | /challenges/instances/:id/proof/:proofId/comments/:commentId | Delete a comment | Yes |

Notes:
- Users can delete their own comments
- Post owners can delete any comment on their post
- Comments are plain text only for MVP

---

## Groups

### Core

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /groups | Create a new group | Yes |
| GET | /groups/:id | Get a group's details and feed | Yes |
| PUT | /groups/:id | Update group details | Yes |
| DELETE | /groups/:id | Delete a group | Yes |
| GET | /groups/:id/settings | Get group settings | Yes |
| PUT | /groups/:id/settings | Update group settings | Yes |

### Members

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /groups/:id/members | Get all group members | Yes |
| POST | /groups/:id/members | Add a member or accept a join request | Yes |
| PUT | /groups/:id/members/:userId | Update member role or permissions | Yes |
| DELETE | /groups/:id/members/:userId | Remove a member from the group | Yes |

### Invites

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /groups/:id/invite | Send a direct invite to a mutual follow | Yes |
| PUT | /groups/:id/invite | Accept or decline an invite | Yes |
| DELETE | /groups/:id/invite | Cancel or revoke an invite | Yes |
| GET | /groups/:id/invite/link | Get the shareable invite link | Yes |
| PUT | /groups/:id/invite/link | Regenerate the invite link | Yes |
| DELETE | /groups/:id/invite/link | Disable the invite link | Yes |

### Group Challenges

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /groups/:id/challenges | Get all challenges posted to a group | Yes |
| POST | /groups/:id/challenges | Post a challenge to a group | Yes |
| DELETE | /groups/:id/challenges/:challengeId | Remove a challenge from a group | Yes |

---

## Notifications

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /users/me/notifications | Get all notifications | Yes |
| PUT | /users/me/notifications | Mark all notifications as read | Yes |
| PUT | /users/me/notifications/:id | Mark a single notification as read | Yes |
| DELETE | /users/me/notifications/:id | Delete a notification | Yes |

Notification types:
- `fuel_received`
- `comment_posted`
- `challenge_request`
- `challenge_accepted`
- `challenge_declined`
- `new_follower`
- `follow_request`
- `group_invite`
- `group_challenge_posted`
- `streak_milestone`
- `challenge_completed`

---

## Search

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /search | Search users and community challenges | No |

Query parameters:
- `q` — search term, minimum 2 characters
- `type` — filter results by type (users, challenges)
- `page` — page number
- `limit` — results per page, default 20

Examples:
- `GET /search?q=wil&type=users`
- `GET /search?q=75+hard&type=challenges`
- `GET /search?q=fitness` — returns both users and challenges

---

## Settings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /users/me/settings | Get account settings | Yes |
| PUT | /users/me/settings | Update account settings | Yes |
| GET | /groups/:id/settings | Get group settings | Yes |
| PUT | /groups/:id/settings | Update group settings | Yes |

Settings fields (user):
- `is_private` — account visibility
- `hide_fuel_by_default` — hide fuel count on all posts by default
- `who_can_challenge` — everyone, followers, mutual_follows
- `who_can_invite_to_groups` — everyone, mutual_follows
- `notification_preferences` — per type toggles for push and in-app

---

*Cora API Specification v1.0*
