# Cora — User Stories

## Overview

This document contains all user stories for the Cora MVP. Cora is a social accountability and challenge tracking app where users create or join challenges, submit proof of completion, and fuel each other's progress.

---

## Table of Contents

- [Authentication](#authentication)
- [Guest Access](#guest-access)
- [Profile](#profile)
- [Challenges](#challenges)
- [Groups](#groups)
- [Social](#social)
- [Feed](#feed)
- [Notifications](#notifications)
- [Search](#search)
- [Settings](#settings)

---

## Authentication

### US-001 — User Registration
**As a new user I want to register so that I can access personalised features and interact with the Cora community.**

Acceptance criteria:
- User can enter first name, last name, username, email and password
- Password field has a show/hide toggle
- Username must be unique with real time feedback if taken
- Email must be valid format
- Password must meet minimum requirements (8+ characters, one number, one special character)
- On submit, a verification email is sent to the provided address
- User cannot access the app until email is verified
- If email is already registered, user is informed and prompted to log in instead
- Registration works on iOS, Android and web

---

### US-002 — Guest Browsing
**As a visitor I want to explore Cora without registering so that I can decide if it is worth signing up.**

Acceptance criteria:
- Guest can browse community challenges
- Guest can view public profiles and proof posts
- Guest cannot fuel, comment, create challenges or accept challenges
- When a guest attempts an interaction they are prompted to register
- Prompt includes context of the action they were trying to take
- Guest session converts to a full account on registration without losing navigation context

---

### US-003 — User Login
**As a registered user I want to login so that I can access my account.**

Acceptance criteria:
- User can login with email and password
- User can login with Google SSO
- User can login with Apple SSO on iOS
- Password field has a show/hide toggle
- If credentials are incorrect, user is shown a generic error — "Incorrect email or password" without specifying which field is wrong
- User is redirected to their home feed on successful login
- Session persists until the user explicitly logs out
- Forgot password link is visible on the login screen

---

### US-004 — Password Reset
**As a registered user I want to reset my password so that I can regain access to my account if I forget it.**

Acceptance criteria:
- User can tap "Forgot password" from the login screen
- User enters their registered email address
- A password reset email is sent if the email exists in the system
- If the email is not registered, no error is shown — a generic confirmation message is displayed regardless to prevent account enumeration
- Reset link expires after 24 hours
- User is prompted to enter a new password on the reset screen
- New password must meet minimum requirements (8+ characters, one number, one special character)
- On successful reset, user is redirected to login
- Old password is immediately invalidated on reset

---

### US-017 — Log Out
**As a registered user I want to log out of my account so that I can prevent unauthorised access or switch to another account.**

Acceptance criteria:
- User can log out from the profile tab or account settings
- On log out, the user session is immediately invalidated
- User is redirected to the login screen on log out
- All locally cached personal data is cleared on log out
- If logged in via SSO, the Cora session is ended but the user is not logged out of Google or Apple
- Log out is an immediate action with no confirmation prompt
- Auto login does not persist after log out

---

### US-018 — Delete Account
**As a registered user I want to delete my account so that I can permanently remove my data from Cora.**

Acceptance criteria:
- User can initiate account deletion from account settings
- User is shown a clear warning explaining what will be permanently deleted — profile, challenge instances, proof posts, fuel, comments and group memberships
- User must confirm deletion by typing their username before proceeding
- On confirmation, account deletion is scheduled with a 30 day grace period before permanent deletion
- User receives an email confirming deletion has been initiated with instructions to cancel within the grace period
- User can cancel deletion by logging back in within the 30 day grace period
- After 30 days all personal data is permanently deleted including media from S3
- ChallengeTemplates the user created that have active instances from other users are anonymised rather than deleted to preserve other users progress
- User is removed from all groups on deletion
- If user is the sole admin of a group, the longest standing member is promoted before deletion
- Deleted account username becomes available for others after permanent deletion
- Accounts connected via SSO follow the same deletion flow

---

## Guest Access

See US-002 above.

---

## Profile

### US-019 — View Own Profile
**As a registered user I want to view my own profile so that I can see my details, progress and manage my account.**

Acceptance criteria:
- User can access their profile from the Profile tab in the bottom navigation
- Profile displays full name, username, profile photo and bio
- Profile displays follower count and following count, both tappable to view lists
- Profile displays total fuel accumulated
- Stats bar shows challenges completed, current active streaks and longest streak ever
- Content tabs display Active Challenges, Completed Challenges and Posts in a grid view
- User can see all their own posts regardless of privacy setting with private posts visually distinguished by a lock icon
- Active challenge cards show challenge name, day number, streak and progress bar
- Completed challenges show completion date and total fuel received
- User can navigate to account settings from their profile

---

### US-020 — Edit Profile
**As a registered user I want to edit my profile so that I can keep my details accurate and manage my account preferences.**

Acceptance criteria:
- User can access profile editing from their own profile page
- User can update first name, last name, username, bio and profile photo
- Username change checks availability in real time with feedback if taken
- User can update their email address with verification of the new email required before the change takes effect
- User can update their password with current password required before setting a new one
- User can connect or disconnect Google and Apple SSO from their account
- User can set their account to public or private
- Profile photo can be uploaded from camera roll or taken directly
- Changes are saved explicitly via a save button and not auto saved
- User receives confirmation when changes are saved successfully
- If email is changed, the old email address receives a security notification

---

### US-021 — View Another User's Profile
**As a registered user I want to view another user's profile so that I can see their progress and activity.**

Acceptance criteria:
- User can navigate to another user's profile by tapping their name or avatar anywhere in the app
- Public profiles are fully visible to any registered user
- Private profiles show only username, profile photo, bio, follower count and a follow request button
- Mutual follows can see the full profile regardless of privacy setting
- Profile displays the same structure as own profile including stats bar, fuel count and content tabs
- Follow and Challenge buttons are visible on other users profiles
- Private posts on a public profile are not shown to other users
- Guest users can view public profiles but cannot follow or interact

---

## Challenges

### US-005 — Create a Challenge
**As a registered user I want to create a challenge so that I can challenge myself, other users and the community.**

Acceptance criteria:
- User can access challenge creation via the + icon on the My Challenges tab
- User must provide a challenge name and description
- User must set a duration as a start and end date or a length in days
- User must set at least one requirement
- Each requirement has an activity description, frequency (daily, weekly, x times per week) and proof type (photo, video, journal, checkbox or combination)
- User can add multiple requirements to a single challenge
- User can set a category (fitness, nutrition, mental health, creativity, reading, other)
- User can set privacy as public or private
- User can optionally invite specific users to join at creation
- User can optionally publish to the community so any user can start it
- Published challenges appear in community templates and are searchable by other users
- Challenge is saved as a ChallengeTemplate if published to the community or a private ChallengeInstance if kept personal
- User sees a confirmation screen on successful creation
- Incomplete required fields prevent submission with inline validation errors

---

### US-006 — Edit a Challenge
**As a registered user I want to edit a challenge I created so that I can fix mistakes and keep it up to date.**

Acceptance criteria:
- User can edit a challenge template they created
- If no instances have been started by other users, all fields are editable
- If other users have active instances, only name, description and category are editable and requirements cannot be changed
- User can edit the custom name of their own ChallengeInstance at any time
- User is informed why certain fields are locked if applicable
- Changes to a template do not retroactively affect active instances
- User sees a confirmation on successful save
- Edits are not permitted on completed or abandoned challenge instances

---

### US-007 — Delete a Challenge
**As a registered user I want to delete challenges so that I can keep my challenge list relevant and uncluttered.**

Acceptance criteria:
- User can delete a ChallengeInstance they own from their My Challenges list
- User can delete a ChallengeTemplate they created if no other users have active instances
- If other users have active instances, the template cannot be deleted and the user is informed why
- In that case the user can archive the template instead, removing it from community discovery but preserving existing instances
- Deleting a ChallengeInstance permanently removes it and all associated proof submissions from the user's profile
- User is shown a confirmation prompt before deletion as the action is irreversible
- User is warned when deleting a completed challenge instance that they will lose their history and proof posts
- Deleted templates do not affect other users active instances

---

### US-008 — Join a Challenge
**As a registered user I want to join other users and community challenges so that I can participate and track my own progress.**

Acceptance criteria:
- User can browse community challenges on the Challenges tab
- User can view a challenge template's details before joining including name, description, requirements, duration, category and instance count
- User can start an instance of any public community challenge
- On joining, user is prompted to give their instance a custom name
- Custom name defaults to a suggestion if the user skips it
- User can set their instance privacy on join
- User can set their start date which defaults to today
- On joining, the instance appears in the user's My Challenges tab
- User cannot join the same template twice simultaneously and must complete or abandon an existing instance first
- Guest users are prompted to register before joining a challenge
- Instance count on the community template increments on join

---

### US-009 — Challenge Another User
**As a registered user I want to challenge other users so that we can complete challenges together and hold each other accountable.**

Acceptance criteria:
- User can challenge another user from a challenge template or their own active ChallengeInstance
- User can search for and select one or multiple users to challenge
- User can add an optional message with the challenge request
- Challenge request appears in the recipient's notifications feed
- Recipient can accept or decline from the notification
- If accepted, recipient is prompted to name their own instance and set privacy before it begins
- If declined, the challenger receives a notification
- Challenge requests expire after 7 days if not responded to with the challenger notified
- Challenged users can see each other's progress once both have active instances
- User cannot challenge someone whose privacy settings prevent it
- Guest users cannot send or receive challenge requests
- Direct challenge invites require mutual follows per US-015

---

### US-033 — Complete a Challenge
**As a registered user I want to complete a challenge so that my achievement is recognised and I can celebrate my effort.**

Acceptance criteria:
- A challenge is automatically marked as complete when all requirements have been fulfilled for the full duration
- User receives a push notification and in-app notification on completion
- A celebration screen is shown displaying challenge name, duration, total days completed, longest streak, total fuel received and a summary of proof posts
- Completed challenge moves from Active Challenges to Completed Challenges on the user's profile
- Completion is visible to followers if the challenge instance is public
- User is prompted with the go public flow per US-030 if the challenge instance is private
- Completed challenges cannot be edited or have new proof submitted
- Total fuel is frozen at completion
- Completion triggers an achievement card post in the user's feed if public
- Followers receive a notification that the user completed a challenge

---

### US-034 — View Community Challenges
**As a registered user I want to browse community challenges so that I can find challenges to join and get inspired.**

Acceptance criteria:
- User can access community challenges from the Challenges tab
- Challenges are displayed in a browsable list or grid
- User can filter by category (fitness, nutrition, mental health, creativity, reading, other)
- User can sort by most popular, newest and most fuelled
- Each challenge card shows name, category, description preview, instance count and total fuel
- Tapping a challenge opens a detail page with full description, requirements, duration, creator and completion count
- Detail page has a clear start challenge call to action
- User can share a community challenge externally via a link
- Search from US-028 surfaces community challenges alongside user results
- Guest users can browse community challenges but cannot start one and are prompted to register

---

### US-035 — Abandon a Challenge
**As a registered user I want to abandon a challenge so that I can acknowledge it was not the right fit and move on to challenges I can commit to.**

Acceptance criteria:
- User can abandon an active ChallengeInstance from the challenge options menu
- User is shown a confirmation prompt before abandoning as the action cannot be undone
- Confirmation screen acknowledges the effort made by showing days completed, streak reached and fuel received
- On confirmation the challenge moves to a separate Abandoned section on the user's profile distinct from Completed and Active
- Abandoned challenges are visible on the profile but not highlighted
- Abandoned challenge proof posts retain their original privacy settings
- User can start a new instance of the same template after abandoning with no penalty
- Abandoning a group challenge notifies other participants
- If the user is the last active participant in a group challenge, the group challenge is marked as inactive
- Streak resets on abandon
- Abandoned challenges do not count toward the challenges completed stat
- User is shown suggested similar challenges on the abandon confirmation screen

---

## Groups

### US-010 — Create a Group
**As a registered user I want to create a group so that I can bring friends and other users together around shared challenges.**

Acceptance criteria:
- User can create a group from the Groups tab
- User must provide a group name
- User can optionally add a group description and profile photo
- User can set group privacy as invite only or open with request approval
- Creator is automatically assigned as group admin
- User can invite members during creation or after
- Group appears in the user's Groups tab on creation
- Group has a unique shareable link for inviting members
- Guest users cannot create groups

---

### US-011 — Invite Users to a Group
**As a registered user I want to invite others to my group so that we can complete challenges together.**

Acceptance criteria:
- Group admin and members with invite permissions can invite users
- Direct invites can only be sent to mutual follows
- User can search for and select users to invite by username
- Invited user receives a notification with group name, inviter name and accept or decline options
- Invite expires after 7 days if not responded to
- Inviter is notified when an invite is accepted or declined
- User can share a group invite link externally which bypasses the mutual follow requirement
- Anyone with a valid invite link can join or request to join depending on group privacy settings
- Link based joins still require registration
- Admin can disable the invite link at any time invalidating all previous links
- Admin can regenerate a new invite link
- Pending invitations are visible to the admin in the group management screen
- User cannot invite someone already in the group or with a pending invite

---

### US-012 — Challenge a Group
**As a registered user I want to challenge my group so that we can complete a challenge together.**

Acceptance criteria:
- User can start a challenge and assign it to a group they are a member of
- Any group member can post a challenge to the group, not just the admin
- Challenge appears in the group feed and all members are notified
- Each member can individually accept or decline the group challenge
- Members who accept create their own named ChallengeInstance linked to the group challenge
- Members can see each other's progress within the group feed
- Group challenge completion is celebrated in the group feed when a member finishes
- Challenge request expires after 7 days if no members accept
- Group challenges can be public or private with private keeping progress visible to group members only

---

### US-013 — Manage Group Member Permissions
**As a group admin I want to manage member permissions so that each member has the appropriate level of access.**

Acceptance criteria:
- Group has two roles: admin and member
- Creator is admin by default
- Admin can promote any member to admin
- Admin can demote other admins to member but the original creator cannot be demoted
- Admin can remove members from the group
- Admin can control whether members can invite others or only admins can invite
- Admin can transfer group ownership to another member
- Removed members lose access to the group feed immediately
- Members can leave a group at any time
- If the last admin leaves, the longest standing member is automatically promoted to admin
- All permission changes trigger a notification to the affected member

---

### US-015 — Mutual Follow Requirement for Group Invites
**As a registered user I want direct group invites to be limited to mutual follows so that I am not spammed by strangers.**

Acceptance criteria:
- Direct group invites can only be sent to mutual follows
- If a user attempts to invite a non-mutual, the option is greyed out with a tooltip explaining why
- Shareable group invite links bypass the mutual follow requirement
- Anyone with a valid invite link can request to join or join directly depending on group privacy settings
- Link based joins still require registration
- Admin can disable the invite link at any time invalidating all previous links
- Admin can regenerate a new invite link if the old one is compromised

---

## Social

### US-014 — Follow a User
**As a registered user I want to follow other users so that I can see their activity in my feed and interact with them.**

Acceptance criteria:
- User can follow any public account without approval
- User can request to follow a private account with the request requiring approval from the account owner
- Follow request appears in the recipient's notifications
- Recipient can accept or decline a follow request
- On accepting, the follower can see the user's posts and activity in their feed
- User can unfollow someone at any time without notifying the other party
- User can remove a follower from their own followers list
- Follower and following counts are visible on the user's profile
- User cannot follow themselves
- Guest users cannot follow and are prompted to register

---

### US-016 — Post a Progress Update
**As a registered user I want to post progress updates so that I can track my journey and share it with others.**

Acceptance criteria:
- User can submit a proof post against an active ChallengeInstance requirement
- User can attach a photo, video, journal entry or combination depending on the requirement's proof type
- If the requirement mandates media, the post cannot be submitted without it
- If the requirement mandates a journal entry, a text field is required before submission
- Checkbox requirements require only a confirmation tap with no proof attachment
- User can add an optional caption regardless of proof type
- User sets post privacy at time of submission as public, private or participants only
- Post is associated to the specific requirement and ChallengeInstance it belongs to
- Submitted proof marks that requirement as complete for that day or period
- One proof submission per requirement per day is permitted
- Multiple requirements completed on the same day are grouped into a single parent feed card
- Parent card shows the challenge name, user and day number
- Each requirement completion is a child container within the card with a dropdown arrow
- The most recently completed requirement is expanded by default with earlier ones collapsed
- Fuel and comments sit on the parent card only
- Post appears in followers home feed if set to public
- Guest users cannot post progress updates

---

### US-024 — Fuel a Post
**As a registered user I want to fuel others posts so that I can motivate them to keep going.**

Acceptance criteria:
- User can fuel any public proof post from the home feed, group feed or profile grid
- Fuel button sits on the parent feed card
- Tapping fuel increments the fuel count immediately as an optimistic UI update
- User can only fuel a post once
- Tapping fuel again removes the fuel and acts as a toggle
- Post owner receives a notification when their post is fuelled
- Fuel count is visible on the post unless the owner has hidden it
- User cannot fuel their own posts
- Guest users cannot fuel posts and are prompted to register

---

### US-025 — Hide Fuel Count
**As a registered user I want to hide the fuel count on my posts so that my progress is not judged by numbers.**

Acceptance criteria:
- User can toggle fuel visibility on individual posts from post settings
- User can set a global preference to hide fuel on all their posts by default
- When hidden, fuel count is not visible to anyone including the post owner
- Hiding fuel does not prevent others from fuelling the post
- User can unhide fuel count at any time
- Individual post setting overrides the global preference

---

### US-026 — Comment on a Post
**As a registered user I want to comment on others posts so that I can share encouragement and thoughts.**

Acceptance criteria:
- User can comment on any public proof post from the feed
- Comments sit on the parent card level
- Comment input is accessible by tapping a comment icon on the post
- Comments are displayed chronologically
- User can delete their own comments at any time
- Post owner can delete any comment on their post
- Post owner receives a notification when a new comment is posted
- Commenter receives a notification if the post owner or another user replies to their comment
- Comments support plain text only for MVP
- User cannot comment on their own posts for MVP
- Guest users cannot comment and are prompted to register

---

### US-029 — Edit Post Privacy
**As a registered user I want to edit the privacy of my posts after publishing so that I can control my audience at any time.**

Acceptance criteria:
- User can edit privacy on any of their own posts from the post options menu
- Privacy options are public, private and participants only
- Change takes effect immediately
- If changed to private, post is removed from followers feeds immediately
- If changed to public, post appears in followers feeds as a new item
- Privacy can be changed as many times as the user wants
- Bulk privacy update is available when completing a private challenge per US-030

---

### US-030 — Go Public on Challenge Completion
**As a registered user I want to choose to go public when I complete a private challenge so that people can appreciate my full journey without having judged my progress along the way.**

Acceptance criteria:
- When a user completes a private ChallengeInstance they are shown a celebration screen
- Screen prompts the user to share their journey publicly
- Three options are presented: share everything, choose what to share, keep private
- Share everything flips the ChallengeInstance and all associated proof posts to public in one action
- Choose what to share takes the user to a screen listing all proof posts with individual privacy toggles
- User can review and select which posts to make public before confirming
- Keep private dismisses the prompt and everything remains private
- Celebration screen shows total days completed, streak and total fuel received
- User can access this flow again later from the completed challenge screen if they dismissed it initially

---

## Feed

### US-022 — View Home Feed
**As a registered user I want to view my home feed so that I can see my own progress, others progress and my groups activity in one place.**

Acceptance criteria:
- Home feed displays a unified chronological stream of activity
- Feed includes proof posts from users the current user follows
- Feed includes proof posts from groups the user is a member of
- Feed includes the user's own active challenge summary at the top
- Same day multiple requirement completions are grouped into a single parent card per US-016
- Feed is paginated and loads more on scroll
- Feed shows a contextual empty state if user has no follows or group memberships with a prompt to find challenges or invite friends
- Guest users see a preview feed of public community activity with a prompt to register

---

### US-023 — View Group Feed
**As a registered user I want to view a group feed so that I can see how other members are progressing.**

Acceptance criteria:
- User can access a group feed by tapping the group from the Groups tab
- Group feed displays proof posts from all members scoped to that group's challenges
- Feed is chronological
- Only group members can view the group feed
- Non-members attempting to access a group feed are shown a join or request to join prompt
- Group feed shows an empty state if no members have posted yet
- Group name, member count and active challenges are shown at the top of the feed

---

## Notifications

### US-027 — Mark Notifications as Read
**As a registered user I want to mark notifications as read so that my notification badge stays accurate and I know what I have actioned.**

Acceptance criteria:
- Notification badge on the bell icon shows the count of unread notifications
- Tapping the bell icon opens the notifications feed and marks all visible notifications as read
- Badge clears after opening the notifications feed
- Individual notifications can be marked as read by tapping them
- User can mark all notifications as read in one tap from the notifications screen
- Read notifications remain in the feed but are visually distinguished from unread ones
- Notifications are not deleted when marked as read and persist in the feed

---

### US-032 — Manage Notification Preferences
**As a registered user I want to manage my notification preferences so that I only receive notifications relevant to me.**

Acceptance criteria:
- User can access notification preferences from account settings
- User can toggle individual notification types on or off
- Notification types include: fuel received, new comment, challenge request received, challenge accepted or declined, new follower, follow request, group invite, group challenge posted, requirement due reminder, streak milestone
- Push notifications and in-app notifications can be toggled independently per type
- Requirement due reminder can be set with a custom time
- Changes take effect immediately
- User can turn all notifications off in one toggle

---

## Search

### US-028 — Search for Users and Challenges
**As a registered user I want to search for users and community challenges so that I can find people to follow and challenges to join.**

Acceptance criteria:
- User can access search from a dedicated search screen
- Search returns results across both users and community challenge templates
- Results update as the user types with a minimum of 2 characters before search fires
- User results show profile photo, username and full name
- Challenge results show challenge name, category and instance count
- Tapping a user result navigates to their profile
- Tapping a challenge result navigates to the challenge detail page
- Search returns an empty state with suggestions if no results are found
- Guest users can search public users and challenges but cannot interact with results

---

## Settings

### US-031 — Manage Account Settings
**As a registered user I want to manage my account settings so that I can keep my preferences up to date.**

Acceptance criteria:
- Settings are accessible from the profile tab
- Settings covers account details, privacy, notifications, connected accounts and danger zone
- Account details links to the edit profile flow per US-020
- Privacy settings include account visibility, who can send challenge requests and who can invite to groups
- Connected accounts shows linked Google and Apple SSO status with option to connect or disconnect
- Danger zone contains log out and delete account options
- Settings changes save explicitly and are not auto saved
- User receives confirmation when settings are saved

---

## Post-MVP Backlog

The following features have been identified but are out of scope for the MVP:

- Direct messaging between users
- Organisation and creator accounts
- Community pages with moderation
- Freeform goal posting without set criteria
- Push notification infrastructure
- Leaderboards within group challenges
- Achievement badges and milestone rewards
- Onboarding flow for new users
- Content moderation and reporting tools
- Search optimisation and personalised discovery
- Media compression and file size enforcement
- Comments with mentions and media support

---

## Navigation Reference

**Bottom navigation tabs:**
- Home
- Challenges
- Groups
- Profile

**Top right icons (persistent):**
- Bell — notifications
- DM — direct messages (post-MVP)
- + — create challenge (visible on My Challenges tab only)

---

*Cora MVP — User Stories v1.0*
