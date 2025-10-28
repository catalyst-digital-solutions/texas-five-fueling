# Handoff Document for Amazon Q Developer
## Task #30: AWS SES Email Service Setup and Configuration

**Project:** Texas Five Fueling Landing Page  
**Assignee:** Amazon Q Developer  
**Task:** #30 - AWS SES Email Service Setup and Configuration  
**Priority:** High  
**Estimated Complexity:** 7/10  
**Timeline:** Implement within current Phase 1 sprint  

---

## Executive Summary

You are tasked with completing **Task #30: AWS SES Email Service Setup and Configuration** for the Texas Five Fueling landing page project. This task involves implementing AWS Simple Email Service (SES) integration to send email notifications when lead submissions are received through the contact form.

**Key Deliverables:**
1. Install AWS SDK packages
2. Create email service module with retry logic
3. Add comprehensive error handling
4. Create health check endpoint
5. Integrate with existing `/api/leads` endpoint
6. Implement all 6 subtasks from Task Master

**Critical Success Criteria:**
- AWS SES integration functional and tested
- Email notifications sent reliably to `info@t5fueling.com`
- Error handling with exponential backoff retry logic
- Health monitoring endpoint created
- All tests passing
- Zero linter errors

---

## Project Context

### What We're Building

Texas Five Fueling is a commercial diesel delivery service in Houston, TX. We're building a professional landing page with lead capture functionality. The contact form (`components/sections/ContactForm.tsx`) submits lead data to `/api/leads`, which stores it in Supabase and sends email notifications.

**Current Status:**
- Landing page built (Tasks 1-13 complete)
- Contact form implemented (Task 13 complete)
- Lead submission API endpoint created (Task 14)
- Supabase database configured (Task 3)
- Currently using AWS SES basic integration (needs enhancement)

**What's Missing:**
- Proper retry logic for SES failures
- Comprehensive error handling
- Health check endpoint for SES monitoring
- Better email templates
- Documentation for AWS setup

### Why Amazon Q Developer

According to project rules (see `.cursor/rules/aws_work.mdc`), AWS implementations should be handled by Amazon Q Developer for better best practices and architecture guidance. This task involves AWS SES, making it perfect for your expertise.

---

## Repository Information

**GitHub Repository:**  
```
https://github.com/catalyst-digital-solutions/texas-five-fueling.git
```

**Current Branch:** `main`  
**Local Path:** `/Users/Mario/Documents/aaa-catalyst-digital-solutions/aaa-client-projects/Texas 5 Fueling - Antonio Ramirez, Miguel Abudd, Paul Mendoza/website/texasfivefueling.com`

**Clone Command:**
```bash
git clone https://github.com/catalyst-digital-solutions/texas-five-fueling.git
cd texas-five-fueling
```

---

## Key Project Files

### Already Implemented (DO NOT MODIFY WITHOUT COORDINATION)

1. **Contact Form** - `components/sections/ContactForm.tsx`
   - Already implemented with validation
   - Submits to `/api/leads` endpoint
   - Working and functional

2. **Lead Submission API** - `app/api/leads/route.ts`
   - Currently stores leads in Supabase
   - Has basic AWS SES integration
   - **YOUR TASK:** Enhance the SES implementation here

3. **AWS SES Client** - `lib/aws-ses.ts`
   - Basic client configuration exists
   - **YOUR TASK:** This is where you'll add retry logic and helpers

4. **Environment Variables** - `lib/env.ts`
   - Already configured with AWS credentials
   - **NEEDS:** AWS credentials are in `.env` file (NOT .env.local or .env.example)

### Files You Need to Create

Create these new files as specified in the subtasks:

1. **`lib/aws-ses-retry.ts`** (NEW)
   - Exponential backoff retry logic
   - Error handling for different SES error types
   - Logging and metrics

2. **`lib/aws-ses-setup.ts`** (NEW - Optional)
   - Domain verification utilities
   - Verification status checking

3. **`app/api/health/ses/route.ts`** (NEW)
   - Health check endpoint
   - SES quota monitoring
   - Returns quota statistics

### Files You Need to Modify

1. **`app/api/leads/route.ts`**
   - Enhance with retry logic
   - Better error messages
   - Improved email templates

2. **`lib/aws-ses.ts`**
   - Add helper functions
   - Email template generation functions

---

## Task Master Details

### Task #30 Specifications

**Task ID:** 30  
**Title:** AWS SES Email Service Setup and Configuration  
**Status:** Pending → In Progress  
**Priority:** High  
**Dependencies:** Task 2 (already complete)  
**Complexity Score:** 7/10  
**Recommended Subtasks:** 6

**Full Task Details:**
```json
{
  "id": 30,
  "title": "AWS SES Email Service Setup and Configuration",
  "description": "Configure AWS Simple Email Service (SES) for sending lead notification emails, including SDK installation, IAM credentials setup, domain configuration, and implementation of email sending functionality with proper error handling.",
  "status": "pending",
  "dependencies": [2],
  "priority": "high",
  "complexityScore": 7,
  "recommendedSubtasks": 6
}
```

### Subtasks Breakdown

#### Subtask 30.1: Install AWS SDK and Configure Dependencies
**Status:** Pending  
**Dependencies:** None  
**Description:** Install `@aws-sdk/client-ses` and `@aws-sdk/credential-providers`

**Action Items:**
- Run `npm install @aws-sdk/client-ses @aws-sdk/credential-providers`
- Verify in `package.json`
- Document versions in `package-lock.json`

**Test Strategy:** Import modules successfully in a test file

---

#### Subtask 30.2: Set Up IAM User and Configure AWS Credentials
**Status:** Pending  
**Dependencies:** Subtask 30.1  
**Description:** AWS credentials are already configured in `.env` file

**Important Notes:**
- **CRITICAL:** The `.env` file already contains AWS credentials
- **DO NOT** modify the `.env` file
- Credentials are already working for basic SES sending
- You have access to these environment variables:
  - `AWS_REGION` (us-east-1)
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

**Action Items:**
- Verify credentials work with `GetAccountSendingEnabledCommand`
- Test SES client initialization
- Document configuration (no changes to `.env` needed)

---

#### Subtask 30.3: Verify Domain and Email Addresses in SES Console
**Status:** Pending (Manual AWS Console Work Required)  
**Dependencies:** Subtask 30.2  
**Description:** Verify `texasfivefueling.com` domain in AWS SES

**Action Items:**
1. Check if domain is already verified in SES console
2. If not verified, initiate verification
3. Add DNS records to domain DNS settings
4. Verify sender email: `no-reply@t5fueling.com`
5. Verify recipient: `info@t5fueling.com`
6. Check if account is in sandbox mode

**Test Strategy:** Send test email to verify working

**Manual Steps Required:**
- Access AWS SES Console
- Navigate to Verified identities
- Add domain: `texasfivefueling.com`
- Add email: `no-reply@t5fueling.com`
- Request production access if in sandbox mode

---

#### Subtask 30.4: Implement Core Email Sending Module
**Status:** Pending  
**Dependencies:** Subtask 30.3  
**Description:** Create main SES module with templates

**Current State:**  
The file `lib/aws-ses.ts` exists with basic client setup. The `app/api/leads/route.ts` has inline email generation.

**Action Items:**
1. Move email template generation to `lib/aws-ses.ts`
2. Create `generateEmailTemplate(leadData)` function
3. Create `generatePlainTextEmail(leadData)` function
4. Create `sendNotificationEmail(leadData)` function
5. Add proper TypeScript types for lead data
6. Update `/api/leads/route.ts` to use new functions

**Test Strategy:**
- Test with sample lead data
- Verify HTML and text templates render correctly
- Test with missing optional fields

---

#### Subtask 30.5: Add Retry Logic and Error Handling
**Status:** Pending  
**Dependencies:** Subtask 30.4  
**Description:** Implement exponential backoff for SES failures

**Action Items:**
1. Create new file: `lib/aws-ses-retry.ts`
2. Implement `sendEmailWithRetry()` function:
   - Maximum 3 retries
   - Exponential backoff (1s, 2s, 4s delays)
   - Handle throttling errors (429 status code)
   - Don't retry configuration errors
   - Add detailed logging
3. Handle specific SES error types:
   - `Throttling` → retry with backoff
   - `MessageRejected` → fail fast
   - `ConfigurationSetDoesNotExist` → fail fast
4. Integrate retry logic into `/api/leads` endpoint

**Test Strategy:**
- Simulate failures to test retry logic
- Verify exponential backoff timing
- Test different error scenarios

---

#### Subtask 30.6: Create Health Check Endpoint
**Status:** Pending  
**Dependencies:** Subtask 30.5  
**Description:** Create `/api/health/ses` endpoint

**Action Items:**
1. Create `app/api/health/ses/route.ts`
2. Implement GET handler
3. Use `GetSendQuotaCommand` to retrieve quota stats
4. Return structured JSON:
   ```json
   {
     "status": "healthy" | "unhealthy",
     "quota": {
       "max24HourSend": number,
       "sentLast24Hours": number,
       "maxSendRate": number
     }
   }
   ```
5. Return 503 status for unhealthy state
6. Add error handling

**Test Strategy:**
- Test endpoint returns correct status codes
- Verify quota information accuracy
- Test with SES service outages

---

## Implementation Requirements

### Technical Requirements

**Must-Have Features:**
1. ✅ Retry logic with exponential backoff (3 attempts max)
2. ✅ Comprehensive error handling for all SES error types
3. ✅ HTML and plain text email templates
4. ✅ Health check endpoint for monitoring
5. ✅ Proper logging for debugging
6. ✅ Graceful degradation (email failure doesn't break lead storage)

**Code Quality Standards:**
- TypeScript with strict mode
- Zero linter errors (run `npm run lint` before committing)
- Proper error messages
- Comprehensive inline documentation
- Follow existing code style patterns

### AWS Best Practices

**IAM Security:**
- Use least privilege IAM policy
- Never commit credentials to Git (already done - credentials in `.env` only)
- Rotate credentials regularly

**SES Configuration:**
- Verify domain before production use
- Request production access if in sandbox mode
- Monitor sending quota
- Set up CloudWatch alarms for failures

**Error Handling:**
- Retry transient failures (Throttling, network errors)
- Fail fast on configuration errors
- Log all failures for debugging
- Never fail the API request if email fails (lead is already stored)

---

## Integration Points

### Current Lead Submission Flow

```
User fills form
    ↓
ContactForm.tsx
    ↓
POST /api/leads
    ↓
[Storage] → Supabase (lead_submissions table) ✅ Working
    ↓
[Email] → AWS SES → info@t5fueling.com ✅ Basic integration working
```

### Enhanced Flow (Your Implementation)

```
User fills form
    ↓
ContactForm.tsx
    ↓
POST /api/leads
    ↓
[Storage] → Supabase (lead_submissions table) ✅ Working
    ↓
[Email] → AWS SES with retry logic ← YOUR TASK
    ↓
[On failure] → Exponential backoff retry (3 attempts)
    ↓
[Logs] → Console + monitoring
```

### Files to Coordinate

**You must work with:**
- `app/api/leads/route.ts` - Enhance existing integration
- `lib/aws-ses.ts` - Add helper functions
- `.env` file - Credentials already present (DO NOT MODIFY)

**Do not modify:**
- `components/sections/ContactForm.tsx` - Contact form UI
- `lib/supabase.ts` - Supabase client
- `lib/env.ts` - Environment variable validation

---

## Testing Requirements

### Unit Tests

Create test files for:
1. `lib/aws-ses.test.ts` - Email template generation
2. `lib/aws-ses-retry.test.ts` - Retry logic
3. `app/api/health/ses/route.test.ts` - Health endpoint

### Integration Tests

1. **Email Sending Test:**
   - Send test email with mock lead data
   - Verify email received at `info@t5fueling.com`
   - Check HTML template renders correctly
   - Check plain text fallback works

2. **Retry Logic Test:**
   - Temporarily use invalid credentials
   - Verify retry mechanism works
   - Check exponential backoff timing
   - Verify logs show retry attempts

3. **Health Check Test:**
   - Hit `/api/health/ses` endpoint
   - Verify returns quota information
   - Test with invalid credentials (returns 503)

4. **Error Handling Test:**
   - Test throttling error handling
   - Test configuration errors (fail fast)
   - Test network errors (retry)

### Manual Testing Checklist

- [ ] Send test lead through contact form
- [ ] Verify email received at `info@t5fueling.com`
- [ ] Check email HTML renders correctly
- [ ] Verify plain text version works
- [ ] Test health endpoint returns quota
- [ ] Monitor CloudWatch for SES metrics
- [ ] Check error logs for any issues

---

## Environment Variables

### Already Configured

The following AWS credentials are **already in `.env` file**:

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<already configured>
AWS_SECRET_ACCESS_KEY=<already configured>
CONTACT_EMAIL=info@t5fueling.com
```

**IMPORTANT:**  
- Do NOT modify the `.env` file
- Do NOT create `.env.local` or `.env.example`
- Credentials are working for basic SES sending
- You have read-only access to these variables

### What You Need to Set Up in AWS Console

1. **Domain Verification:**
   - Domain: `texasfivefueling.com`
   - Add TXT record to DNS
   - Wait for verification (can take 72 hours)

2. **Email Verification:**
   - Sender: `no-reply@t5fueling.com`
   - Recipient: `info@t5fueling.com`

3. **Production Access (if in sandbox):**
   - Request production access from SES console
   - Fill out use case form
   - Wait for approval (24-48 hours)

---

## Success Criteria

### Must Achieve

1. ✅ AWS SES integration functional
2. ✅ Retry logic working with exponential backoff
3. ✅ Health check endpoint created and working
4. ✅ All subtasks completed
5. ✅ All tests passing
6. ✅ Zero linter errors
7. ✅ Email notifications received at `info@t5fueling.com`
8. ✅ Lead storage still works if email fails

### Nice to Have

1. CloudWatch alarms for SES failures
2. Email template improvements (branding)
3. Analytics tracking for email sends
4. Rate limiting protection

---

## Task Master Commands

### Updating Task Status

As you complete each subtask:

```bash
# Mark subtask as in progress
npx task-master-ai set-status --id=30.1 --status=in-progress

# Mark subtask as done
npx task-master-ai set-status --id=30.1 --status=done

# Update main task when all subtasks complete
npx task-master-ai set-status --id=30 --status=done
```

### Logging Progress

Use the update-subtask command to log your implementation notes:

```bash
npx task-master-ai update-subtask --id=30.1 --prompt="AWS SDK packages installed successfully. Verified imports work. No version conflicts detected."
```

---

## Git Workflow

### Before Starting

```bash
# Ensure you're on the latest main branch
git checkout main
git pull origin main
```

### During Implementation

```bash
# Create a feature branch for Task 30
git checkout -b feature/task-30-aws-ses-enhancement

# Make changes and commit frequently
git add .
git commit -m "Subtask 30.1: Install AWS SDK packages"

# Push to remote
git push origin feature/task-30-aws-ses-enhancement
```

### Before Merging

```bash
# Rebase on latest main
git checkout main
git pull origin main
git checkout feature/task-30-aws-ses-enhancement
git rebase main

# Push rebased branch
git push origin feature/task-30-aws-ses-enhancement --force-with-lease
```

### Commit Messages

Use this format for commits:

```
Task 30.X: <Subtask Title>

- Details of what was implemented
- Key technical decisions
- Any important notes

Example:
Task 30.1: Install AWS SDK and configure dependencies

- Installed @aws-sdk/client-ses and @aws-sdk/credential-providers
- Verified no version conflicts with existing dependencies
- Updated package.json and package-lock.json
```

---

## Questions or Issues?

### If You Need Help

1. Check existing documentation in `README.md`
2. Review `HANDOFF.md` for project context
3. Consult Task Master AI for task details
4. Check `VISUAL-STRATEGY-FOR-TEXAS-FIVE-FUELING-LANDING-PAGE.md` for design guidance

### Critical Reminders

⚠️ **DO NOT:**
- Modify the `.env` file (credentials already working)
- Change ContactForm.tsx (working perfectly)
- Modify Supabase integration (working perfectly)
- Remove existing functionality

✅ **DO:**
- Enhance existing AWS SES integration
- Add retry logic and error handling
- Create health check endpoint
- Write comprehensive tests
- Document your implementation
- Follow project code style

---

## Success Metrics

Upon completion, you should have:

1. ✅ Enhanced `lib/aws-ses.ts` with helper functions
2. ✅ New `lib/aws-ses-retry.ts` with retry logic
3. ✅ New `app/api/health/ses/route.ts` health endpoint
4. ✅ Updated `app/api/leads/route.ts` with retry logic
5. ✅ All 6 subtasks marked as done in Task Master
6. ✅ Test emails successfully received
7. ✅ Health endpoint returning quota information
8. ✅ All code committed and pushed to GitHub
9. ✅ Pull request created for review

**Target Date:** Complete within current development sprint

---

**Good luck with Task #30! You've got this! 🚀**

