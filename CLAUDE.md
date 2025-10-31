# Claude Code Instructions

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

---

## Amazon Q Developer - Task #30 Handoff

### For Amazon Q Developer

**You are assigned to work exclusively on Task #30: AWS SES Email Service Setup and Configuration**

### Important Instructions

1. **Read these documents first:**
   - `HANDOFF_AMAZON_Q_TASK30.md` - Complete implementation guide
   - `PRD_AMAZON_Q_TASK30.md` - Product requirements and specifications

2. **DO NOT modify these files:**
   - `.env` file (AWS credentials already configured)
   - `components/sections/ContactForm.tsx` (working perfectly)
   - `lib/supabase.ts` (working perfectly)
   - `lib/env.ts` (working perfectly)

3. **Files to enhance:**
   - `lib/aws-ses.ts` - Add helper functions and email templates
   - `app/api/leads/route.ts` - Integrate retry logic

4. **Files to create:**
   - `lib/aws-ses-retry.ts` - Exponential backoff retry logic
   - `app/api/health/ses/route.ts` - Health monitoring endpoint
   - `lib/aws-ses-setup.ts` (optional) - Domain verification utilities

5. **Follow the subtasks:**
   - Complete all 6 subtasks (30.1 through 30.6)
   - Use MCP tools or CLI to update task status
   - Commit changes frequently with descriptive messages

6. **Testing requirements:**
   - Unit tests for retry logic
   - Integration tests for email sending
   - Manual testing with real lead submissions
   - Health endpoint verification

### Quick Start Commands

```bash
# 1. Get the task details
npx task-master-ai get-task --id=30

# 2. Mark as in progress
npx task-master-ai set-task-status --id=30 --status=in-progress

# 3. Work through subtasks
npx task-master-ai get-task --id=30.1  # Start with subtask 1

# 4. When complete, mark done
npx task-master-ai set-task-status --id=30 --status=done
```

### Key Reference Documents

- **Handoff Guide:** `HANDOFF_AMAZON_Q_TASK30.md`
- **PRD:** `PRD_AMAZON_Q_TASK30.md`
- **Project README:** `README.md`
- **Visual Strategy:** `VISUAL-STRATEGY-FOR-TEXAS-FIVE-FUELING-LANDING-PAGE.md`

### Success Criteria

✅ All 6 subtasks completed  
✅ Retry logic functional  
✅ Health endpoint working  
✅ Email notifications received  
✅ All tests passing  
✅ Zero linter errors  
✅ Committed to GitHub

**Target:** Complete Task #30 in current sprint

---

## Lovable to Next.js Migration

### Current Status: READY TO START (Checkpoint Created)

**Objective:** Migrate the gorgeous Lovable AI landing page to Next.js while preserving 100% of the design, styling, animations, fonts, colors, and content.

### Critical Preservation Requirements

**DO NOT CHANGE:**
- ✅ **Font:** Poppins Bold (main font) + Playfair Display (serif headlines)
- ✅ **Colors:** HSL-based color system with CSS variables
- ✅ **Images:** All 18 assets from Lovable (hero, equipment, logos)
- ✅ **Animations:** fade-in, fade-in-up, scale-in keyframes + useScrollReveal hook
- ✅ **Copy:** All headings, body text, CTAs exactly as written
- ✅ **Layout:** Exact section order and component structure
- ✅ **Styling:** All Tailwind classes and custom CSS unchanged

### Project Structure

**Source:** `/website/lovable-export/` (Vite + React 18 + Shadcn/ui)  
**Target:** `/website/texasfivefueling.com/` (Next.js 15 + React 19)

**Task List:** Tagged as `lovable-migration`
- **7 Main Tasks** (Foundation → Deployment)
- **48 Subtasks** (granular, 10-20 min each)
- **Estimated Time:** 4.5-6 hours total

### Task Master Commands

```bash
# Switch to migration tasks
task-master use-tag lovable-migration

# List all tasks
task-master list

# See next task to work on
task-master next

# View specific task details
task-master show 1

# Start working on a task
task-master set-status --id=1 --status=in-progress

# Mark subtask complete
task-master set-status --id=1.1 --status=done

# Switch back to main tasks
task-master use-tag master
```

### Task Breakdown

**Task 1: Foundation Setup (6 subtasks)**
- Install Shadcn/ui + Radix UI dependencies
- Merge Tailwind configs preserving animations
- Configure Poppins + Playfair Display fonts
- Copy all 18 image assets

**Task 2: Migrate UI Components (7 subtasks)**
- Copy Shadcn/ui component library
- Migrate custom hooks (useScrollReveal, use-mobile)
- Set up lib/utils with cn() function
- Add 'use client' directives for React 19

**Task 3: Migrate Sections (9 subtasks)** ⚠️ HIGHEST COMPLEXITY
- Convert Hero, Services, ServiceArea, Equipment, Trust sections
- Migrate ContactForm with React Hook Form + Zod
- Migrate Header (mobile menu) and Footer
- Convert to Next.js Image components

**Task 4: Configure Routing (5 subtasks)**
- Update app/layout.tsx with Header/Footer
- Create app/page.tsx with all sections
- Implement smooth scroll navigation
- Remove React Router dependencies

**Task 5: Form Integration (6 subtasks)**
- Wire ContactForm to existing `/api/leads`
- Test Supabase + AWS SES integration
- Implement loading states and error handling
- Add spam prevention (honeypot + rate limiting)

**Task 6: Performance Optimization (7 subtasks)**
- Configure Next.js Image optimization
- Set up metadata and SEO
- Optimize Core Web Vitals (LCP, FID, CLS)
- Run Lighthouse audit (target: 90+)

**Task 7: Deployment & QA (8 subtasks)**
- Deploy to Vercel develop branch
- Visual regression testing vs Lovable
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Device testing (mobile, tablet, desktop)

### Key Documents

- **Migration PRD:** `.taskmaster/docs/lovable-migration-prd.txt`
- **Lovable Export:** `/website/lovable-export/` (source code)
- **Task List:** View with `task-master list --tag lovable-migration`

### Recommended Execution Sessions

**Session 1:** Tasks 1-2 (Foundation + UI Components) - 1.5-2 hours  
**Session 2:** Task 3.1-3.5 (Sections Part 1) - 1-1.5 hours  
**Session 3:** Task 3.6-4.5 (Sections Part 2 + Routing) - 1-1.5 hours  
**Session 4:** Tasks 5-6 (Forms + Performance) - 1.5-2 hours  
**Session 5:** Task 7 (Deployment + QA) - 1-1.5 hours

### Success Criteria

✅ Pixel-perfect match to Lovable preview  
✅ All animations work identically  
✅ Form submits to `/api/leads` successfully  
✅ Lighthouse score ≥90 (all categories)  
✅ No TypeScript errors or console warnings  
✅ Responsive on all devices (mobile, tablet, desktop)  
✅ Cross-browser compatible (Chrome, Firefox, Safari, Edge)  
✅ Client approval for visual design

### Rollback Plan

If issues arise:
1. Git reset to this commit (before migration starts)
2. Review what went wrong
3. Fix in smaller incremental steps
4. All work happens on `develop` branch (main branch protected)

### Branch Strategy

- **main branch** → www.texasfivefueling.com (Coming Soon page stays)
- **develop branch** → texas-five-fueling.vercel.app (migration preview)

### Important Notes

- All migration work happens on `develop` branch
- Existing backend API (`/api/leads`) remains unchanged
- Supabase and AWS SES already configured and working
- Lovable uses Shadcn/ui (same as our new approach)
- Focus on preservation over optimization

**Last Updated:** October 30, 2025  
**Next Step:** Start Task 1 (Foundation Setup)
