# Visual Comparison Checklist

Compare the deployed site against the Lovable reference (`preview-images/idea-preview.png`)

## Header Section
- [ ] Logo displays correctly (Texas Five Fueling with T5 branding)
- [ ] Logo switches between light/dark versions on scroll
- [ ] Navigation menu visible (Services, Service Area, Equipment, Contact)
- [ ] "Get a Quote" CTA button in brand red (#a81b1b)
- [ ] Mobile hamburger menu functions correctly
- [ ] Header has subtle backdrop blur effect when scrolled

## Hero Section (CRITICAL - Currently Broken)
- [ ] **Background image displays** (red fuel truck on sunset/desert)
- [ ] **Full viewport height** (min-h-screen)
- [ ] Gradient overlay (black/50 from left to transparent right)
- [ ] Heading: "Professional Fuel Delivery" in **Poppins Bold**
- [ ] Heading: White color, large size (text-5xl md:text-7xl)
- [ ] Subheading: White/90 opacity, proper line height
- [ ] "Get a Quote" button: Red background, white text, arrow icon
- [ ] "Call Now" button: White/translucent, phone icon
- [ ] Stats bar: "24/7", "15+ Years Experience", "1000+ Satisfied Clients"
- [ ] Stats: White text, proper spacing
- [ ] Fade-in animation on content (animate-fade-in)

## Services Section
- [ ] Section heading: "Our Services"
- [ ] Service cards display in grid (2x2 or responsive)
- [ ] Each card has icon, title, description
- [ ] Cards have hover effect (scale, shadow)
- [ ] Scroll reveal animation triggers
- [ ] Service icons load correctly
- [ ] Proper spacing and padding

## Service Area Section
- [ ] Section heading: "Service Area"
- [ ] Google Maps integration displays
- [ ] Service area description text
- [ ] Coverage area highlighted on map
- [ ] Responsive layout (map + text)

## Equipment Section
- [ ] Section heading: "Equipment We Service"
- [ ] Equipment cards in grid layout
- [ ] Equipment images load correctly:
  - [ ] Generators
  - [ ] Construction Equipment
  - [ ] Fleet Vehicles
  - [ ] Heavy Machinery
  - [ ] Agricultural Equipment
  - [ ] Industrial Equipment
  - [ ] Emergency Relief
  - [ ] Oil & Gas
- [ ] Hover gradient overlay effect
- [ ] Click opens detailed modal/dialog
- [ ] Modal shows full details and images
- [ ] Scroll reveal animation on cards

## Trust/Features Section
- [ ] Feature icons display
- [ ] Feature titles and descriptions
- [ ] Proper grid layout
- [ ] Icons: Licensed, Fast, 24/7, Team, etc.

## Contact Form Section
- [ ] Two-column layout (info + form)
- [ ] Contact information cards:
  - [ ] Phone with icon
  - [ ] Email with icon
  - [ ] Service area with icon
  - [ ] Business hours card
- [ ] Form fields render correctly:
  - [ ] First Name
  - [ ] Last Name
  - [ ] Company Name
  - [ ] Email
  - [ ] Phone
  - [ ] Service Type (dropdown)
  - [ ] Location
  - [ ] Message (textarea)
- [ ] "Request a Quote" button
- [ ] Form validation works
- [ ] Loading state displays on submit
- [ ] Success message shows after submission
- [ ] Toast notifications appear

## Footer Section
- [ ] Four-column grid layout
- [ ] Company logo displays
- [ ] Company description text
- [ ] Quick links (with scroll navigation)
- [ ] Services list
- [ ] Contact information
- [ ] Social media links (if applicable)
- [ ] Bottom bar with copyright
- [ ] Policy links (Privacy, Terms)
- [ ] Proper white text on dark background

## Typography
- [ ] **Primary font:** Poppins (400, 600, 700)
- [ ] **Serif font:** Playfair Display (for accents)
- [ ] Headings: Bold, proper hierarchy (h1 > h2 > h3)
- [ ] Body text: Regular weight, readable size
- [ ] Font loading: No FOUT (flash of unstyled text)

## Colors
- [ ] **Primary red:** #a81b1b (buttons, accents)
- [ ] **Dark gray:** #333333 (text, footer background)
- [ ] **White:** Text on dark backgrounds
- [ ] **Overlays:** Black with opacity for hero
- [ ] **Backgrounds:** Proper contrast throughout

## Animations
- [ ] Hero fade-in on load
- [ ] Scroll reveal on sections (fade-in-up)
- [ ] Service card hover effects
- [ ] Equipment card hover effects
- [ ] Button hover states
- [ ] Form field focus states
- [ ] Smooth scroll navigation
- [ ] Header backdrop blur on scroll
- [ ] Animations respect prefers-reduced-motion

## Responsive Design
### Mobile (< 768px)
- [ ] Hero: Mobile background image loads
- [ ] Header: Hamburger menu visible and functional
- [ ] Stacked layout for all sections
- [ ] Touch-friendly button sizes
- [ ] Form: Single column layout

### Tablet (768px - 1023px)
- [ ] Hero: Tablet background image loads
- [ ] Two-column layouts work properly
- [ ] Navigation adapts appropriately

### Desktop (1024px+)
- [ ] Hero: Desktop background image loads
- [ ] Full navigation visible
- [ ] Multi-column layouts display correctly
- [ ] Hover effects work smoothly

## Performance
- [ ] Page loads in < 3 seconds
- [ ] Images lazy load (except hero)
- [ ] No layout shift (CLS)
- [ ] Smooth scrolling
- [ ] No JavaScript errors in console
- [ ] No 404 errors in network tab

---

## Current Status Summary

### ✅ What's Working
- Build completes successfully
- No TypeScript errors
- Components exist and are imported
- Images exist in public/images/
- Environment variables set in Vercel

### ❌ What's Broken
- **Hero background image not displaying** (CRITICAL)
- Site appears as mostly white screen
- Layout may be collapsed or improperly styled
- Typography may not be loading correctly (Poppins)

### ❓ Unknown (Needs Testing)
- Does local development work?
- Does production build work locally?
- What errors appear in browser console?
- Are any other images failing to load?
- Is CSS loading at all?
- Are animations working?

---

## Testing Protocol

1. **Visual Inspection:**
   - Open deployed site
   - Open `preview-images/idea-preview.png` side-by-side
   - Go through checklist section by section
   - Document all differences

2. **Browser DevTools:**
   - Console: Check for errors
   - Network: Check for 404s, failed requests
   - Elements: Inspect hero section structure
   - Performance: Check load times

3. **Responsive Testing:**
   - Test on actual mobile device
   - Test with DevTools responsive mode
   - Test different viewport widths
   - Test on different browsers

4. **Interaction Testing:**
   - Click all navigation links
   - Test form submission
   - Test equipment card modals
   - Test scroll animations
   - Test all CTAs

---

*Use this checklist systematically to identify ALL visual discrepancies between expected and actual rendering.*

