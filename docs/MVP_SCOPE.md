# Cora - MVP Scope

## Purpose of the MVP

The goal of Cora's MVP is to validate the core hypothesis:

**People want a simple, social and customisable way to stay accountable to personal challenges - and they will use a dedicated platform to do it.**

This MVP is intentionally lean. It is not about building everything - it is about building the right things first to test user behaviour, gather feedback and prove the concept works before scaling.

---

## Core Hypothesis

If users can create or join a challenge, submit proof of their progress and share that journey with people who fuel their motivation, they will form habits around Cora and return consistently.

---

## MVP Feature Set

### 1. Authentication
The foundation of the app. Users need a secure identity to track progress and interact with others.

- Email and password registration with email verification
- Google SSO and Apple SSO (Apple mandatory for iOS App Store)
- Login, logout and session management
- Password reset via email
- 30 day account deletion grace period
- Guest browsing - users can explore public content without registering but cannot interact

### 2. User Profiles
Profiles are the public face of a user's challenge journey.

- First name, last name, username, bio and profile photo
- Public or private account setting
- Stats bar  challenges completed, current streak, longest streak ever
- Total fuel accumulated as a reputation score
- Content tabs - Active Challenges, Completed Challenges, Posts grid
- Follow and unfollow other users
- Mutual follow required for direct group invites

### 3. Challenge Templates
Templates are the blueprints that users build from. They are the shareable, reusable core of Cora's content.

- Create a challenge template with name, description, category and duration
- Add one or more requirements to a template
- Each requirement has an activity description, frequency (daily, weekly, x times per week) and proof type (photo, video, journal, checkbox or combination)
- Set template as public to publish to the community or keep private
- Edit templates - full edit if no active instances, name and description only if others have started it
- Archive templates that cannot be deleted due to active instances
- Community templates browsable by category and sortable by popularity, newest and most fuelled

### 4. Challenge Instances
An instance is a user's personal run of a challenge template. Instances are what get tracked, posted about and completed.

- Start an instance from any public template or own private template
- Give the instance a custom name (e.g. Wil's 2026 75 Hard)
- Set instance privacy - public or private
- Set start date
- Track current streak, longest streak and overall progress
- Complete an instance when all requirements are fulfilled for the full duration
- Abandon an instance with a confirmation prompt and effort summary
- Abandoned instances move to a separate section on the profile - not highlighted but preserved
- Repeatable - users can start a new instance of the same template after completing or abandoning

### 5. Proof Submissions
Proof is how users demonstrate they have completed a requirement. It is also the social content that powers the feed.

- Submit proof against a specific requirement for the current day
- Proof types - photo, video, journal entry, checkbox or combination depending on requirement
- Add an optional caption to any proof post
- One proof submission per requirement per day enforced at the database level
- Multiple requirements completed on the same day grouped into a single parent feed card
- Parent card uses an accordion layout - most recently completed requirement expanded by default, earlier ones collapsed
- Set post privacy independently from the challenge instance - public, private or participants only
- Edit post privacy after submission at any time
- Delete proof submissions

### 6. Privacy Model
Privacy is granular and user controlled at two independent levels.

- Challenge instance level - public or private
- Proof submission level - public, private or participants only
- Users can run a fully private challenge and post selectively
- On challenge completion, users are prompted to go public - share everything, choose what to share, or keep private
- Bulk privacy update available from the completed challenge screen at any time

### 7. Feed
The home feed is the unified social layer of Cora - one stream of everything relevant to the user.

- Proof posts from followed users
- Proof posts from groups the user belongs to
- Active challenge summary at the top of the feed
- Same day submissions from the same instance grouped into accordion parent cards
- Fuel and comments on the parent card level
- Chronological ordering
- Paginated on scroll
- Guest preview feed showing public community activity

### 8. Fuel
Fuel is Cora's social currency - the primary way users encourage each other.

- Fuel any public proof post from the feed, group feed or profile grid
- One fuel per user per post - toggle to add or remove
- Fuel count displayed on parent card unless hidden by the post owner
- Post owner receives a notification when their post is fuelled
- Users cannot fuel their own posts
- Total fuel accumulates on the user's profile as a reputation score
- Hide fuel count on individual posts or set a global default to hide

### 9. Comments
Comments sit on the parent feed card and support encouragement and conversation.

- Comment on any public proof post
- Post owner and commenter receive notifications for new comments and replies
- Post owner can delete any comment on their post
- Users can delete their own comments
- Plain text only for MVP

### 10. Groups
Groups are small, private invite-based collections of users who challenge each other.

- Create a group with a name, optional description and profile photo
- Set group privacy - invite only or open with request approval
- Creator is automatically group admin
- Admin and member roles with configurable invite permissions
- Direct invites limited to mutual follows
- Shareable invite link that bypasses the mutual follow requirement
- Admin can disable or regenerate the invite link
- Admin can manage member roles, remove members and transfer ownership
- Group feed scoped to that group's challenge activity
- Post a group challenge - any member can post, all members are notified and can accept or decline individually
- Members who accept create their own named instance linked to the group challenge

### 11. Challenge Requests
Users can challenge each other directly as a social mechanic.

- Challenge any user from a template or active instance
- Add an optional message with the request
- Recipient accepts or declines from notifications
- Requests expire after 7 days
- On acceptance, recipient creates their own named instance linked to the challenger

### 12. Notifications
A chronological feed of everything relevant to the user.

- Fuel received
- Comment posted
- Challenge request received, accepted or declined
- New follower or follow request
- Group invite
- Group challenge posted
- Streak milestone
- Challenge completed
- Badge clears on opening the notifications screen
- Mark individual or all notifications as read
- Per type toggles for push and in-app notifications
- Custom reminder time for daily requirement submissions

### 13. Search
Basic text search across users and community challenge templates.

- Search by username or challenge name
- Filter by type - users or challenges
- Minimum 2 characters before search fires
- Results update as the user types

### 14. Settings
Account and notification preferences.

- Account visibility - public or private
- Who can send challenge requests - everyone, followers, mutual follows
- Who can invite to groups - everyone, mutual follows
- Hide fuel by default on all posts
- Notification preferences per type
- Connected accounts - Google and Apple SSO
- Danger zone - log out and delete account

---

## Navigation Structure

**Bottom navigation:**
- Home
- Challenges
- Groups
- Profile

**Top right (persistent):**
- Bell - notifications
- DM - direct messages (post-MVP)
- + - create challenge (My Challenges tab only)

---

## What Is Not in the MVP

These features are identified and planned but deferred until after the MVP is validated:

- Direct messaging
- Organisation and creator accounts
- Community pages with moderation tools
- Freeform goal posting without set criteria
- Achievement badges
- Leaderboards within group challenges
- Onboarding flow for new users
- Content moderation and reporting
- Search optimisation and personalised discovery
- Media compression and file size enforcement
- Comments with mentions, replies and media support
- Push notification infrastructure

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile and Web | React Native via Expo |
| Backend | Node.js with Express |
| Database | PostgreSQL on AWS RDS |
| Auth | AWS Cognito |
| Media Storage | AWS S3 |
| Hosting | AWS |

Development is done locally first. AWS is used for deployment when the app is ready for real users.

---

## Build Order (8 Weeks)

| Weeks | Focus | Deliverables |
|---|---|---|
| 1-2 | Auth and navigation | Expo setup, navigation skeleton, registration, login, SSO, session management |
| 3-4 | Challenges | Challenge template creation, instance creation, PostgreSQL setup, basic API |
| 5-6 | Social layer | Proof submissions, feed, fuel, comments, follow system |
| 7-8 | Groups and polish | Groups, notifications, search, bug fixing |

Target: a functional end to end MVP where users can register, create or join challenges, submit proof, fuel each other's posts and challenge friends.

---

*Cora MVP Scope v2.0*
