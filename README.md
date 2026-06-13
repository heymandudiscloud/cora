# Cora

**Challenge. Prove. Fuel.**

Cora is a social accountability and challenge tracking app. Users create or discover challenges, submit proof of their progress, and fuel each other's motivation along the way.

---

## What Is Cora

Cora fills a gap that Strava, Instagram and general fitness apps all miss — a dedicated platform for custom challenges with structured proof, social accountability and a community built around effort rather than content.

Users can:
- Create custom challenges with specific requirements and proof types
- Join community challenges and run their own named instance
- Submit daily proof — photos, videos, journal entries or checkboxes
- Fuel each other's posts to show support
- Challenge friends directly and track progress together
- Run challenges privately and choose to share the journey on completion

The core social currency is **Fuel** — Cora's equivalent of Kudos or Likes, designed around effort and accountability rather than vanity metrics.

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

---

## Project Structure

```
cora/
├── mobile/          # Expo React Native app
├── backend/         # Node.js Express API
└── docs/            # Project documentation
    ├── VISION.md
    ├── BUSINESS_PROBLEM.md
    ├── PERSONAS.md
    ├── MVP_SCOPE.md
    ├── SUCCESS_METRICS.md
    ├── USER_STORIES.md
    ├── schema.sql
    └── api_spec.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Expo CLI
- AWS account (for deployment — local development uses a local PostgreSQL instance)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your local PostgreSQL credentials and other environment variables
npm run dev
```

### Database Setup

```bash
# Create the database
createdb cora

# Run the schema
psql -d cora -f docs/schema.sql
```

### Mobile Setup

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with the Expo Go app on your phone to run the app on your device.

---

## Documentation

| Document | Description |
|---|---|
| [VISION.md](docs/VISION.md) | Product vision and long term goals |
| [BUSINESS_PROBLEM.md](docs/BUSINESS_PROBLEM.md) | The problem Cora solves and market opportunity |
| [PERSONAS.md](docs/PERSONAS.md) | Core user personas |
| [MVP_SCOPE.md](docs/MVP_SCOPE.md) | Full MVP feature set and build order |
| [SUCCESS_METRICS.md](docs/SUCCESS_METRICS.md) | How success is measured |
| [USER_STORIES.md](docs/USER_STORIES.md) | All user stories with acceptance criteria |
| [schema.sql](docs/schema.sql) | PostgreSQL database schema |
| [api_spec.md](docs/api_spec.md) | Full REST API specification |

---

## Status

Currently in active development. MVP target is a functional end to end build covering auth, challenges, proof submissions, the social feed, fuel, groups and notifications.

---

## Author

Built by Wil Cossetto - IT graduate, aspiring cloud architect, and the guy whose friends built a Strava API scraper and Excel dashboard just to track a running competition. There had to be a better way.
