# Pathfinder AI Frontend

Pathfinder AI Frontend is the web client for an AI-assisted career guidance platform. It is a React and TypeScript single-page app that talks to the [Pathfinder](https://github.com/Zeeshan363/pathfinder) Django REST API. Users sign up, build a profile of their skills and interests, get career path recommendations and skill gap analysis, browse and get recommended jobs, chat with a career guidance bot, and send feedback. Admins get a separate panel to manage users, scrape jobs and review feedback.

## Features

- **Authentication**: sign up with a role (`STUDENT`, `PROFESSIONAL` or `COUNSELOR`) and sign in with a JWT. After sign-in, admins go to `/admin`, users with a complete profile go to `/dashboard`, and everyone else goes to `/profile/create`.
- **Profiles**: create and edit a profile with an about section, photo URL, technical and soft skills, languages, interests, career goals, education and work experience.
- **Dashboard**: shows the user's profile, career paths recommended from it, and AI job recommendations.
- **Career AI**: get career recommendations from a list of skills and interests, browse all career paths, and run a skill gap analysis for a chosen career.
- **Career chatbot**: a floating chat widget on every page. Anyone can use it; signed-in users get answers based on their profile.
- **Jobs**: browse scraped job listings with search and filters for location, job type, source and skill, and see ML-based job recommendations with matching and missing skills.
- **Feedback**: users submit feedback and see the status of what they have sent.
- **Admin panel**: list all users, scrape LinkedIn jobs by keywords and location, view scraped jobs, and set feedback status to `PENDING`, `REVIEWED` or `RESOLVED`.
- **Dark mode**: a theme toggle that is remembered across visits.

## Tech stack

- React 18 and TypeScript, bootstrapped with Create React App (`react-scripts` 5)
- React Router 7 for routing
- TanStack React Query 5 for server state
- Axios for HTTP requests
- Tailwind CSS 3 (with PostCSS and Autoprefixer), using class-based dark mode
- `react-hot-toast` for notifications and `lucide-react` for icons
- Jest and React Testing Library for tests

## Project structure

```
pathfinder-ai-frontend/
├── package.json
├── tailwind.config.js         # Theme colours, animations, dark mode
├── postcss.config.js
├── tsconfig.json
├── public/                    # index.html, favicon, manifest
└── src/
    ├── index.tsx              # App entry point
    ├── App.tsx                # Routes, ProtectedRoute and AdminRoute guards, global ChatBot
    ├── api/auth/              # signin and signup API calls
    ├── services/
    │   ├── api.ts             # Axios instance: base URL, JWT header, 401 handling
    │   ├── profileService.ts
    │   ├── chatbotService.ts  # Chatbot, career recommendations, skill gap, careers
    │   ├── jobService.ts
    │   └── feedbackService.ts
    ├── pages/                 # Dashboard, CreateProfile, EditProfile, CareerAI,
    │                          # JobRecommendations, Feedback, AdminDashboard
    ├── components/
    │   ├── LandingPage, SigninPage, SignupPage, Navbar, Footer, ThemeToggle
    │   ├── ChatBot/           # Floating career chatbot widget
    │   ├── Dashboard/         # Profile section, career recommendations, AI job recommendations
    │   ├── Feedback/          # Feedback form and the user's feedback list
    │   └── admin/             # Header, sidebar, users, scrape jobs, scraped jobs, feedback tables
    ├── hooks/useTheme.ts      # Dark mode toggle
    ├── lib/queryClient.ts     # React Query defaults
    ├── types/user.ts          # User, role and auth types
    └── styles/
```

## Getting started

### 1. Prerequisites

- Node.js 18 or newer and npm
- The [Pathfinder backend](https://github.com/Zeeshan363/pathfinder) running at `http://localhost:8000`. See its README for setup.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
REACT_APP_LOCAL_BACKEND=http://localhost:8000/api
```

Most requests use the base URL set in `src/services/api.ts` (`http://localhost:8000/api`). The admin users, scrape jobs and scraped jobs sections read `REACT_APP_LOCAL_BACKEND` instead, so set it or those sections will fail. Restart `npm start` after changing `.env`.

### 4. Run the app

```bash
npm start
```

The app is served at `http://localhost:3000`. The backend allows CORS from this origin, so keep the default port.

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Run the development server with hot reload at `http://localhost:3000` |
| `npm test` | Run the tests in watch mode |
| `npm run build` | Build an optimised production bundle into `build/` |
| `npm run eject` | Copy the Create React App config into the project. This cannot be undone. |

## Authentication

Signing in calls `POST /auth/login/` and stores the access token in `localStorage` under `token`. The Axios instance in `src/services/api.ts` adds it to every request:

```
Authorization: Bearer <access_token>
```

If the backend returns `401`, the token is removed and the user is sent to `/signin`. The chatbot endpoint is the exception, so signed-out users can keep chatting.

When an admin signs in, their name is also stored under `adminName`, which the admin routes check. To make a user an admin, set their `role` to `ADMIN` in the backend (for example from the Django admin at `http://localhost:8000/admin/`).

Access tokens last 1 day. There is no automatic refresh, so users sign in again when the token expires.

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/signup` | Sign up | Public |
| `/signin` | Sign in | Public |
| `/feedback` | Submit feedback and view your feedback | Public route, needs sign-in to submit |
| `/dashboard` | Profile, career recommendations and AI job recommendations | Signed in |
| `/profile/create` | Create a profile, education and experience | Signed in |
| `/profile/edit` | Edit the profile | Signed in |
| `/career-ai` | Career recommendations, career list and skill gap analysis | Signed in |
| `/jobs/recommendations` | Browse and filter job listings | Signed in |
| `/student/profile` | Student profile | Signed in |
| `/admin` | Admin panel: users, scrape jobs, scraped jobs, feedback | Admin |
| `/admin/feedback` | Opens the admin panel on the feedback section | Admin |

The career chatbot is shown on every page.

## Backend endpoints used

All paths are relative to `http://localhost:8000/api/`. See the [backend README](https://github.com/Zeeshan363/pathfinder#readme) for request and response details.

### Auth

| Method | Endpoint | Used by |
|---|---|---|
| POST | `auth/register/` | Sign up page |
| POST | `auth/login/` | Sign in page |
| GET | `auth/getAllUsers/` | Admin users table |

### Profile

| Method | Endpoint | Used by |
|---|---|---|
| POST | `profile/createProfile/` | Create profile page |
| GET | `profile/getProfileByJWT/` | Dashboard, edit profile page |
| PUT | `profile/updateProfile/` | Edit profile page |
| POST | `profile/addEducationToProfile/` | Create and edit profile pages |
| DELETE | `profile/deleteEducationFromProfile/<id>/` | Edit profile page |
| POST | `profile/addExperienceToProfile/` | Create and edit profile pages |
| DELETE | `profile/deleteExperienceFromProfile/<id>/` | Edit profile page |

### Recommendations and career guidance

| Method | Endpoint | Used by |
|---|---|---|
| GET | `recommendation/getCareerPaths/` | Dashboard |
| POST | `career/recommend/` | Career AI page |
| POST | `career/skill_gap/` | Career AI page |
| GET | `career/careers/` | Career AI page |
| POST | `career/chatbot/` | Chatbot widget |

### Jobs

| Method | Endpoint | Used by |
|---|---|---|
| GET | `jobs/` | Job listings page, admin scraped jobs table |
| POST | `jobs/recommend/` | Dashboard AI job recommendations |
| POST | `jobs/scrape/` | Admin scrape jobs section |

### Feedback

| Method | Endpoint | Used by |
|---|---|---|
| POST | `feedback/create/` | Feedback form |
| GET | `feedback/user/` | The user's feedback list |
| GET | `feedback/` | Admin feedback table |
| PUT | `feedback/update/<id>/` | Admin feedback table |

`src/services/` also has helpers for `jobs/<id>/`, `jobs/relevant/` and `career/train_chatbot/` that no page uses yet.

## Running the full project

1. Start PostgreSQL and the backend:

   ```bash
   cd ../pathfinder
   source venv/bin/activate
   python manage.py runserver
   ```

2. Optionally scrape some jobs so the job pages have data, either from the admin panel or with:

   ```bash
   python manage.py scrape_jobs --keywords "python developer" --location "Lahore" --limit 25
   ```

3. Start the frontend:

   ```bash
   cd ../pathfinder-ai-frontend
   npm start
   ```

4. Open `http://localhost:3000`, sign up, sign in and create your profile.
