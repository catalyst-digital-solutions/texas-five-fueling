# Texas Five Fueling Landing Page - Project Handoff Document

## Project Overview

**Client:** Texas Five Fueling  
**Type:** Commercial Diesel Delivery Service Landing Page  
**Priority:** High  
**Timeline:** Multi-phase development (Phase 1 active, Phase 2 planned for 6-12 months)  
**Tech Stack:** Next.js 13+ (App Router), TypeScript, Tailwind CSS, Supabase, Resend  
**Performance Target:** Lighthouse score ≥90

## Current Project Status

**Phase 1 (Active):**
- Professional single-page landing site with lead capture
- Backend architecture created but NOT activated
- Infrastructure costs under $25/month
- Visual animations and UI enhancements integrated into task list

**Phase 2 (Future - 6-12 months):**
- Customer portals, dispatch management, AI automation
- Requires infrastructure upgrade

**Task Management:** Task Master AI fully initialized and configured
- 29 main tasks (up from original 25)
- 116 subtasks total
- Visual/animation requirements integrated
- All tasks: `pending` status (project not yet started)

---

## Visual Strategy Summary

**Core Principle:** Build a Next.js 13+ landing page that looks premium but behaves conservatively. Use CSS-first animations, View Transitions API for routing, and Framer Motion (LazyMotion only) for targeted interactions. Keep Lighthouse ≥90. Subtle motion = trust.

**Technology Stance:**

✅ **USE:**
- CSS animations (0 KB bundle)
- View Transitions API (0 KB bundle)
- Framer Motion via LazyMotion (≈2.6-10 KB) for counters/gestures
- Intersection Observer for scroll-triggered reveals
- Native browser APIs

❌ **AVOID:**
- Lottie (≈82 KB, impacts scores)
- Heavy GSAP usage (23 KB + license)
- Parallax effects
- Bounce/elastic animations

**Animation Rules:**
- Durations: 200-400ms (micro 100-200ms; counters 1.5-2.5s)
- Trigger reveals at 50-70% viewport entry, once per element
- Always use ease-out timing function
- Respect `prefers-reduced-motion` and provide site-wide toggle (WCAG 2.1 AA compliance)

**Performance Budgets:**
- Lighthouse Performance: ≥90
- Framer Motion (LazyMotion only): ≤10 KB
- Total JavaScript for animations: ≤15 KB
- Core Web Vitals targets: FCP <1.8s, LCP <2.5s, CLS <0.1, INP <200ms, TTI <3.5s

---

## Task List Overview

### Integration Summary
- **Updated 7 existing tasks** with visual/animation requirements (Tasks 5, 8, 9, 11, 12, 13, 20)
- **Created 4 new tasks** for visual/animation infrastructure (Tasks 26-29)
- **116 total subtasks** across all tasks
- All animations follow conservative, performance-aware approach

### Critical Tasks (High Priority)

#### Task 1: Project Setup and Configuration
**Status:** Pending  
**Dependencies:** None  
**Priority:** High  
**Subtasks:** 3 (project scaffolding, TypeScript/Tailwind config, Git setup)

#### Task 5: Core UI Components Development (✓ Updated)
**Status:** Pending  
**Priority:** High  
**Updated with:** Animation requirements, accessibility features, performance targets

**Animation Requirements:**
- Button hover states with 200-400ms transitions (ease-out)
- Inline form validation with fade-in error messages (200-400ms)
- In-button loading state (CSS spinner animation)
- Success checkmark animation (200ms)
- Minimum touch targets: 44x44px
- WCAG AA compliant contrast ratios

#### Task 8: Hero Section Implementation (✓ Updated)
**Status:** Pending  
**Priority:** High  
**Updated with:** Phase-based animation system

**Animation Requirements:**
- Simple fade-in with 100ms stagger: headline → subheadline → CTAs
- Total duration: 400-600ms (ease-out timing)
- Use CSS opacity + translateY transforms
- Respect prefers-reduced-motion
- Phase 2/3: Video background support (10-15s loop with mobile static fallback)

#### Task 9: Services Section (✓ Updated)
**Status:** Pending  
**Priority:** High  
**Updated with:** Scroll-triggered animations and hover effects

**Animation Requirements:**
- Scroll reveals at 60% viewport entry (trigger once)
- 300ms fade-in with subtle translateY (15px)
- CSS-only hover effects: shadow increase + 2-3px translateY
- Phase 3 enhancements ready

#### Task 11: Equipment Types Section (✓ Updated)
**Status:** Pending  
**Priority:** Medium  
**Updated with:** Hover animations and scroll reveals

**Animation Requirements:**
- Image scale: 1.0 → 1.05 on hover (300ms ease-out)
- Overlay opacity shift for text contrast
- Scroll reveals with Intersection Observer (60% threshold)
- GPU-accelerated transforms only

#### Task 12: Trust/Social Proof Section (✓ Updated)
**Status:** Pending  
**Priority:** Medium  
**Updated with:** Number counter animations

**Animation Requirements:**
- Framer Motion LazyMotion for counters (1.5-2.5s duration)
- Animate: years in business (15+), gallons delivered (500,000+), customers served (1,000+)
- Bundle size target: ≤10 KB
- Trigger on viewport entry with Intersection Observer
- Instant display fallback for reduced motion preference

#### Task 13: Contact Form UI (✓ Updated)
**Status:** Pending  
**Priority:** High  
**Updated with:** CSS-first validation animations

**Animation Requirements:**
- Inline validation error messages: 200ms fade-in
- Field focus transitions: smooth border/shadow (200ms)
- CSS-only loading spinner during submission
- Success checkmark + message (200ms animation)
- ARIA live regions for screen readers
- Zero layout shifts during validation

#### Task 20: Performance Optimization (✓ Updated)
**Status:** Pending  
**Priority:** High  
**Updated with:** Animation performance budgets

**New Requirements:**
- Bundle size monitoring with next-bundle-analyzer
- Framer Motion ≤10 KB target
- Total animation JS ≤15 KB target
- Performance budget alerts in CI/CD
- A/B testing framework for animations

### New Visual/Animation Infrastructure Tasks

#### Task 26: Framer Motion + LazyMotion Setup (NEW)
**Status:** Pending  
**Priority:** High  
**Dependencies:** Tasks 1, 7  
**Subtasks:** 6

**Purpose:** Configure Framer Motion with LazyMotion for minimal bundle impact

**Key Requirements:**
- Install framer-motion package
- Configure LazyMotion wrapper in root layout with domAnimation features
- Set up motion components wrapper (`lib/motion.ts`)
- Create motion configuration utilities (`lib/motion-config.ts`)
- Bundle size target: ≤10 KB for motion features
- Usage: counters, success states, targeted micro-interactions only

**Implementation Files:**
- `app/layout.tsx` - LazyMotion wrapper
- `lib/motion.ts` - Export lazy-loaded m components
- `lib/motion-config.ts` - Accessibility helpers and config
- `app/globals.css` - Import motion styles

#### Task 27: View Transitions API Integration (NEW)
**Status:** Pending  
**Priority:** Medium  
**Dependencies:** Task 7  
**Subtasks:** 6

**Purpose:** Implement native browser View Transitions API for smooth page routing

**Key Requirements:**
- Create `useViewTransition` hook with feature detection
- Add View Transitions CSS for fade effects (300ms)
- Create ViewTransitionProvider component
- Update navigation to use transitions
- Fallback for unsupported browsers (instant navigation)
- Respect prefers-reduced-motion

**Implementation Files:**
- `hooks/useViewTransition.ts` - Navigation hook
- `providers/ViewTransitionProvider.tsx` - Provider component
- `app/globals.css` - View transition styles
- `components/layout/Header.tsx` - Updated navigation

#### Task 28: Motion Accessibility & Reduced Motion Support (NEW)
**Status:** Pending  
**Priority:** High  
**Dependencies:** Tasks 1, 7  
**Subtasks:** 6

**Purpose:** Achieve WCAG 2.1 AA compliance with dual-control motion reduction

**Key Requirements:**
- Global CSS for `prefers-reduced-motion` media query
- Custom site-wide "Reduce Motion" toggle with localStorage
- Create `useReducedMotion` hook
- Build MotionToggle UI component
- Integrate with Framer Motion variants
- Add toggle to Footer component

**Implementation Files:**
- `styles/motion.css` - Global motion reduction styles
- `hooks/useReducedMotion.ts` - Preference management hook
- `components/ui/MotionToggle.tsx` - User toggle component
- `utils/motion.ts` - Framer Motion variant helpers
- `components/layout/Footer.tsx` - Toggle integration

#### Task 29: CSS Animation Utilities & Design System (NEW)
**Status:** Pending  
**Priority:** High  
**Dependencies:** Task 1  
**Subtasks:** 8

**Purpose:** Create comprehensive CSS-only animation library with design system

**Key Requirements:**
- Fade-in animations: `fade-in`, `fade-in-up`, `fade-in-down`
- Hover states: `hover-lift`, `hover-shadow`, `hover-scale`
- Loading states: `spinner` (CSS-only), `skeleton` shimmer
- Utility classes: `transition-fast`, `transition-normal`, `transition-slow`
- Stagger helpers: `stagger-1` through `stagger-5` (100ms increments)
- Will-change optimizations
- Complete prefers-reduced-motion support

**Timing Rules:**
- Micro animations: 100-200ms (hover states, quick transitions)
- Normal animations: 200-400ms (fade-ins, reveals)
- Slow animations: 1.5-2.5s (counters, complex sequences)
- All use ease-out timing function

**Implementation Files:**
- `styles/animations.css` - Complete animation library
- `app/globals.css` - Import animations
- Testing: `app/test-animations/page.tsx` - Demo page

---

## Task Master AI Configuration

**Project Root:**
```
/Users/Mario/Documents/aaa-catalyst-digital-solutions/aaa-client-projects/Texas 5 Fueling - Antonio Ramirez, Miguel Abudd, Paul Mendoza/website/texasfivefueling.com
```

**Current Configuration:**
- Main Model: `opus` (Claude Code, opus)
- Research Model: `sonar-reasoning-pro` (Perplexity)
- Fallback Model: `claude-haiku-4-5-20241001` (Anthropic)
- Default Tag: `master`
- User ID: `1234567890`

**Configuration File:** `.taskmaster/config.json`

**Task Files:**
- Main file: `.taskmaster/tasks/tasks.json`
- Individual tasks: `.taskmaster/tasks/task-*.md` (auto-generated)

**Documentation:**
- PRD: `.taskmaster/docs/prd.txt`
- Visual Strategy: `VISUAL-STRATEGY-FOR-TEXAS-FIVE-FUELING-LANDING-PAGE.md`
- Complexity Report: `.taskmaster/reports/task-complexity-report.json`

---

## Key Files and Documentation

### Essential Project Files

1. **`VISUAL-STRATEGY-FOR-TEXAS-FIVE-FUELING-LANDING-PAGE.md`**
   - Location: Project root
   - Purpose: Complete visual strategy with animation guidelines
   - Key Sections:
     - TL;DR: CSS-first, performance-aware animations
     - Animation rules: 200-400ms durations, ease-out timing
     - Implementation roadmap: 3 phases
     - Performance stance: Avoid Lottie/GSAP, use native APIs
     - KPIs and A/B testing guidance

2. **`CLAUDE.md`**
   - Location: Project root
   - Purpose: Auto-loaded context for Claude Code
   - References: `.taskmaster/CLAUDE.md` for Task Master integration

3. **`.taskmaster/CLAUDE.md`**
   - Purpose: Task Master AI integration guide
   - Includes: Essential commands, workflow, MCP tools, best practices

### Task Master Integration

**MCP Server Configuration (`.mcp.json` in user home):**
```json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "npx",
      "args": ["-y", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "sk-ant-...",
        "PERPLEXITY_API_KEY": "pplx-...",
        "OPENAI_API_KEY": "sk-proj-..."
      }
    }
  }
}
```

**API Keys Status:**
- All keys loaded and functional in MCP context
- Keys configured for: Anthropic, Perplexity, OpenAI
- Task Master AI tools operational

---

## Visual Strategy Integration Details

### Updated Tasks Summary

**Task 5 (Core UI Components):**
- Added: Button loading states, validation animations, accessibility requirements
- CSS-only hover/active states with 200-400ms transitions
- Minimum 44x44px touch targets
- ARIA live regions for screen readers

**Task 8 (Hero Section):**
- Added: CSS-based fade-in with staggered timing
- Animation sequence: headline → subheadline → CTAs (100ms delays)
- Total duration: 400-600ms
- Phase 2/3: Video background infrastructure

**Task 9 (Services Section):**
- Added: Scroll-triggered reveals with Intersection Observer
- 60% viewport threshold, trigger once
- CSS hover effects: shadow + 2-3px translateY
- 300ms fade-in animations

**Task 11 (Equipment Section):**
- Added: Image scale hover (1.0 → 1.05, 300ms)
- Overlay opacity transitions
- Scroll reveal animations
- GPU-accelerated transforms only

**Task 12 (Trust Section):**
- Added: Framer Motion number counters
- Animate: years, gallons, customers
- 1.5-2.5s duration with ease-out
- Bundle size: ≤10 KB
- Instant fallback for reduced motion

**Task 13 (Contact Form):**
- Added: CSS-first validation animations
- Error message fade-ins (200ms)
- Loading spinner (CSS-only)
- Success animations
- ARIA live regions

**Task 20 (Performance Optimization):**
- Added: Animation performance budgets
- Bundle size targets (Framer Motion ≤10 KB, total ≤15 KB)
- Performance monitoring setup
- A/B testing framework
- CI/CD budget alerts

### New Infrastructure Tasks (26-29)

**Task 26 - Framer Motion Setup:**
- Configure LazyMotion wrapper (70% bundle reduction)
- Create motion component utilities
- Bundle monitoring with webpack-bundle-analyzer
- Performance verification (Lighthouse ≥90)

**Task 27 - View Transitions API:**
- Native browser API (0 KB cost)
- Smooth page routing (300ms fade)
- Progressive enhancement with fallback
- Accessibility: prefers-reduced-motion support

**Task 28 - Motion Accessibility:**
- WCAG 2.1 AA compliance
- Dual control: system setting + site toggle
- localStorage persistence
- Framer Motion integration with reduced variants

**Task 29 - CSS Animation System:**
- Comprehensive animation library
- Reusable utility classes
- Performance optimizations
- Complete accessibility support

---

## Development Workflow

### Starting Development

1. **Get Next Task:**
   ```
   Get next available task using MCP tool or CLI
   ```

2. **Review Task Details:**
   ```
   Show task details including dependencies and requirements
   ```

3. **Check Subtasks:**
   ```
   Review implementation subtasks for the selected task
   ```

4. **Begin Implementation:**
   - Follow task-specific requirements
   - Integrate visual/animation features where applicable
   - Test with prefers-reduced-motion enabled
   - Verify Lighthouse scores ≥90

5. **Log Progress:**
   ```
   Update subtask with implementation notes
   ```

6. **Complete Task:**
   ```
   Mark task and subtasks as done when complete
   ```

### Visual/Animation Implementation Checklist

For each animated component:

- [ ] Verify animation timing matches design system (200-400ms)
- [ ] Test with prefers-reduced-motion enabled
- [ ] Check bundle impact (use webpack-bundle-analyzer)
- [ ] Run Lighthouse audit (target ≥90)
- [ ] Test performance with Chrome DevTools (60fps target)
- [ ] Verify accessibility (screen readers, keyboard navigation)
- [ ] Confirm GPU acceleration (transform/opacity only)
- [ ] Test cross-browser compatibility

### Key Animation Patterns

**CSS-First Animations (0 KB cost):**
```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}

.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Framer Motion (LazyMotion, ≤10 KB):**
```typescript
import { m } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedCounter({ value }: { value: number }) {
  const { shouldReduceMotion } = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <span>{value}</span>;
  }
  
  return (
    <m.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      {value}
    </m.span>
  );
}
```

**View Transitions API (0 KB cost):**
```typescript
const { navigateWithTransition } = useViewTransition();

<a onClick={(e) => {
  e.preventDefault();
  navigateWithTransition('/admin');
}}>
  Admin
</a>
```

---

## Important Implementation Notes

### Visual Strategy Compliance

1. **Animation Philosophy:**
   - Subtle motion conveys trust and professionalism
   - Speed: 200-400ms for micro-interactions
   - Ease-out timing for natural feel
   - Never use bounce, elastic, or flashy effects

2. **Performance Targets:**
   - Lighthouse Performance: ≥90 (non-negotiable)
   - Bundle size for animations: ≤15 KB total
   - Framer Motion only: ≤10 KB (use LazyMotion)
   - Core Web Vitals: All "good" thresholds

3. **Accessibility Requirements:**
   - Respect `prefers-reduced-motion` globally
   - Provide site-wide "Reduce Motion" toggle
   - WCAG 2.1 AA compliance mandatory
   - ARIA labels for animated content
   - Focus management during transitions

4. **What NOT to Do:**
   - ❌ Use Lottie animations (82 KB bundle)
   - ❌ Heavy GSAP library (23 KB + license)
   - ❌ Parallax effects
   - ❌ Animate primary body copy
   - ❌ Use JavaScript for basic hover states
   - ❌ Compromise Lighthouse score for animations

### Task Dependencies

**Critical Path (Must complete in order):**
1. Tasks 1 → 2 → 3 → 4 (Project setup, environment, database, client)
2. Tasks 5 → 6 → 7 (UI components, layout, root setup)
3. Tasks 8-13 (All landing page sections)
4. Task 14 (API endpoint)
5. Tasks 20, 22, 23 (Testing and optimization)
6. Task 24 (Deployment)

**Visual/Animation Infrastructure:**
- Tasks 26-29 can be implemented in parallel during early phases
- Task 26 (Framer Motion) should be completed before Task 12 (Trust Section)
- Task 27 (View Transitions) can be added anytime after Task 7
- Tasks 28-29 should be completed early for design system consistency

---

## Testing Requirements

### Performance Testing
- Lighthouse audit (score ≥90 required)
- Core Web Vitals monitoring (FCP, LCP, CLS, INP, TTI)
- Bundle size analysis with webpack-bundle-analyzer
- Animation jank detection in Chrome DevTools
- 3G/4G network testing
- CPU-throttled mobile device testing

### Accessibility Testing
- Test with prefers-reduced-motion enabled
- Screen reader compatibility (NVDA, JAWS, VoiceOver)
- Keyboard navigation through all interactive elements
- ARIA live region announcements
- Focus management during animations
- Color contrast ratios (WCAG AA)

### Cross-Browser Testing
- Chrome 111+ (full support with View Transitions)
- Firefox, Safari, Edge (fallback testing)
- Mobile browsers (iOS Safari, Android Chrome)
- Responsive testing: 320px, 375px, 428px, 768px, 1024px, 1440px, 1920px

---

## Next Steps

### For New Cursor Instance

1. **Verify Project Setup:**
   - Confirm Task Master AI is configured and operational
   - Check `.taskmaster/config.json` for model settings
   - Verify MCP connection to task-master-ai server

2. **Review Task List:**
   ```
   Get all tasks to review current state
   ```

3. **Identify Starting Point:**
   ```
   Use next_task to find the first available task
   ```

4. **Review Requirements:**
   - Read VISUAL-STRATEGY-FOR-TEXAS-FIVE-FUELING-LANDING-PAGE.md
   - Review task-specific animation requirements
   - Check complexity report for guidance

5. **Begin Implementation:**
   - Follow the visual strategy principles
   - Maintain Lighthouse score ≥90
   - Test with accessibility features enabled
   - Log progress in subtasks using update-subtask

### Recommended First Tasks

Based on dependencies and complexity:

1. **Task 1** - Project Setup (foundational)
2. **Task 26** - Framer Motion Setup (required for Task 12)
3. **Task 5** - Core UI Components (required for all sections)
4. **Task 29** - CSS Animation System (design system foundation)
5. **Task 8** - Hero Section (high-visibility feature)

---

## Contact and Resources

**Project Files:**
- Visual Strategy: `VISUAL-STRATEGY-FOR-TEXAS-FIVE-FUELING-LANDING-PAGE.md`
- Task List: `.taskmaster/tasks/tasks.json`
- Task Master Docs: `.taskmaster/CLAUDE.md`
- Configuration: `.taskmaster/config.json`

**Task Master AI:**
- CLI: `task-master <command>`
- MCP Tools: Available through Cursor integration
- Documentation: See `.taskmaster/CLAUDE.md` for complete reference

**Key Commands:**
```bash
# View all tasks
task-master list

# Get next task
task-master next

# Show task details
task-master show <id>

# Mark task complete
task-master set-status --id=<id> --status=done
```

---

## Project Goals and Success Criteria

### Phase 1 Goals
- Professional landing page with lead capture
- Full visual/animation strategy implemented
- Lighthouse score ≥90 (performance, accessibility, best practices)
- All Core Web Vitals in "good" range
- Mobile-first responsive design
- WCAG 2.1 AA compliance
- Infrastructure costs under $25/month

### Success Metrics
- **Performance:** Lighthouse score ≥90
- **Accessibility:** WCAG 2.1 AA compliant
- **Bundle Size:** Animation JavaScript ≤15 KB
- **Core Web Vitals:** All "good" thresholds met
- **User Experience:** Smooth animations at 60fps
- **Trust Indicators:** Professional, subtle motion builds confidence

---

_This handoff document provides complete context for continuing the Texas Five Fueling landing page project with Task Master AI._

