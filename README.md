# DevPulse 🚼

> Internal Tech Issue & Feature Tracker

DevPulse is a collaborative platform designed for software teams to report bugs, suggest features, and coordinate resolutions efficiently.

## 🔗 Live Deployment & Repository
- **Live API URL:** https://dev-pulse-one-kappa.vercel.app/
- **GitHub Repository:** https://github.com/codexmish/DevPulse.git

---

## 🛠️ Tech Stack
- **Runtime:** Node.js (LTS)
- **Language:** TypeScript
- **Framework:** Express.js (Modular Router Architecture)
- **Database:** PostgreSQL (Native `pg` driver with Raw SQL queries)
- **Authentication:** JWT (JsonWebToken) & bcrypt (Password hashing)

---

## ✨ Features & User Roles
- **Authentication & Security:** Secure registration and login with encrypted passwords and JWT-protected endpoints.
- **Contributor Role:** Can register/login, create new issues (bug or feature requests), view all issues, and update their own reported issues.
- **Maintainer Role:** Inherits all contributor actions, plus the ability to update any field of any issue, delete any issue, and change workflow statuses independently.
- **Advanced Querying:** Supports server-side sorting (`newest`, `oldest`) and structural dynamic filtering (`type`, `status`) using clean JavaScript object restructuring.

---

## 🗄️ Database Schema Summary

### 1. `users` Table
- `id` (SERIAL, Primary Key)
- `name` (VARCHAR, Required)
- `email` (VARCHAR, Unique, Required)
- `password` (VARCHAR, Securely Hashed)
- `role` (VARCHAR, Default: 'contributor')
- `created_at` / `updated_at` (TIMESTAMPTZ)

### 2. `issues` Table
- `id` (SERIAL, Primary Key)
- `title` (VARCHAR(150), Required)
- `description` (TEXT, Min 20 characters)
- `type` (VARCHAR, 'bug' or 'feature_request')
- `status` (VARCHAR, Default: 'open', can be 'in_progress' or 'resolved')
- `reporter_id` (VARCHAR/INT, App-logic reference to users)
- `created_at` / `updated_at` (TIMESTAMPTZ)

---

## 🌐 API Endpoints

### Authentication Module
- `POST /api/auth/signup` - Register a new user account
- `POST /api/auth/login` - Authenticate user and receive token

### Issues Module
- `POST /api/issues` - Create a new issue *(Protected)*
- `GET /api/issues` - Get all issues with optional sort & filter *(Public)*
- `GET /api/issues/:id` - Get details of a single issue *(Public)*
- `PATCH /api/issues/:id` - Update issue details using safe `COALESCE` *(Protected)*
- `DELETE /api/issues/:id` - Delete an issue *(Protected)*

---

## 🚀 Setup Steps (Local Installation)

1. Clone the repository:
   ```bash
   git clone https://github.com/codexmish/DevPulse.git
   cd devpulse