# Zarshan — Social Media Management SaaS

A complete, production-quality frontend for **Zarshan**, a social media management SaaS platform. Built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui — includes the full public marketing site, authentication flow, and a frontend-only dashboard preview.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix primitives)
- **Animation:** Framer Motion
- **Icons:** Lucide React + custom brand icon set
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Notifications:** Sonner (toasts)
- **Theming:** next-themes (dark mode default, light mode toggle)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Pages

### Public / Marketing

| Page | Route |
| --- | --- |
| Home | `/` |
| Features | `/features` |
| Pricing | `/pricing` |
| Integrations | `/integrations` |
| AI Features | `/ai-features` |
| Solutions | `/solutions` |
| About | `/about` |
| Contact | `/contact` |
| Blog (listing) | `/blog` |
| Blog (details) | `/blog/[slug]` |
| FAQ | `/faq` |
| Help Center | `/help`, `/help/[slug]` |

### Authentication

| Page | Route |
| --- | --- |
| Login | `/login` |
| Register | `/register` |
| Forgot Password | `/forgot-password` |
| Reset Password | `/reset-password` |
| Verify Email | `/verify-email` |

### Dashboard (frontend-only UI)

| Page | Route |
| --- | --- |
| Overview | `/dashboard` |
| Create Post | `/dashboard/create-post` |
| Calendar | `/dashboard/calendar` |
| Analytics | `/dashboard/analytics` |
| Settings | `/dashboard/settings` |

## Folder Structure

```text
app/                  Route segments (App Router), grouped into (marketing), (auth), (dashboard)
components/           Shared, reusable UI components (incl. shadcn/ui in components/ui)
sections/             Page-specific composed sections (hero, pricing table, testimonials, etc.)
data/                 Static mock data (nav, pricing, blog, testimonials, dashboard, etc.)
hooks/                Custom React hooks
lib/                  Utilities (cn helper, formatting)
types/                Shared TypeScript types
constants/            Site-wide constants (name, links, contact info)
public/               Static assets
```

## Notes

- This is a **frontend-only** project — all data is mocked in `data/` and forms simulate network requests with `setTimeout`. No backend or database is connected.
- Dark mode is enabled by default; toggle via the sun/moon icon in the header.
- Brand logos (Facebook, Instagram, LinkedIn, X, TikTok, Pinterest, YouTube, Slack, Google, GitHub) are implemented as custom inline SVGs in `components/brand-icons.tsx`, since recent versions of `lucide-react` no longer ship trademarked brand icons.
