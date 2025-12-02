# Lovable PRD: Texas Five Fueling Landing Page Frontend

## Project Overview
Create a premium, modern landing page for Texas Five Fueling, a commercial diesel delivery service in Houston, TX. This PRD focuses ONLY on the frontend visual design and components. The backend API, database, and email infrastructure already exist and must be preserved.

## Your Role (Lovable)
- Build the complete landing page frontend
- Create all UI components matching the visual strategy
- Wire the contact form to our existing API endpoint
- Match our tech stack exactly

## Tech Stack (MUST MATCH)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** 
  - Headlines: Serif font (Playfair Display, Merriweather, or similar)
  - Body: Inter (sans-serif)
- **Animation:** CSS-first with subtle Framer Motion (LazyMotion) for counters only
- **Images:** Next.js `<Image>` component for optimization

## Visual Strategy (CRITICAL - READ FIRST)
See attached `VISUAL-STRATEGY-FOR-TEXAS-FIVE-FUELING-LANDING-PAGE.md` for complete design direction.

**Key Requirements:**
- **Color Palette:** `#a81b1b` (brand red) as primary, `#333333`/black accents, white backgrounds
- **Typography:** Serif headlines, sans-serif body
- **Animation:** Subtle, professional (200-400ms durations, ease-out)
- **Performance:** Target Lighthouse score ≥90
- **Accessibility:** WCAG 2.1 AA compliance, `prefers-reduced-motion` support

## Page Sections (In Order)

### 1. Header (Sticky)
- Logo: "T5F" badge + "Texas Five Fueling" text
- Phone number: (855) 895-3835 (clickable `tel:` link)
- CTA Button: "Get a Quote" (scrolls to contact form)
- Mobile: Hamburger menu or simplified layout

### 2. Hero Section (Above the Fold)
- **Background:** Full-width hero image (user will provide fuel truck image)
  - Dark overlay for text readability
  - Image should be optimized (Next.js Image component)
- **Content:**
  - Headline (Serif, 48-64px): "Houston's Most Reliable Commercial Fuel Delivery Service"
  - Subheadline (Sans, 18-24px): "24/7 diesel delivery for generators, equipment, and job sites. Serving Houston and surrounding areas with fast, dependable service."
  - Two CTAs:
    1. Primary (red `#a81b1b`): "Get a Quote" (scroll to form)
    2. Secondary (white outline): "Call Now: (855) 895-3835" (with phone icon)
  - Subtle fade-in animation on load (300-500ms)
- **Down arrow indicator** at bottom (subtle bounce animation)

### 3. Trust Indicators Section
- **Animated Counters** (use Framer Motion LazyMotion for smooth count-up):
  - "15+ Years in Business"
  - "5M+ Gallons Delivered"
  - "500+ Customers Served"
- **NextGen Group Badge:**
  - Logo (user will provide)
  - Text: "A trusted company - NextGen Group"
- **Service Guarantee Cards:**
  - "24/7 Service" (icon + text)
  - "Licensed & Insured" (icon + text)
  - "Fast Response" (icon + text)
  - "Experienced Team" (icon + text)
- Scroll-triggered fade-in (threshold: 60%, once only)

### 4. Services Section
**Title:** "Our Services"
**Layout:** 3-column grid (2 on tablet, 1 on mobile)

**5 Service Cards:**
Each card includes icon (user provides SVG), title, description, subtle hover animation (lift + shadow)

1. **Diesel Generator Refueling**
   - Description: "Keep generators running with scheduled and emergency fuel delivery. 24/7 availability for critical backup systems."
   
2. **Equipment Refueling**
   - Description: "On-site diesel delivery for construction equipment and heavy-duty vehicles. Flexible scheduling to meet your needs."
   
3. **Job Site Fuel Delivery**
   - Description: "Bulk diesel delivery directly to job sites with flexible scheduling. Keep your projects on track without delays."
   
4. **Shop Fueling Services**
   - Description: "Regular fuel delivery for shop fleets with 24/7 emergency service. Maintain fleet operations without interruption."
   
5. **DEF Re-filling**
   - Description: "Diesel Exhaust Fluid delivery for generators and equipment compliance. Meet EPA standards with our DEF service."

**CTA:** "Request a Service" button (scrolls to contact form)

### 5. Service Area Section
**Title:** "Our Service Area"
**Layout:** Two columns (1 column on mobile)

**Left Side - Google Maps Embed:**
- Embedded Google Map centered on Houston, TX
- Use iframe or Google Maps Embed API
- API key: `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Show service radius (optional visual)

**Right Side - Service Areas List:**
- Houston
- Hempstead
- Katy
- Sugar Land
- Cypress
- The Woodlands
- Conroe
- Tomball
- Spring
- Humble
- Pasadena
- Baytown

**Callout:** "Need service in your area? Contact us to check availability."
**CTA:** "Check Availability" button (scrolls to contact form)

**Additional:** "Extended Coverage Available" section with text explaining statewide delivery options.

### 6. Equipment Section
**Title:** "Equipment We Service"
**Subtitle:** "We provide fuel delivery for a wide range of commercial and industrial equipment. 24/7 service for your operational needs."

**Layout:** 3-column grid (2 on tablet, 1 on mobile)

**6 Equipment Cards:**
Each card with image (user provides), title, brief description, hover zoom effect

1. Diesel Generators - "Backup generators for businesses and facilities"
2. Construction Equipment - "Excavators, bulldozers, cranes, and more"
3. Heavy-Duty Vehicles - "Trucks, delivery vehicles, and commercial fleets"
4. Agricultural Machinery - "Tractors, harvesters, and farm equipment"
5. Industrial Generators - "Large-scale industrial power generation"
6. Fleet Vehicles - "Company vehicles and delivery fleets"

**CTA:** "Request Fuel Delivery" button (scrolls to contact form)

### 7. Contact Form Section
**Title:** "Get a Free Quote"
**Subtitle:** "Fill out the form below and we'll get back to you within 24 hours"

**CRITICAL: This form MUST connect to our existing API endpoint**

**API Endpoint:** `POST /api/leads`

**Form Fields (match API schema exactly):**

```typescript
interface LeadSubmissionBody {
  name: string;           // Required - Text input
  companyName?: string;   // Optional - Text input
  email: string;          // Required - Email input with validation
  phone: string;          // Required - Tel input with validation
  serviceType: string;    // Required - Select dropdown
  location: string;       // Required - Text input
  message?: string;       // Optional - Textarea
}
```

**Service Type Options (dropdown):**
- "Diesel Generator Refueling" (value: "diesel-generator")
- "Equipment Refueling" (value: "equipment-refueling")
- "Job Site Fuel Delivery" (value: "job-site-delivery")
- "Shop Fueling Services" (value: "shop-fueling")
- "DEF Re-filling" (value: "def-refilling")
- "Other Service" (value: "other")

**Client-Side Validation:**
- Name: Required, min 2 characters
- Email: Required, valid email format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Phone: Required, min 10 digits, format: `[\d\s\(\)\-\.]+`
- Service Type: Required, must select from dropdown
- Location: Required, min 3 characters
- Message: Optional, max 1000 characters

**Submit Button:**
- Text: "Request a Quote"
- Show loading spinner during submission
- Disable button while loading
- Color: `#a81b1b` (brand red)

**API Response Handling:**

**Success (200):**
```json
{
  "success": true,
  "leadId": "uuid",
  "message": "Thank you! We'll contact you within 24 hours."
}
```
- Show success message (green checkmark + message)
- Clear form
- Optional: Scroll to success message

**Error (400/500):**
```json
{
  "error": "Error message string"
}
```
- Show error message (red alert)
- Keep form data
- Allow retry

**Animations:**
- Inline validation (show errors on blur)
- Success message slide-in
- Loading spinner on button
- Smooth transitions (200ms)

### 8. Footer
**Layout:** 3 columns (1 column on mobile)

**Column 1 - Contact Us:**
- Phone: (855) 895-3835 (clickable)
- Email: info@t5fueling.com (clickable)
- Location: Hempstead, TX

**Column 2 - Quick Links:**
- Services (anchor link)
- Service Area (anchor link)
- Equipment (anchor link)
- Get a Quote (anchor link to form)

**Column 3 - About Us:**
- Brief description: "Texas Five Fueling is a commercial diesel delivery service operating in Houston, TX, under the parent company NextGen Group."
- "Part of NextGen Group" badge/text

**Copyright Bar:**
- © 2025 Texas Five Fueling. All rights reserved.
- "A NextGen Group company"

## Animation Guidelines
- **Durations:** 200-400ms for UI elements, 300-500ms for page load, 1.5-2.5s for counters
- **Easing:** `ease-out` for most transitions
- **Triggers:** Intersection Observer at 50-70% viewport entry, trigger ONCE
- **Respect `prefers-reduced-motion`:** Disable/minimize all animations
- **Performance:** Keep JS animation bundle under 15 KB (use LazyMotion for Framer Motion)

## Assets Provided by User
1. **Hero image:** Fuel truck (Midjourney render)
2. **Logo variations:** Various sizes and formats
3. **Service icons:** 5 SVG icons for service cards
4. **Equipment photos:** 6 images for equipment cards
5. **NextGen Group logo:** Company badge

## What NOT to Touch (Backend - Already Complete)
These files and features are complete and must NOT be recreated:

### API Endpoints (DO NOT REBUILD)
- `app/api/leads/route.ts` - Lead submission with security
- `app/api/test-supabase/route.ts` - Database test
- `app/api/customers/route.ts` - Stub (Phase 2)
- `app/api/orders/route.ts` - Stub (Phase 2)
- `app/api/health/ses/route.ts` - AWS SES health check

### Backend Infrastructure (DO NOT MODIFY)
- `lib/supabase.ts` - Database clients
- `lib/aws-ses.ts` - Email service with XSS protection
- `lib/aws-ses-retry.ts` - Retry logic
- `lib/env.ts` - Environment validation
- Database schema and RLS policies
- Environment variables in `.env`

### Your Contact Form Must:
1. POST to `/api/leads` (endpoint already exists)
2. Send exact JSON structure shown above
3. Handle success/error responses from API
4. Show appropriate user feedback

## Performance Targets
- **Lighthouse Score:** ≥90
- **First Contentful Paint (FCP):** <1.8s
- **Largest Contentful Paint (LCP):** <2.5s
- **Cumulative Layout Shift (CLS):** <0.1
- **Total JavaScript (animations):** ≤15 KB
- **Image optimization:** WebP/AVIF with proper sizing

## Accessibility Requirements
- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- `prefers-reduced-motion` support
- Alt text for all images
- Form labels and error messages

## Responsive Breakpoints
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Max content width: 1280px (centered)

## File Structure (Match Our Project)
```
app/
  page.tsx              # Main landing page (your output)
  layout.tsx            # Root layout (DO NOT CHANGE)
  globals.css           # Global styles (you can extend)
  
components/
  sections/
    Hero.tsx            # Your new hero
    Services.tsx        # Your new services
    ServiceArea.tsx     # Your new service area
    Equipment.tsx       # Your new equipment
    TrustSection.tsx    # Your new trust indicators
    ContactForm.tsx     # Your new form (wire to /api/leads)
  layout/
    Header.tsx          # Your new header
    Footer.tsx          # Your new footer
  ui/
    Button.tsx          # Reusable button (if needed)
    Input.tsx           # Form inputs (if needed)
    Select.tsx          # Form select (if needed)
    Textarea.tsx        # Form textarea (if needed)

public/
  images/
    hero-bg.jpg         # Hero background (user provides)
    equipment/          # Equipment photos (user provides)
    icons/              # Service icons (user provides)
    logo.png            # Main logo (user provides)
    nextgen-logo.png    # NextGen badge (user provides)
```

## Deliverables
1. **Complete Next.js 14 project** with all components
2. **Wired contact form** that POSTs to `/api/leads`
3. **Responsive design** matching visual strategy
4. **All animations** implemented with performance in mind
5. **Accessibility features** implemented
6. **Ready to integrate** with our existing backend

## Integration Notes for Handoff
When you export the project:
1. Include all component files
2. Include updated `tailwind.config.ts` with custom colors
3. Include any new fonts in `app/layout.tsx`
4. Document any new dependencies in `package.json`
5. List any environment variables needed (Google Maps API key)

## Success Criteria
- Landing page matches visual strategy document
- Contact form successfully POSTs to `/api/leads` and handles responses
- Lighthouse score ≥90
- No layout shifts (CLS <0.1)
- Animations are subtle and professional
- Mobile responsive and accessible
- All assets properly optimized

## Questions for Lovable
Before you start, please confirm:
1. Can you export this as a Next.js 14 App Router project with TypeScript and Tailwind?
2. Will the contact form be wired to POST to `/api/leads` with the exact schema shown?
3. Do you need any additional information about the backend API structure?
4. Can you implement the animated counters using Framer Motion LazyMotion?
5. Any concerns about matching our tech stack exactly?

