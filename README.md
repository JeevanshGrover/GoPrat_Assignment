# GoPratle — Dynamic Event Requirement Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express-5.3.0-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209.11-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

> Full-stack, configuration-driven event requirement platform for posting structured briefs for **Event Planners**, **Performers**, and **Crew**.

---

## Deployments & Links

- **Frontend (Vercel):** [https://go-prat.vercel.app](https://go-prat.vercel.app)
- **Backend API (Render):** [https://goprat-assignment.onrender.com](https://goprat-assignment.onrender.com)
- **API Health Check:** [https://goprat-assignment.onrender.com/api/health](https://goprat-assignment.onrender.com/api/health)
- **GitHub Repository:** [JeevanshGrover/GoPrat_Assignment](https://github.com/JeevanshGrover/GoPrat_Assignment)

---

## Table of Contents

- [Overview & Architecture](#overview--architecture)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quickstart & Setup](#quickstart--setup)
- [Environment Variables](#environment-variables)
- [User Flow](#user-flow)
- [API Reference](#api-reference)
- [Database & Schema Design](#database--schema-design)
- [Available Scripts](#available-scripts)
- [Deployment & Troubleshooting](#deployment--troubleshooting)
- [Security & License](#security--license)

---

## Overview & Architecture

Organizers booking event talent often face unstructured briefs missing critical operational details. **GoPratle** solves this with a configuration-driven web app:
- **Frontend (Next.js 16 + React 19):** A 4-step wizard dynamically generated from `categoryConfig.js` using `react-hook-form` and React Context for persistent state.
- **Backend (Express 5 + Mongoose 9):** REST API storing submissions in a single MongoDB collection via polymorphic Mongoose Discriminators with rigorous field validations.

---

## Key Features

- **Config-Driven Dynamic Forms:** All category fields, options, and validations are managed in `frontend/config/categoryConfig.js`.
- **4-Step Guided Wizard:**
  1. *Event Basics:* Name, event type, single/range date toggle, city, venue, category selector.
  2. *Scale & Profile:* Adapts by category (Guests/Budget for Planners; Type/Genre/Artists for Performers; Roles/Count for Crew).
  3. *Scope & Rider:* Services & notes (Planner); duration & equipment rider (Performer); working days & shift hours (Crew).
  4. *Review & Submit:* Summary card with inline edit links to any prior step.
  5. *Confirmation:* MongoDB Document ID with one-click clipboard copy.
- **Cross-Field Validations:** Enforces End Date $\ge$ Start Date $\ge$ Today, Max Budget $\ge$ Min Budget, shift hours (1–24), minimum 15-minute set duration, and note character limits.
- **Polymorphic MongoDB Discriminators:** Inherits a shared base schema while strictly isolating category details.
- **Real-Time Health Status:** Header badge pings `/api/health` with timeout fallback (`API Connected` / `Offline`).
- **Category Switch Safety:** Clears stale details and alerts users if category is changed mid-flow.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16.4.2 (App Router, Turbopack), React 19.3, Tailwind CSS v4, React Hook Form 7.90, Lucide Icons, Geist Font |
| **Backend** | Node.js (ESM), Express 5.3.0, Mongoose 9.11.2, CORS, Dotenv, Nodemon |
| **Database** | MongoDB (Atlas / Local) |
| **Hosting** | Vercel (Frontend) + Render (Backend API) |

---

## Project Structure

```text
GoPartle/
├── Backend/
│   ├── src/
│   │   ├── controller/      # requirements.controller.js (create, list, getById)
│   │   ├── db/              # db.js (Mongoose connection)
│   │   ├── middleware/      # errorHandler.js (ApiError, ValidationError, CastError)
│   │   ├── models/          # requirement.model.js (Base + Planner/Performer/Crew)
│   │   ├── routes/          # requirement.route.js (/api/v1/requirements)
│   │   ├── utils/           # ApiError.js, ApiResponse.js, asyncHandler.js
│   │   ├── app.js           # Express app setup, CORS & JSON body parsers
│   │   └── index.js         # Entry point & DB connection
│   ├── .env                 # Backend config (gitignored)
│   └── package.json
│
├── frontend/
│   ├── app/                 # App Router (globals.css, layout.js, page.js, post-requirement/page.js)
│   ├── components/
│   │   ├── ui/              # Alert, Button, CategoryCard, Input, MultiSelect, Select
│   │   └── wizard/          # Stepper, StepBasics, DynamicStep, StepReview, SuccessScreen
│   ├── config/              # categoryConfig.js (field definitions & validation rules)
│   ├── context/             # WizardContext.js (reducer & step management)
│   ├── lib/                 # api.js (fetch client & health check)
│   ├── .env                 # Frontend config (gitignored)
│   ├── next.config.mjs      # Turbopack & CSS loaders
│   └── package.json
└── README.md
```

---

## Quickstart & Setup

### Prerequisites
- **Node.js:** `>= 18.18.0` (v20+ LTS recommended)
- **MongoDB:** Active Atlas connection string or local MongoDB instance

### 1. Backend Setup
```bash
cd Backend
npm install
```
Create `Backend/.env`:
```env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gopratle?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```
Start the server:
```bash
npm run dev   # Starts with nodemon at http://localhost:8080
```

### 2. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
```
Create `frontend/.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```
Start the application:
```bash
npm run dev   # Runs on http://localhost:3000
```

---

## Environment Variables

### Backend (`Backend/.env`)
| Variable | Required | Description |
| :--- | :---: | :--- |
| `PORT` | Yes | Port for Express server (e.g. `8080`) |
| `MONGODB_URI` | Yes | MongoDB connection URI |
| `NODE_ENV` | No | `development` or `production` |
| `CORS_ORIGIN` | No | Whitelisted frontend origins (comma-separated) |

### Frontend (`frontend/.env`)
| Variable | Required | Description |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL (`http://localhost:8080` locally) |

---

## User Flow

```text
┌────────────────────────┐
│    Landing Page (/)    │ ──► [ Click "Post Requirement" ]
└───────────┬────────────┘
            ▼
┌────────────────────────┐
│  Step 1: Event Basics  │ ◄───┐ Name, Type, Single/Range Date, City, Venue & Category
└───────────┬────────────┘     │
            ▼                  │
┌────────────────────────┐     │
│ Step 2: Category Data  │ ◄───┤ Planner (Guests, Budget) | Performer (Type, Count) | Crew (Roles, Count)
└───────────┬────────────┘     │
            ▼                  │ Direct Inline "Edit" Jump from Step 4
┌────────────────────────┐     │
│ Step 3: Scope & Rider  │ ◄───┤ Planner (Services, Notes) | Performer (Duration, Gear) | Crew (Days, Shifts)
└───────────┬────────────┘     │
            ▼                  │
┌────────────────────────┐     │
│ Step 4: Review & Submit│ ────┘ Full summary with validation review
└───────────┬────────────┘
            ▼ [ Submit ]
┌────────────────────────┐
│  Backend API & MongoDB │ ──► Mongoose Discriminator Validation & Save
└───────────┬────────────┘
            ▼ [ HTTP 201 ]
┌────────────────────────┐
│ Step 5: Confirmation   │ ──► One-Click Clipboard Copy ID & Post Another option
└────────────────────────┘
```

---

## API Reference

Base URL: `/api/v1/requirements`

### Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health status (`{ "healthy": true }`) |
| `POST` | `/api/v1/requirements` | Create requirement with category discriminator |
| `GET` | `/api/v1/requirements` | List requirements (supports `?category=planner\|performer\|crew`) |
| `GET` | `/api/v1/requirements/:id` | Fetch single requirement by MongoDB ObjectId |

### Create Requirement Payloads

<details>
<summary><b>1. Event Planner Payload</b></summary>

```json
{
  "category": "planner",
  "event": {
    "name": "Annual Tech Symposium 2026",
    "type": "Corporate",
    "dateMode": "single",
    "startDate": "2026-11-20",
    "location": "Bengaluru",
    "venue": "Grand Hyatt Ballroom"
  },
  "details": {
    "expectedGuests": 350,
    "budgetMin": 150000,
    "budgetMax": 400000,
    "services": ["Full planning", "Decor", "On-day coordination"],
    "notes": "Keynote stage setup required."
  }
}
```
</details>

<details>
<summary><b>2. Performer / Artist Payload</b></summary>

```json
{
  "category": "performer",
  "event": {
    "name": "Sunburst Music Festival",
    "type": "Festival",
    "dateMode": "range",
    "startDate": "2026-12-15",
    "endDate": "2026-12-17",
    "location": "Goa",
    "venue": "Vagator Arena"
  },
  "details": {
    "performerType": "Band",
    "genre": "Indie Rock",
    "numberOfPerformers": 5,
    "durationMinutes": 90,
    "equipmentRequired": ["Microphone", "Speakers", "Lighting"],
    "notes": "Drum kit and 4 DI boxes required."
  }
}
```
</details>

<details>
<summary><b>3. Crew & Staff Payload</b></summary>

```json
{
  "category": "crew",
  "event": {
    "name": "National Automobile Expo",
    "type": "Exhibition",
    "dateMode": "range",
    "startDate": "2026-11-01",
    "endDate": "2026-11-04",
    "location": "New Delhi",
    "venue": "Pragati Maidan"
  },
  "details": {
    "roles": ["Sound", "Lighting", "Security"],
    "crewCount": 14,
    "numberOfDays": 4,
    "shiftHours": 9,
    "notes": "Report to Gate 4 at 07:30 AM."
  }
}
```
</details>

#### Response Formats
- **Success (`201 Created`):**
  ```json
  {
    "statusCode": 201,
    "data": { "_id": "67140f82b7814b7e1927c3e1", "category": "planner", "status": "submitted" },
    "message": "Requirement created successfully",
    "success": true
  }
  ```
- **Validation Failure (`400 Bad Request`):**
  ```json
  {
    "success": false,
    "message": "Max budget cannot be less than min budget",
    "errors": [],
    "data": null
  }
  ```

---

## Database & Schema Design

Submissions reside in a single `requirements` collection with `category` as the discriminator key, indexed on `{ category: 1, createdAt: -1 }`.

```text
                       ┌─────────────────────────────────────┐
                       │          Base Requirement           │
                       ├─────────────────────────────────────┤
                       │  _id: ObjectId                      │
                       │  category: "planner"|"performer"|"crew"
                       │  status: "submitted"                │
                       │  event: { name, type, dateMode,     │
                       │          startDate, endDate,        │
                       │          location, venue }          │
                       │  timestamps: (createdAt, updatedAt) │
                       └──────────────────┬──────────────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            │ discriminator: "planner"    │ discriminator: "performer"  │ discriminator: "crew"
            ▼                             ▼                             ▼
┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐
│          Planner          │ │         Performer         │ │           Crew            │
├───────────────────────────┤ ├───────────────────────────┤ ├───────────────────────────┤
│ details: {                │ │ details: {                │ │ details: {                │
│   expectedGuests: Number  │ │   performerType: String   │ │   roles: [String]         │
│   budgetMin: Number       │ │   genre: String           │ │   crewCount: Number       │
│   budgetMax: Number       │ │   numberOfPerformers: Num │ │   numberOfDays: Number    │
│   services: [String]      │ │   durationMinutes: Number │ │   shiftHours: Number (1-24)
│   notes: String (max 500) │ │   equipmentRequired: []   │ │   notes: String (max 500) │
│ }                         │ │   notes: String (max 500) │ │ }                         │
└───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘
```

---

## Available Scripts

| Location | Command | Purpose |
| :--- | :--- | :--- |
| **Backend** | `npm run dev` | Run development server with `nodemon` |
| **Backend** | `npm start` | Run production server (`node src/index.js`) |
| **Frontend** | `npm run dev` | Start Next.js dev server on port 3000 |
| **Frontend** | `npm run build` | Build production Next.js bundle |
| **Frontend** | `npm start` | Start Next.js production server |
| **Frontend** | `npm run lint` | Run ESLint static code analysis |

---

## Deployment & Troubleshooting

### Deployment
- **Backend (Render / Railway):** Set root to `Backend/`, build command `npm install`, start command `npm start`. Configure `MONGODB_URI`, `PORT`, and `CORS_ORIGIN`.
- **Frontend (Vercel):** Set root to `frontend/`, framework `Next.js`. Set `NEXT_PUBLIC_API_URL` to the production backend URL.

### Troubleshooting
- **"API Offline" Indicator:** Ensure the backend is running and `NEXT_PUBLIC_API_URL` in `frontend/.env` points to the correct backend host/port.
- **MongoDB Connection Error:** Ensure your IP address is whitelisted in MongoDB Atlas Network Access (`0.0.0.0/0` for dev).
- **CORS Blocked:** Add your frontend origin (e.g. `http://localhost:3000`) to `CORS_ORIGIN` in `Backend/.env`.
- **Budget / Date Errors:** Ensure End Date $\ge$ Start Date $\ge$ Today, and Maximum Budget $\ge$ Minimum Budget.

---

## Security & License

- **Security:** Secrets are managed via `.env` files and excluded via `.gitignore`. Requests are parsed with a 16KB size limit to protect against payload flooding.
- **License:** Backend is licensed under the **[ISC License](https://opensource.org/licenses/ISC)**.
- **Author:** Jeevansh Grover ([groverjeevansh0243@gmail.com](mailto:groverjeevansh0243@gmail.com)) • [GitHub](https://github.com/JeevanshGrover)
