# 🏐 Challengers Volleyball Academy

<div align="center">

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**The official digital platform for Challengers Volleyball Academy — Premier youth & elite volleyball development in the San Francisco Bay Area.**

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment-to-vercel) • [Project Structure](#-project-structure)

</div>

---

## 📖 About The Platform

**Challengers Volleyball Academy** is a modern, high-performance web application designed for athletes, parents, and coaches. Led by **FIVB Level 2 Certified Coach Wilson Mathew**, the academy empowers youth athletes through technical mastery, biomechanical tracking, and competitive excellence.

The website delivers a cutting-edge digital experience featuring:
- **Biomechanical Performance Tracking**: Radar charts, skill growth metrics, and PDF summary exports.
- **Interactive Coaching Showcase**: Pinned-scroll coach spotlights featuring Olympic & NCAA-level coaching credentials.
- **Dynamic Program Registration**: Streamlined 5-step registration with program selection, custom player profile, and integrated checkout.
- **Visual Archives**: Responsive horizontal photo & video gallery with interactive lightbox.
- **Comprehensive Admin Dashboard**: Lead management, analytics, and content customization.

---

## ✨ Key Features

### 1. ⚡ Dynamic Hero & Video Reel
- Full-screen high-energy hero section with responsive gradient shielding.
- Custom video carousel featuring real live training sessions (`coaching 1.mp4` & `coaching 2.mp4`) with smooth slide navigation.

### 2. 📊 High-Performance Analytics Dashboard (`/performance`)
- **Biomechanical Radar Charts**: Compare individual player metrics against age-bracket peer benchmarks (`U-10`, `U-14`, `U-18`).
- **Interactive Growth Charts**: 6-month historical tracking for vertical jump velocity, skill precision, and agility.
- **Coach's Corner**: Custom feedback and drill notes with local persistence.
- **PDF Report Generation**: Instant export of high-resolution athlete performance summary cards via `jsPDF` and `modern-screenshot`.

### 3. 👥 About & Coach Showcase (`/about`)
- **Our Story & Visual Bento Grid**: Academy history with custom shape tiles showcasing academy highlights.
- **Pinned Full-Screen Coach Showcase**: Pinned scroll experience spotlighting the coaching team:
  - **Wilson Mathew** — Founder & Head Coach (FIVB Level 1 & 2)
  - **Sarah Jenkins** — Defense & Libero Specialist (Stanford NCAA D1)
  - **Michael Chen** — Setting & Offense Coordinator (FIVB Level 1)
  - **Elena Rodriguez** — Youth Development Coach (NFHS Certified)

### 4. 🖼️ Visual Archives Gallery (`/gallery`)
- Compact single-row horizontal slider with left/right navigation and mouse-wheel horizontal scroll support.
- Interactive high-definition fullscreen lightbox with cycling controls.

### 5. 📝 Streamlined Registration Flow (`/register`)
- Clean 5-step onboarding:
  1. Program Selection
  2. Location & Schedule
  3. Parent & Student Profile (Simplified 2-column form)
  4. Waiver & Terms Confirmation
  5. Secure Checkout Integration



## 🛠️ Tech Stack

### Frontend Core
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)

### Styling & Animations
- **CSS Framework**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion & Interactions**: [Motion](https://motion.dev/) (Framer Motion)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/) + [GSAP ScrollTrigger](https://greensock.com/)
- **Iconography**: [Lucide React](https://lucide.dev/)

### Data Visualization & Tools
- **Charts**: [Recharts](https://recharts.org/) (Radar, Area, Bar, Line Charts)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) + [modern-screenshot](https://github.com/qq15725/modern-screenshot)
- **3D Graphics**: [Three.js](https://threejs.org/)

### Backend & Server
- **Server**: [Express.js](https://expressjs.com/) + [tsx](https://github.com/privatenumber/tsx)
- **Payments**: Stripe Integration

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/challengers-volleyball-academy.git
   cd challengers-volleyball-academy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory (refer to `.env.example` if available):
   ```env
   PORT=3000
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment to Vercel

The project is pre-configured for **instant, zero-config deployment on Vercel**:

1. Push your code to your GitHub / GitLab repository.
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. **Build Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
4. **SPA Routing**: Pre-configured via [`vercel.json`](vercel.json) to rewrite all routes to `/index.html`, eliminating 404 errors on page reloads.
5. Click **Deploy**!

---

## 📂 Project Structure

```text
challengers-volleyball-academy/
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Centralized image & video assets
│   │   ├── images/             # Academy photos & training graphics
│   │   ├── video/              # Real coaching video footage (.mp4)
│   │   └── images.ts           # Central image configuration index
│   ├── components/             # Reusable UI & section components
│   │   ├── ModernHero.tsx      # Main hero section with video carousel
│   │   ├── CoachesSection.tsx  # Pinned scroll coaching showcase
│   │   ├── PerformanceDashboard.tsx # Interactive analytics & radar chart
│   │   ├── Navigation.tsx      # Global responsive navbar
│   │   ├── Footer.tsx          # Site footer & contact info
│   │   └── ...
│   ├── hooks/                  # Custom React hooks (e.g. useGsapReveal)
│   ├── About.tsx               # About us & story page
│   ├── App.tsx                 # Root router & layout configuration
│   ├── Camps.tsx               # Seasonal camps & training clinics
│   ├── Contact.tsx             # Contact & inquiry form
│   ├── Gallery.tsx             # Horizontal scroll photo & video gallery
│   ├── Home.tsx                # Academy homepage
│   ├── Locations.tsx           # Training facility locations & maps
│   ├── Performance.tsx         # Performance & biomechanics page
│   ├── PerformanceContext.tsx  # Global performance state & persistence
│   ├── Pricing.tsx             # Membership & program pricing
│   ├── Programs.tsx            # Full program catalog
│   ├── Register.tsx            # 5-step registration & enrollment
│   ├── data.ts                 # Master mock data & benchmarks
│   ├── index.css               # Global styles, fonts & Tailwind theme
│   └── main.tsx                # React application entry point
├── vercel.json                 # Vercel SPA routing configuration
├── vite.config.ts              # Vite bundler & plugin settings
└── package.json                # Project dependencies & scripts
```

---

## 📄 License

This project is proprietary and built for **Challengers Volleyball Academy**.  
All rights reserved © 2026.
