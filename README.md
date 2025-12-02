# Texas Five Fueling

Professional landing page for Texas Five Fueling - Commercial diesel delivery service in Houston, TX and surrounding areas.

## Overview

Texas Five Fueling is a commercial diesel delivery service providing 24/7 fuel delivery to generators, equipment, and job sites in the Houston area. This landing page focuses on Phase 1 of the project, providing lead capture functionality with a modern, performance-optimized user experience.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Performance optimized (Lighthouse score ≥90)
- 🔒 Secure form submission with Supabase backend
- 📧 Automated email notifications via Resend
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 AA compliant
- 🎯 Clear call-to-actions and lead capture
- 🚀 Deployed on Vercel with custom domain

## Tech Stack

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend
- **Maps:** Google Maps API
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account
- Resend account
- Google Maps API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/catalyst-digital-solutions/texas-five-fueling.git
   cd texas-five-fueling
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
   - `RESEND_API_KEY` - Your Resend API key
   - `CONTACT_EMAIL` - Email for lead notifications
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API routes
│   │   └── leads/        # Lead submission endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections (Hero, Services, etc.)
│   └── layout/           # Layout components (Header, Footer)
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
│   ├── images/          # Images and icons
│   └── icons/           # PWA icons
├── styles/               # Global styles and animations
└── .taskmaster/          # Task management (internal development)

```

## Key Pages

- **/** - Main landing page with all sections
- **/admin** - Admin panel placeholder (Phase 2)

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript with strict mode enabled
- ESLint for code quality
- Prettier for code formatting (optional)
- Tailwind CSS for styling

## Performance Targets

- Lighthouse Performance: ≥90
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Interaction to Next Paint: <200ms
- Time to Interactive: <3.5s

## Deployment

The application is deployed on Vercel with the custom domain `texasfivefueling.com`.

### Environment Variables

All environment variables must be configured in the Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Custom Domain

The site is configured with the custom domain `texasfivefueling.com` via Vercel's DNS settings.

## Phase 2 (Future)

Phase 2 will include:
- Customer portal and authentication
- Order management and tracking
- Dispatch dashboard
- Payment processing
- Advanced analytics and reporting

## License

© 2024 Texas Five Fueling. All rights reserved.

## Contact

**Texas Five Fueling**  
Phone: (855) 895-3835  
Email: info@t5fueling.com  
Location: Hempstead, TX

Part of **NextGen Group**
