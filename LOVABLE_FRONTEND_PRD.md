# Texas Five Fueling - Frontend Component Library PRD
**For Lovable AI - Build Phase Only**

---

## Project Context

You are building a **visual component library** for Texas Five Fueling, a commercial diesel delivery service in Houston, TX. This will be built in **React + Vite + Tailwind CSS** and then **ported to Next.js** by another developer.

**Your Job:**
- Build all UI components with pixel-perfect design
- Implement all animations and interactions
- Create a complete, responsive design system
- Use mock data and placeholder images
- Focus on visual polish and user experience

**NOT Your Job:**
- Backend integration (will be done during Next.js port)
- SEO/metadata (Next.js handles this)
- API routes (already built in Next.js backend)

---

## Tech Stack Requirements

**Must Use:**
- **React 18+** with TypeScript
- **Vite** as build tool
- **Tailwind CSS** for styling
- **Framer Motion** (with LazyMotion for bundle optimization)
- **React Hook Form** for form state management
- **Lucide React** for icons

**CSS Philosophy:**
- CSS-first animations (0 KB cost)
- Framer Motion only for complex interactions (counters, gestures)
- All animations: 200-400ms duration, ease-out
- Support `prefers-reduced-motion`

---

## Design System

### Brand Colors
```css
/* Primary Brand */
--brand-red: #a81b1b;
--brand-red-dark: #8f1414;
--brand-red-light: #c92020;

/* Neutrals */
--dark: #333333;
--black: #000000;
--white: #ffffff;
--gray-100: #f7fafc;
--gray-200: #edf2f7;
--gray-300: #e2e8f0;
--gray-400: #cbd5e0;
--gray-600: #718096;
--gray-700: #4a5568;
--gray-900: #1a202c;

/* Blues (for gradients/accents) */
--blue-700: #2c5282;
--blue-800: #2a4365;
--blue-900: #1a365d;
```

### Typography
```css
/* Fonts */
--font-serif: 'Playfair Display', Georgia, serif;  /* Headlines */
--font-sans: 'Inter', system-ui, sans-serif;       /* Body text */

/* Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */
```

### Spacing
Use Tailwind's default spacing scale (4px base unit).

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## Page Layout Structure

The landing page has **8 sections** in this exact order:

1. **Hero Section** - Full-screen impact
2. **Services Section** - 5 core services
3. **Service Area Section** - Coverage map + cities
4. **Equipment Section** - 6 equipment types
5. **Trust Section** - Stats + guarantees + NextGen badge
6. **Contact Form Section** - Lead capture
7. **FAQ Section** (Future - skip for now)
8. **Footer** - Contact info + links

Plus:
- **Header** (sticky navigation)

---

## Component Specifications

### 1. Header Component

**Location:** Top of page, sticky on scroll

**Content:**
- Logo: "T5F" in brand red, white background, rounded
- Company name: "Texas Five Fueling" in dark text
- Phone: "(281) 750-2023" with phone icon
- CTA Button: "Get a Quote" (brand red)

**Desktop Layout:**
```
[Logo "T5F"] [Texas Five Fueling]     [Navigation: Services | Coverage | Equipment]     [(icon) (281) 750-2023]  [Get a Quote Button]
```

**Mobile Layout:**
- Hamburger menu (right side)
- Logo + company name (left)
- Slide-in menu from right

**Behavior:**
- Sticky on scroll
- Subtle shadow appears after scrolling 50px
- Smooth scroll to sections on nav click
- Hamburger menu: slide in from right with backdrop

**Animation:**
- Header fade-in on page load (200ms)
- Menu slide-in: 300ms ease-out

---

### 2. Hero Section

**Visual Concept:** Full-screen hero with dramatic fuel truck image

**Layout:**
- Full viewport height (100vh, min-height: 700px)
- Background: Large fuel truck image (use placeholder from Unsplash: search "fuel truck" or "tanker truck")
- Dark gradient overlays for text readability:
  - Left-to-right: `from-black/80 via-black/60 to-black/40`
  - Bottom-to-top: `from-black/50 via-transparent`

**Content:**
```
Headline (Serif, 5xl/6xl/7xl):
"Houston's Most Reliable Commercial Fuel Delivery"

Subheadline (Sans, xl/2xl/3xl):
"24/7 diesel delivery for generators, equipment, and job sites. Serving Houston and surrounding areas with fast, dependable service."

CTAs:
[Get a Quote] (brand red, solid)
[Call Now: (281) 750-2023] (white border, glassmorphism)

Down arrow indicator (bottom center, animated bounce)
```

**Typography:**
- Headline: `font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white`
- Subheadline: `font-sans text-xl md:text-2xl lg:text-3xl text-gray-100`

**Buttons:**
- Primary: `bg-[#a81b1b] hover:bg-[#8f1414] px-8 py-4 text-lg`
- Secondary: `bg-white/10 backdrop-blur-sm border-2 border-white hover:bg-white hover:text-[#333333] px-8 py-4 text-lg`

**Animation:**
- Staggered fade-in-up:
  - Headline: 0ms delay
  - Subheadline: 100ms delay
  - Buttons: 200ms delay
- Down arrow: continuous bounce (CSS animation)

**Responsive:**
- Desktop: Text left-aligned, max-width 4xl
- Mobile: Centered, full-width padding

---

### 3. Services Section

**Title:** "Our Services"

**Content:** 5 service cards in a grid

**Services:**
1. **Diesel Generator Refueling**
   - Icon: ⚡ (or use Lucide `Zap` icon)
   - Description: "Keep your backup power systems running with scheduled or emergency diesel delivery for generators of all sizes."

2. **Equipment Refueling**
   - Icon: 🏗️ (or use Lucide `Wrench` icon)
   - Description: "On-site fueling for construction equipment, excavators, bulldozers, and heavy machinery to keep your projects moving."

3. **Job Site Fuel Delivery**
   - Icon: 🚧 (or use Lucide `HardHat` icon)
   - Description: "Direct delivery to your construction site or remote location, minimizing downtime and maximizing productivity."

4. **Shop Fueling Services**
   - Icon: 🏭 (or use Lucide `Building2` icon)
   - Description: "Regular fuel delivery for automotive shops, repair facilities, and fleet maintenance yards."

5. **DEF Re-filling**
   - Icon: 💧 (or use Lucide `Droplet` icon)
   - Description: "Diesel Exhaust Fluid delivery to keep your fleet compliant with emissions standards and running smoothly."

**Card Design:**
- White background
- Subtle shadow: `shadow-md hover:shadow-xl`
- Padding: `p-6 md:p-8`
- Border radius: `rounded-lg`
- Icon: Large (64px), brand red circle background
- Title: `text-2xl font-bold text-[#333333]`
- Description: `text-gray-600 leading-relaxed`

**Grid Layout:**
- Desktop: 3 columns (first row 3, second row 2 centered)
- Tablet: 2 columns
- Mobile: 1 column

**Animation:**
- Scroll-triggered fade-in when 60% visible
- Cards animate in with 50ms stagger
- Hover: lift up slightly (`transform: translateY(-4px)`) + shadow increase
- Duration: 300ms ease-out

---

### 4. Service Area Section

**Title:** "Where We Serve"

**Layout:** Two columns (desktop) / stacked (mobile)

**Left Column: Coverage List**
```
Primary Service Areas:
• Houston, TX
• Hempstead, TX
• Katy, TX
• Sugar Land, TX
• The Woodlands, TX
• Cypress, TX
• Spring, TX
• Pearland, TX
• Surrounding areas within 50 miles
```

**Right Column: Map**
- Use a static Google Maps embed or placeholder image showing Houston area
- Placeholder: Use a map screenshot from Google Maps (centered on Houston)
- Add text overlay: "50-mile service radius from Houston"

**CTA:**
Large button below: "Not sure if we serve your area? Call us!" → Links to phone

**Animation:**
- List items fade in on scroll (50ms stagger)
- Map fades in from right

---

### 5. Equipment Section

**Title:** "Equipment We Fuel"

**Content:** 6 equipment cards with images

**Equipment Types:**
1. **Generators**
   - Placeholder: Industrial generator image
   - Description: "Backup power systems, industrial generators, and emergency power equipment"

2. **Construction Equipment**
   - Placeholder: Excavator/bulldozer image
   - Description: "Excavators, bulldozers, loaders, backhoes, and heavy machinery"

3. **Commercial Vehicles**
   - Placeholder: Commercial truck fleet image
   - Description: "Fleet vehicles, delivery trucks, and commercial transportation"

4. **Agricultural Equipment**
   - Placeholder: Tractor/farm equipment image
   - Description: "Tractors, harvesters, irrigation systems, and farming machinery"

5. **Industrial Equipment**
   - Placeholder: Industrial machinery image
   - Description: "Manufacturing equipment, forklifts, and warehouse machinery"

6. **Fleet Vehicles**
   - Placeholder: Multiple vehicles image
   - Description: "Company fleets, service vehicles, and transportation equipment"

**Card Design:**
- Image on top (16:9 aspect ratio)
- Content below with padding
- Title: `text-xl font-bold text-[#333333]`
- Description: `text-sm text-gray-600`
- Rounded corners: `rounded-lg`
- Shadow on hover: `hover:shadow-lg`

**Grid:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Animation:**
- Scroll-triggered fade-in
- 100ms stagger between cards
- Hover: scale(1.02) + shadow increase

---

### 6. Trust Section

**Layout:** Three parts side-by-side (desktop) / stacked (mobile)

**Part 1: Animated Counters**
```
25+
Years of Service

1M+
Gallons Delivered

500+
Happy Customers
```

**Counter Animation:**
- Use Framer Motion to animate from 0 to target number
- Duration: 2 seconds
- Easing: ease-out
- Trigger: when 70% visible in viewport

**Part 2: Service Guarantees**
```
✓ 24/7 Emergency Service
✓ Licensed & Insured
✓ DOT & EPA Compliant
✓ Certified Technicians
✓ Competitive Pricing
✓ Same-Day Delivery Available
```

**Part 3: NextGen Group Badge**
- Large badge/logo design
- Text: "Part of NextGen Group"
- Professional, corporate styling
- Subtle background: light gray rounded card

**Background:**
- Light gray section: `bg-gray-100`
- Full-width
- Generous padding

**Animation:**
- Counters animate on scroll
- Checkmarks fade in with stagger

---

### 7. Contact Form Section

**Title:** "Get a Quote"
**Subtitle:** "Fill out the form below and we'll get back to you within 24 hours."

**Form Fields:**

1. **Name** (required)
   - Type: text
   - Placeholder: "John Doe"
   - Validation: Min 2 characters

2. **Company Name** (optional)
   - Type: text
   - Placeholder: "ABC Construction Co."

3. **Email** (required)
   - Type: email
   - Placeholder: "john@example.com"
   - Validation: Valid email format

4. **Phone** (required)
   - Type: tel
   - Placeholder: "(281) 555-1234"
   - Validation: Valid phone format (10+ digits)

5. **Service Type** (required)
   - Type: select dropdown
   - Options:
     - Diesel Generator Refueling
     - Equipment Refueling
     - Job Site Fuel Delivery
     - Shop Fueling Services
     - DEF Re-filling
     - Other

6. **Location** (required)
   - Type: text
   - Placeholder: "Houston, TX or specific address"
   - Validation: Min 5 characters

7. **Message** (optional)
   - Type: textarea
   - Placeholder: "Tell us about your fuel delivery needs..."
   - Rows: 4

**Submit Button:**
- Text: "Request a Quote"
- Style: `bg-[#a81b1b] hover:bg-[#8f1414] w-full py-4 text-lg font-semibold`
- Loading state: Show spinner inside button
- Success state: Show checkmark + "Quote Requested!"
- Error state: Show error message above form

**Form Behavior:**
- Real-time validation (show errors on blur)
- Disable submit until all required fields valid
- On submit: Show loading state → Show success message → Clear form after 2 seconds
- Mock submission (just console.log the data)

**Form Styling:**
- White background on light gray section
- Rounded corners, generous padding
- Two-column layout (desktop) for fields 1-6
- Full-width for message field
- Input styling:
  - Border: `border border-gray-300`
  - Focus: `border-[#a81b1b] ring-2 ring-[#a81b1b]/20`
  - Padding: `px-4 py-3`
  - Rounded: `rounded-lg`

**Validation States:**
- Error: Red border + red text below field
- Success: Green checkmark icon (right side of input)

**Animation:**
- Form fade-in on scroll
- Success message: scale-in + fade-in (300ms)
- Error shake animation (if validation fails)
- Loading spinner rotation

---

### 8. Footer Component

**Layout:** 3 columns (desktop) / stacked (mobile)

**Column 1: Contact Information**
```
Contact Us

📞 (281) 750-2023
✉️ info@t5fueling.com
📍 Hempstead, TX
```

**Column 2: Quick Links**
```
Quick Links

Services
Service Area
Equipment
Get a Quote
```

**Column 3: About**
```
About Us

Texas Five Fueling is a commercial diesel delivery service operating in Houston, TX, under the parent company NextGen Group.

Part of NextGen Group
```

**Bottom Bar:**
```
© 2025 Texas Five Fueling. All rights reserved.
A NextGen Group company
```

**Styling:**
- Background: `bg-gray-900 text-white`
- Padding: `py-12`
- Links: `hover:text-[#a81b1b] transition-colors`
- Icons: Small (16px), inline with text

**Animation:**
- None (static component)

---

## Animations Specification

### CSS-First Animations (Create in Tailwind or custom CSS)

```css
/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Bounce (for down arrow) */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Shake (for form errors) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
```

### Framer Motion Usage

**Only use Framer Motion for:**
1. **Number counters** in Trust Section (animating 0 → 25, etc.)
2. **Form success message** (scale + fade)
3. **Any gesture-based interactions** (drag, swipe - if needed)

**For everything else:** Use CSS animations or CSS transitions.

### Reduced Motion Support

Add this to your global CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Breakpoints

Use Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach:**
- Design for mobile (375px width) first
- Add `md:` and `lg:` classes for larger screens
- Test at 375px, 768px, and 1440px

---

## Scroll Behavior

**Smooth Scroll:**
Add to root element: `scroll-behavior: smooth`

**Intersection Observer Triggers:**
- Services cards: Animate when 60% visible
- Equipment cards: Animate when 60% visible
- Trust section counters: Animate when 70% visible
- Contact form: Animate when 50% visible

**Implementation:**
Use `react-intersection-observer` or native `IntersectionObserver` API.

---

## Image Assets

**Use Unsplash for all placeholder images:**

1. **Hero Background:**
   - Search: "fuel truck" or "tanker truck delivery"
   - Landscape orientation, 1920x1080 or larger
   - Dark/moody lighting preferred

2. **Equipment Cards (6 images):**
   - Generators: "industrial generator"
   - Construction: "excavator construction site"
   - Commercial vehicles: "commercial truck fleet"
   - Agricultural: "farm tractor"
   - Industrial: "warehouse forklift"
   - Fleet: "delivery trucks fleet"

3. **Logo Placeholder:**
   - Use text "T5F" in a white rounded square with brand red text

**Image Optimization:**
- Use `<img>` tags (Lovable doesn't have Next.js Image)
- Add `loading="lazy"` for all non-hero images
- Use WebP format when possible

---

## Mock Data

**For form submission:**
```javascript
const handleSubmit = (data) => {
  console.log('Form submitted:', data);
  // Show success message
  // Clear form after 2 seconds
};
```

**For counters:**
```javascript
const stats = [
  { number: 25, label: "Years of Service", suffix: "+" },
  { number: 1000000, label: "Gallons Delivered", suffix: "+" },
  { number: 500, label: "Happy Customers", suffix: "+" }
];
```

---

## Accessibility Requirements

**Must-Haves:**
1. All interactive elements keyboard accessible (tab navigation)
2. Focus states visible: `focus:ring-2 focus:ring-[#a81b1b]`
3. ARIA labels on icon-only buttons
4. Alt text on all images
5. Color contrast ratio ≥ 4.5:1 for text
6. Form labels associated with inputs
7. Error messages announced to screen readers

**Skip links:**
Add "Skip to main content" link at top for keyboard users.

---

## Performance Budgets

**Bundle Size Targets:**
- Total JS: < 150 KB gzipped
- CSS: < 30 KB gzipped
- Largest image: < 200 KB

**Core Web Vitals:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

**Optimization Tips:**
- Use LazyMotion for Framer Motion (reduces bundle by ~20 KB)
- Lazy load images below fold
- Minimize custom fonts (only load weights used: 400, 600, 700)

---

## File Structure Suggestion

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── ServiceArea.tsx
│   │   ├── Equipment.tsx
│   │   ├── TrustSection.tsx
│   │   └── ContactForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Textarea.tsx
│       └── Card.tsx
├── hooks/
│   └── useIntersectionObserver.ts
├── styles/
│   ├── globals.css
│   └── animations.css
├── types/
│   └── index.ts
└── App.tsx
```

---

## Deliverables Checklist

When complete, the project should have:

- ✅ All 8 sections implemented and responsive
- ✅ Header with sticky behavior and mobile menu
- ✅ Footer with all links and contact info
- ✅ Contact form with full validation and states
- ✅ All animations implemented (CSS + Framer Motion)
- ✅ Number counters animating on scroll
- ✅ Scroll-triggered reveals for all sections
- ✅ Mobile responsive (375px to 1920px)
- ✅ Accessibility features (keyboard nav, ARIA, focus states)
- ✅ `prefers-reduced-motion` support
- ✅ Professional, polished design
- ✅ Clean, commented code
- ✅ TypeScript types for all components

---

## Design Reference

**Visual Style:**
- **Premium but conservative** (not flashy)
- **Professional B2B aesthetic** (corporate clients)
- **High trust signals** (certifications, stats, NextGen badge)
- **Clear hierarchy** (serif headlines, sans body)
- **Brand red used sparingly** (CTAs, accents only)
- **Generous whitespace** (not cramped)
- **Subtle animations** (no parallax or bounce)

**Inspiration:**
Think of professional B2B SaaS landing pages (Stripe, Shopify) but for industrial services.

---

## Final Notes

**Remember:**
- This is a **visual prototype** that will be ported to Next.js
- Focus on **design excellence** and **smooth interactions**
- Use **mock data** for everything (no real API calls)
- Keep **performance** in mind (bundle size, animations)
- Make it **pixel-perfect** and **responsive**
- Add **inline comments** for complex logic

**When you're done:**
The project should look like a polished, production-ready landing page that impresses the client. Every interaction should feel smooth, every section should look professional, and the whole experience should scream "reliable commercial service."

---

**Let's build something great! 🚛⛽**

