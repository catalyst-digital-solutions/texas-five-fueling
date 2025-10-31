# 🚀 Deployment Verification Checklist

## Task 7.1: ✅ Deploy to Vercel develop branch - COMPLETE

- ✅ Code pushed to `develop` branch
- ✅ All changes committed and synced with remote
- ⏳ **Next:** Monitor Vercel deployment in dashboard

---

## Task 7.2: 🔍 Verify Environment Variables in Vercel Dashboard

### How to Access Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select the **Texas Five Fueling** project
3. Click **Settings** in the top navigation
4. Click **Environment Variables** in the left sidebar

### Required Environment Variables Checklist

Check that ALL of these variables are configured for the **develop** environment:

#### ✅ Supabase Configuration (3 variables)

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - **Value:** Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
  - **Environment:** Production, Preview, Development (check all)
  
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **Value:** Your Supabase anon/public key
  - **Environment:** Production, Preview, Development (check all)
  
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - **Value:** Your Supabase service role key (secret)
  - **Environment:** Production, Preview, Development (check all)
  - ⚠️ **Important:** This is a SECRET key - never expose client-side

#### ✅ AWS SES Configuration (3 variables)

- [ ] `AWS_ACCESS_KEY_ID`
  - **Value:** Your AWS IAM access key ID
  - **Environment:** Production, Preview, Development (check all)
  
- [ ] `AWS_SECRET_ACCESS_KEY`
  - **Value:** Your AWS IAM secret access key
  - **Environment:** Production, Preview, Development (check all)
  - ⚠️ **Important:** This is a SECRET key
  
- [ ] `AWS_REGION`
  - **Value:** Your AWS SES region (e.g., `us-east-1`)
  - **Environment:** Production, Preview, Development (check all)

#### ✅ Google Maps API (1 variable)

- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
  - **Value:** Your Google Maps API key
  - **Environment:** Production, Preview, Development (check all)
  - ⚠️ **Note:** Has `NEXT_PUBLIC_` prefix, so it's client-safe

### Post-Configuration Steps

After adding all environment variables:

1. **Redeploy the Application**
   - Vercel needs to rebuild with the new environment variables
   - In the Vercel dashboard, go to **Deployments**
   - Find the latest deployment
   - Click the **three dots (⋮)** menu
   - Select **Redeploy**
   - Check "Use existing Build Cache" (faster)
   - Click **Redeploy**

2. **Monitor Build Status**
   - Watch the build logs in real-time
   - Ensure no errors about missing environment variables
   - Wait for "Build Completed" status

3. **Test the Deployed Site**
   - Open the preview URL (e.g., `https://texas-five-fueling-xxx.vercel.app`)
   - **Visual Check:** Does the site load correctly?
   - **Console Check:** Open browser DevTools console (F12), look for errors
   - **Form Test:** Try submitting the contact form
   - **Network Test:** Check if form submission works (Network tab in DevTools)

### Verification Tests

#### Test 1: Supabase Connection
- [ ] No console errors about missing `NEXT_PUBLIC_SUPABASE_URL`
- [ ] No console errors about missing `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Test 2: Form Submission
- [ ] Fill out the contact form with test data
- [ ] Submit the form
- [ ] Check for success message
- [ ] Verify lead appears in Supabase dashboard (`lead_submissions` table)
- [ ] Check email was sent (if AWS SES is verified)

#### Test 3: Google Maps (if implemented)
- [ ] Service area map loads correctly
- [ ] No console errors about missing `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Common Issues & Solutions

**Issue:** Build fails with "Missing environment variable"
- **Solution:** Double-check the variable name matches exactly (case-sensitive)
- **Solution:** Ensure the variable is assigned to the correct environment (Preview/Develop)
- **Solution:** Redeploy after adding variables

**Issue:** Form submission fails with 500 error
- **Solution:** Check Vercel Function Logs (Settings → Functions → View Logs)
- **Solution:** Verify AWS SES credentials are correct
- **Solution:** Ensure Supabase service role key is correct

**Issue:** "Environment variable not defined" in browser console
- **Solution:** Ensure `NEXT_PUBLIC_` prefix is used for client-side variables
- **Solution:** Clear browser cache and hard reload (Ctrl+Shift+R / Cmd+Shift+R)

---

## Task 7.3: 🎨 Visual Regression Testing Against Lovable Version

### Preparation

1. **Open Both Versions Side-by-Side**
   - **Lovable Version:** Open the original Lovable site
   - **Next.js Version:** Open your Vercel preview URL

2. **Set Up Testing Environment**
   - Use Chrome browser (for consistency)
   - Set browser window to 1920x1080 for desktop tests
   - Use Chrome DevTools device emulation for mobile tests

### Desktop Testing Checklist (1920x1080)

#### Hero Section
- [ ] **Background Image:** Same image, same positioning
- [ ] **Headline Text:** Same font (Poppins Bold), same size, same color
- [ ] **Subheadline Text:** Same font, same size, same color
- [ ] **CTA Button:** Same styling, same positioning
- [ ] **Logo:** Same logo, same size, correct positioning
- [ ] **Animations:** Fade-in effects match timing and easing

#### Services Section
- [ ] **Section Title:** Same font, size, color, spacing
- [ ] **Service Cards:** Same layout (grid), same spacing
- [ ] **Card Hover Effects:** Same hover transitions (scale, shadow, etc.)
- [ ] **Icons:** Same icons, same size, same color
- [ ] **Card Text:** Same font, same hierarchy (title, description)

#### Equipment Section
- [ ] **Section Title:** Same styling as Services
- [ ] **Equipment Grid:** Same layout, same spacing
- [ ] **Equipment Cards:** Same card style, same images
- [ ] **Hover Effects:** Same overlay gradient, same transitions
- [ ] **Modal Dialog:** Opens with same animation, same content layout

#### About/Trust Section
- [ ] **Section Layout:** Same layout structure
- [ ] **Text Content:** Same copy, same formatting
- [ ] **Images:** Same images, same aspect ratios
- [ ] **Background:** Same background color/pattern

#### Contact Form Section
- [ ] **Form Layout:** Two-column layout matches
- [ ] **Contact Info Cards:** Same styling, same icons
- [ ] **Form Fields:** Same styling, same placeholder text
- [ ] **Business Hours Card:** Same styling, same formatting
- [ ] **Submit Button:** Same styling, same states (hover, loading, success)

#### Header (Scroll Behavior)
- [ ] **Initial State:** Same styling at top of page
- [ ] **Scrolled State:** Same backdrop blur effect
- [ ] **Logo Switch:** Logo changes to white version on scroll
- [ ] **Mobile Menu:** Same animation, same styling

#### Footer
- [ ] **Layout:** 4-column grid matches
- [ ] **Links:** All links present, same styling
- [ ] **Social Icons:** Same icons, same styling (if applicable)
- [ ] **Copyright:** Same text, same formatting

### Mobile Testing Checklist (iPhone 12 Pro - 390x844)

Use Chrome DevTools device emulation:
1. Press F12 to open DevTools
2. Click **Toggle Device Toolbar** (Ctrl+Shift+M / Cmd+Shift+M)
3. Select **iPhone 12 Pro** from device dropdown

#### Mobile-Specific Checks
- [ ] **Hero:** Text scales correctly, CTA button visible
- [ ] **Services:** Cards stack vertically, maintain spacing
- [ ] **Equipment:** Grid adapts to single/two columns
- [ ] **Contact Form:** Stacks vertically, form fields full-width
- [ ] **Mobile Menu:** Hamburger menu works, menu slides in correctly
- [ ] **Touch Interactions:** All buttons/cards respond to taps
- [ ] **Font Sizes:** Text remains readable on small screens

### Discrepancy Documentation Template

For each discrepancy found, document using this format:

```markdown
### Discrepancy #1: Hero Headline Font Size

**Section:** Hero
**Element:** Main headline text
**Issue:** Font size appears 2px smaller than Lovable version
**Impact:** Low (barely noticeable)
**Lovable:** `font-size: 72px`
**Next.js:** `font-size: 70px`
**Priority:** Low
**Fix Needed:** Update Tailwind class from `text-7xl` to custom size
```

### Visual Regression Testing Tools (Optional)

If you want automated pixel-perfect comparisons:

1. **Percy.io** (Free tier available)
   - Automated visual regression testing
   - Integrates with CI/CD
   - Requires signup

2. **Manual Screenshot Comparison**
   - Take screenshots with browser extensions
   - Use image diff tools like:
     - **ImageMagick:** `compare original.png new.png diff.png`
     - **Pixelmatch:** Browser-based comparison tool
     - **DiffNow.com:** Online image comparison

### Expected Discrepancies (Acceptable)

These differences are expected and acceptable:

- ✅ **URL differences** (lovable.app vs vercel.app)
- ✅ **Favicon** (Next.js default vs Lovable)
- ✅ **Minor font rendering differences** between hosting platforms
- ✅ **DevTools availability** (Next.js has React DevTools, Lovable doesn't)

### Final Deliverable

Create a document named `VISUAL_REGRESSION_REPORT.md` with:
1. Testing date and tester name
2. Browser and device information
3. List of all discrepancies found (if any)
4. Screenshots showing side-by-side comparisons (if available)
5. Overall assessment: "Passed" or "Needs Fixes"

---

## 📋 Summary Checklist for Tasks 7.1-7.3

- [x] **7.1:** Code deployed to `develop` branch on Vercel
- [ ] **7.2:** All 7 environment variables configured in Vercel
- [ ] **7.2:** Deployment successful after adding variables
- [ ] **7.2:** Form submission tested and working
- [ ] **7.3:** Desktop visual regression testing completed
- [ ] **7.3:** Mobile visual regression testing completed
- [ ] **7.3:** Discrepancies documented (if any)
- [ ] **7.3:** `VISUAL_REGRESSION_REPORT.md` created

**Status:** Task 7.1 ✅ Complete | Tasks 7.2 & 7.3 ⏳ In Progress

