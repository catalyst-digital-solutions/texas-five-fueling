TL;DR
Build a Next.js 13+ landing page that looks premium but behaves conservatively. Use CSS-first animations, View Transitions API for routing, and Framer Motion (LazyMotion only) for a few targeted interactions (e.g., number counters). Avoid parallax and Lottie. Keep Lighthouse ≥90. Subtle motion = trust.
Why this works
Competitors are template-driven (Wix/WordPress/Squarespace) with minimal motion → easy visual win.
CSS + native APIs = zero bundle impact and best Core Web Vitals.
Scroll-triggered and micro-interaction animations lift conversions (forms, buttons, counters) when kept fast (200–400ms) and restrained.
Tech & performance stance
Use: CSS (0 KB), View Transitions (0 KB), Framer Motion via LazyMotion (≈2.6–10 KB) for counters/gestures.
Avoid: Lottie (≈82 KB, tanks scores), heavy GSAP usage (23 KB + license), parallax.
Respect prefers-reduced-motion and offer a site-wide “Reduce Motion” toggle (WCAG 2.1 AA).
Design system & content
Trend-aligned: modular components, #a81b1b-led palette with #333333/black accents, serif (headlines) + sans (body), full-width hero video (10–15s) with mobile static fallback.
Show real fleet/operations (no stock). Lead with 24/7 availability, certifications (DOT/EPA/FMCSA), and testimonials.
Above-the-fold must-have: <10-word value prop, clarifying subhead, high-contrast primary CTA, trust badges/logos.
Competitor takeaways
Best messaging: Booster.
Best social proof: Fuel Logic.
Big miss: Bay Oil—great heritage, dated Wix.
Nobody is using modern, performance-aware motion well → differentiation gap.
Animation rules (keep it professional)
Durations: 200–400ms (micro 100–200ms; counters 1.5–2.5s). Ease-out.
Trigger reveals at 50–70% viewport, once, not on primary body copy.
Do: button hovers, form validation, number counters, skeleton loaders.
Don’t: parallax, bounce/elastic, flashy effects.
Implementation roadmap (practical)
Phase 1 (Week 1):
Button hover/click states, inline form validation, in-button loading, skeletons, number counters (years, gallons, customers), reduced-motion support.
Phase 2:
Scroll-reveals (short/faint), SVG service-area map (expand radius + city pins), CTA success states, simple hero fade-in (headline → sub → CTA with 100ms stagger).
Phase 3:
Testimonial carousel (optional), process/timeline reveals, service card hovers.
KPIs & tests
Track conversion rate (quote/contact), form completion, time on page, bounce, INP/CLS/LCP. A/B test: counters vs static, scroll-reveal vs static, validation timing, button hover vs none.
Bottom line
Ship a CSS-first, motion-light Next.js page with a few high-leverage Framer Motion touches, real photography, strong testimonials, and a service map. You’ll outclass competitors immediately without sacrificing performance or professionalism.
