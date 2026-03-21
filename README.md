# FitSync Frontend

A production-ready social fitness tracking web application. Built with Next.js 16, Tailwind CSS and Socket.io for real-time updates.

## Live App
```
https://fitsync-frontend-bwzfhjfbx-methmals-projects.vercel.app
```

## Demo Accounts
```
Athlete:  athlete@demo.com  /  demo123
Coach:    coach@demo.com    /  demo123
```

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS v3
- **HTTP Client** — Axios with interceptors
- **Real-time** — Socket.io Client
- **Charts** — Recharts
- **Font** — Geist
- **Deployment** — Vercel

## Features

- JWT authentication with automatic token refresh
- Role-based UI — separate dashboards for athletes and coaches
- Workout logging with dynamic exercise builder
- Search and filter workouts by muscle group, difficulty and duration
- Coach workout plan creation and management
- Real-time activity feed powered by Socket.io
- Progress charts — weekly volume bar chart and progress line chart
- Follow / unfollow other athletes and coaches
- User search with role filter
- Profile pages with avatar upload
- Fully mobile responsive

## Pages
```
/                          — Landing page
/auth/login                — Login
/auth/register             — Register (2-step flow)
/main/dashboard            — Dashboard (role-aware)
/main/workouts             — Workouts list + search
/main/workouts/create      — Create workout
/main/workouts/[id]        — Workout detail + edit
/main/plans                — Plans list + search
/main/plans/create         — Create plan (coach only)
/main/plans/[id]           — Plan detail + edit
/main/profile/[id]         — User profile
/main/search               — Find people
```

## Local Setup

### Prerequisites
- Node.js 18+
- FitSync backend running on port 5000

### Installation
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/fitsync-frontend.git
cd fitsync-frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Fill in your environment variables

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api
NEXT_PUBLIC_SOCKET_URL=https://your-backend.up.railway.app
```

## Project Structure
```
fitsync-frontend/
└── src/
    ├── app/
    │   ├── page.js              — Landing page
    │   ├── layout.js            — Root layout
    │   ├── globals.css          — Global styles
    │   ├── auth/
    │   │   ├── login/page.js
    │   │   └── register/page.js
    │   └── main/
    │       ├── layout.js        — Protected layout
    │       ├── dashboard/
    │       ├── workouts/
    │       ├── plans/
    │       ├── profile/
    │       └── search/
    ├── components/
    │   ├── ui/                  — Button, Input, Avatar, Badge
    │   ├── layout/              — Navbar, Sidebar
    │   ├── workout/             — WorkoutCard, WorkoutForm, Filters
    │   ├── plan/                — PlanCard, PlanForm
    │   ├── dashboard/           — ActivityFeed, StatsChart
    │   └── profile/             — ProfileHeader, FollowList
    ├── context/
    │   ├── AuthContext.js       — Global auth state
    │   └── SocketContext.js     — Socket.io connection
    ├── hooks/
    │   ├── useAuth.js
    │   └── useSocket.js
    └── lib/
        ├── api.js               — Axios instance + interceptors
        └── utils.js             — Helper functions
```

## Screenshots

### Landing Page
A modern landing page with hero section, feature cards, role selector and CTA.

### Dashboard
Role-aware dashboard showing stats, activity feed and progress charts.

### Workouts
Full CRUD with search, filters, image uploads and exercise tracking.

### Plans
Coach-created plans with workout collections and subscriber management.

## Deployment

Deployed on Vercel with automatic deploys on every push to main.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

## Backend Repository

Dasun Methmal