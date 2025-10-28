# Product Requirements Document: AWS SES Email Service Enhancement
## Task #30 Implementation PRD

**Project:** Texas Five Fueling Landing Page  
**Feature:** AWS SES Email Service Enhancement  
**Task ID:** 30  
**Assignee:** Amazon Q Developer  
**Priority:** High  
**Phase:** Phase 1  
**Timeline:** Current Sprint  

---

## 1. Executive Summary

This PRD outlines the requirements for enhancing the AWS Simple Email Service (SES) integration for lead notification emails in the Texas Five Fueling landing page. The goal is to implement robust email delivery with retry logic, comprehensive error handling, health monitoring, and production-ready reliability.

### Problem Statement

Currently, the landing page has basic AWS SES integration that works but lacks:
- Retry logic for transient failures
- Comprehensive error handling
- Monitoring and health checks
- Production-ready reliability

Lead submissions are successfully stored in Supabase, but email delivery failures could go unnoticed, leading to missed lead notifications.

### Solution Overview

Implement a production-grade AWS SES integration with:
1. Exponential backoff retry mechanism (3 attempts)
2. Comprehensive error handling for all SES error types
3. Health monitoring endpoint (`/api/health/ses`)
4. Improved email templates (HTML + plain text)
5. Detailed logging and debugging capabilities

### Success Criteria

- ✅ Email notifications successfully sent to `info@t5fueling.com`
- ✅ Retry logic handles transient failures automatically
- ✅ Health endpoint provides monitoring visibility
- ✅ Zero impact on existing lead storage functionality
- ✅ All tests passing with 100% coverage
- ✅ Production-ready for immediate deployment

---

## 2. Business Context

### Business Goals

1. **Reliability:** Ensure 100% of lead submissions trigger email notifications
2. **Monitoring:** Provide visibility into email delivery status
3. **User Experience:** Maintain fast response times even with retry logic
4. **Cost Optimization:** Efficient SES usage without quota wastage

### User Stories

**As a business owner**, I want to receive email notifications for every lead submission, so I can follow up with potential customers quickly.

**As a developer**, I want health monitoring for the email service, so I can proactively identify and resolve delivery issues.

**As a customer**, I want fast form submission, so my experience isn't impacted by email sending retries.

### Key Metrics

- **Email Delivery Rate:** ≥99.9%
- **Retry Success Rate:** ≥95% for transient failures
- **API Response Time:** <500ms (p95)
- **Email Send Latency:** <2s (excluding retries)
- **Health Endpoint Availability:** 100%

---

## 3. Technical Requirements

### 3.1 Core Functionality

#### Email Notification System

**Primary Flow:**
```
Lead Submission → Store in Supabase → Send Email (with retry) → Return Success
```

**Fail-Safe Behavior:**
- Lead storage must succeed before email attempt
- Email failure does NOT fail the API request
- Failed email attempts are logged for debugging
- User receives success response even if email fails

#### Retry Mechanism

**Requirements:**
- Maximum 3 retry attempts
- Exponential backoff: 1s → 2s → 4s
- Retry conditions:
  - ✅ Throttling errors (429)
  - ✅ Network timeouts
  - ✅ Transient failures
- Don't retry:
  - ❌ Configuration errors (MessageRejected)
  - ❌ Invalid credentials
  - ❌ Missing permissions

**Error Handling:**
```typescript
error.name === 'Throttling'           → Retry with backoff
error.name === 'MessageRejected'     → Fail fast
error.$metadata?.httpStatusCode === 429 → Retry with backoff
default                               → Retry with backoff (max 3 times)
```

#### Email Templates

**HTML Template Requirements:**
- Professional design with inline CSS
- Responsive for email clients
- Includes: company branding colors (#1a1a1a header)
- All lead data fields displayed
- Submission timestamp

**Plain Text Template Requirements:**
- ASCII-only content
- Clear field labels
- Line breaks for readability
- UTF-8 charset support

**Fields to Include:**
- Name (required)
- Company Name (optional)
- Email (required)
- Phone (required)
- Service Type (required)
- Location (required)
- Message (optional)
- Submission timestamp

#### Health Check Endpoint

**Requirements:**
- Endpoint: `GET /api/health/ses`
- Response format:
```json
{
  "status": "healthy" | "unhealthy",
  "quota": {
    "max24HourSend": number,
    "sentLast24Hours": number,
    "maxSendRate": number
  },
  "error": "Error message (only if unhealthy)"
}
```

**Status Determination:**
- ✅ `healthy`: Quota retrieved successfully
- ❌ `unhealthy`: Failed to retrieve quota (503 status)

---

### 3.2 Architecture Requirements

#### File Structure

```
lib/
├── aws-ses.ts                    # Enhanced with helpers
├── aws-ses-retry.ts             # NEW: Retry logic
└── aws-ses-setup.ts             # NEW: Verification utilities

app/api/
├── leads/
│   └── route.ts                 # Enhanced with retry
└── health/
    └── ses/
        └── route.ts             # NEW: Health endpoint
```

#### Module Responsibilities

**`lib/aws-ses.ts`:**
- SES client initialization
- Email template generation
- Core send functions
- Error types

**`lib/aws-ses-retry.ts`:**
- Exponential backoff logic
- Retry decision logic
- Error classification
- Logging and metrics

**`lib/aws-ses-setup.ts` (Optional):**
- Domain verification utilities
- Verification status checking
- Helper functions for AWS Console work

**`app/api/health/ses/route.ts`:**
- Quota retrieval
- Health status determination
- Error handling
- JSON response formatting

#### Integration Points

**With `/api/leads` endpoint:**
```typescript
// Enhanced flow
try {
  // Store lead in Supabase
  const { data } = await supabaseAdmin.from('lead_submissions').insert([...]);
  
  // Send email with retry logic
  await sendEmailWithRetry(() => sendNotificationEmail(leadData));
  
  return NextResponse.json({ success: true, id: data?.[0]?.id });
} catch (error) {
  // Email failure doesn't break the request
  console.error('Email error:', error);
  return NextResponse.json({ success: true, id: data?.[0]?.id }); // Still success
}
```

---

### 3.3 Performance Requirements

**Response Time:**
- API request latency: <500ms (p95)
- Email send time: <2s (excluding retries)
- Health check latency: <200ms (p95)

**Reliability:**
- Email delivery success rate: ≥99.9%
- Retry success rate: ≥95%
- Zero downtime for health checks

**Resource Usage:**
- Memory: Minimal overhead (<10MB)
- CPU: Efficient exponential backoff
- Network: Efficient retry attempts

---

### 3.4 Security Requirements

**AWS Credentials:**
- ✅ Never commit to Git (already enforced)
- ✅ Use environment variables only
- ✅ Rotate credentials regularly

**IAM Permissions:**
- Minimum required: `ses:SendEmail`, `ses:GetSendQuota`
- No admin-level permissions
- Least privilege principle

**Error Messages:**
- Never expose AWS credentials in errors
- Sanitize error messages for user visibility
- Detailed logs server-side only

---

## 4. User Experience

### 4.1 Lead Submission Experience

**Current Behavior:**
- User submits contact form
- Gets immediate success confirmation
- Does not know if email was sent

**Desired Behavior:**
- User submits contact form
- Gets immediate success confirmation
- Email delivery happens in background
- Lead notification arrives at `info@t5fueling.com`

**No Changes Required:** User experience remains the same

### 4.2 Administrator Experience

**Email Reception:**
- HTML email with professional design
- All lead details clearly displayed
- Reply-to set to lead's email
- Plain text fallback for email clients

**Monitoring:**
- Health endpoint accessible at `/api/health/ses`
- Real-time quota statistics
- CloudWatch metrics for failures

---

## 5. Implementation Plan

### Phase 1: Foundation (Subtasks 30.1-30.3)

**Duration:** 1-2 hours

1. **Install AWS SDK packages**
   - Run: `npm install @aws-sdk/client-ses @aws-sdk/credential-providers`
   - Verify in `package.json`
   - Test imports

2. **Verify AWS credentials**
   - Test SES client initialization
   - Use `GetAccountSendingEnabledCommand`
   - Confirm credentials working

3. **AWS Console setup** (Manual)
   - Verify domain in SES console
   - Verify sender email
   - Check sandbox status
   - Request production access if needed

**Deliverables:**
- ✅ AWS SDK installed
- ✅ Credentials verified
- ✅ AWS Console configured

---

### Phase 2: Core Implementation (Subtasks 30.4-30.5)

**Duration:** 2-3 hours

4. **Implement email templates**
   - Move template logic to `lib/aws-ses.ts`
   - Create `generateEmailTemplate()` function
   - Create `generatePlainTextEmail()` function
   - Add TypeScript types

5. **Add retry logic**
   - Create `lib/aws-ses-retry.ts`
   - Implement `sendEmailWithRetry()` function
   - Add exponential backoff
   - Add error classification
   - Integrate into `/api/leads` endpoint

**Deliverables:**
- ✅ Email templates modularized
- ✅ Retry logic working
- ✅ Enhanced `/api/leads` endpoint

---

### Phase 3: Monitoring (Subtask 30.6)

**Duration:** 1 hour

6. **Create health endpoint**
   - Create `app/api/health/ses/route.ts`
   - Implement GET handler
   - Use `GetSendQuotaCommand`
   - Add error handling
   - Return JSON response

**Deliverables:**
- ✅ Health endpoint functional
- ✅ Returns quota information
- ✅ Handles errors gracefully

---

### Phase 4: Testing & Validation

**Duration:** 2-3 hours

7. **Unit testing**
   - Test template generation
   - Test retry logic
   - Test health endpoint

8. **Integration testing**
   - Send test lead through form
   - Verify email received
   - Check retry logic with failures
   - Test health endpoint

9. **Manual testing**
   - Submit real lead through contact form
   - Verify email at `info@t5fueling.com`
   - Check health endpoint returns data
   - Monitor CloudWatch for metrics

**Deliverables:**
- ✅ All tests passing
- ✅ Manual testing successful
- ✅ Documentation complete

---

## 6. Test Strategy

### 6.1 Unit Tests

**File:** `lib/aws-ses-retry.test.ts`

```typescript
describe('sendEmailWithRetry', () => {
  it('retries on throttling errors', async () => {
    // Mock SES client to throw Throttling error
    // Verify retry attempts (max 3)
    // Check exponential backoff timing
  });
  
  it('fails fast on configuration errors', async () => {
    // Mock MessageRejected error
    // Verify no retries
    // Check error propagation
  });
  
  it('succeeds on second retry', async () => {
    // Mock first failure, second success
    // Verify success after retry
  });
});
```

**File:** `lib/aws-ses.test.ts`

```typescript
describe('Email Templates', () => {
  it('generates HTML email with all fields', () => {
    // Test with complete lead data
    // Verify all fields present
    // Check HTML structure
  });
  
  it('generates plain text email', () => {
    // Test plain text generation
    // Verify field formatting
  });
  
  it('handles optional fields gracefully', () => {
    // Test with missing optional fields
    // Verify no errors
  });
});
```

**File:** `app/api/health/ses/route.test.ts`

```typescript
describe('Health Endpoint', () => {
  it('returns healthy status with quota', async () => {
    // Mock successful quota retrieval
    // Verify JSON response
    // Check status code (200)
  });
  
  it('returns unhealthy status on error', async () => {
    // Mock SES client failure
    // Verify 503 status
    // Check error message
  });
});
```

---

### 6.2 Integration Tests

**Test Scenario:** Complete lead submission flow

```typescript
describe('Lead Submission with Email', () => {
  it('sends email successfully', async () => {
    // Submit lead through API
    // Mock SES success
    // Verify email sent
    // Check response success
  });
  
  it('retries on transient failure', async () => {
    // Submit lead
    // Mock first attempt failure (Throttling)
    // Verify retry logic triggered
    // Mock second attempt success
    // Verify eventual success
  });
  
  it('gracefully handles permanent failure', async () => {
    // Submit lead
    // Mock permanent failure (MessageRejected)
    // Verify lead still stored
    // Check API returns success
  });
});
```

---

### 6.3 Manual Testing

**Test Checklist:**

- [ ] Submit lead through contact form
- [ ] Verify email received at `info@t5fueling.com`
- [ ] Check HTML email renders correctly
- [ ] Check plain text fallback works
- [ ] Verify all lead data in email
- [ ] Test health endpoint: `GET /api/health/ses`
- [ ] Check CloudWatch metrics
- [ ] Monitor error logs

---

## 7. Deployment

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Zero linter errors
- [ ] AWS credentials configured in production
- [ ] Domain verified in SES console
- [ ] Production access approved (if in sandbox)
- [ ] Health endpoint tested
- [ ] Error logging verified

### Deployment Steps

1. **Code Review**
   - Create pull request
   - Get approval from team
   - Address any feedback

2. **Merge to Main**
   ```bash
   git checkout main
   git merge feature/task-30-aws-ses-enhancement
   git push origin main
   ```

3. **Vercel Deployment**
   - Automatic deployment triggers
   - Environment variables already configured
   - Verify deployment successful

4. **Post-Deployment Validation**
   - Test health endpoint in production
   - Submit test lead
   - Verify email received
   - Monitor CloudWatch for errors

### Rollback Plan

If issues occur:
1. Revert merge on GitHub
2. Vercel automatically redeploys
3. Previous version restores
4. No data loss (Supabase unaffected)

---

## 8. Monitoring & Maintenance

### Key Metrics to Monitor

**Email Delivery:**
- Success rate: ≥99.9%
- Failure rate by error type
- Retry success rate
- Average send latency

**System Health:**
- Health endpoint availability
- API response times
- Error log frequency

### CloudWatch Setup

**Recommended Alarms:**
1. **Email Failures:** Alert if failure rate > 1%
2. **Health Endpoint:** Alert if unavailable
3. **Retry Exhaustion:** Alert if all retries fail

**Dashboard:**
- Email send success rate
- Quota usage (24-hour)
- Error rate by type
- API latency

---

## 9. Success Criteria

### Must Achieve (P0)

- ✅ Email notifications sent reliably
- ✅ Retry logic functional
- ✅ Health endpoint working
- ✅ All subtasks completed
- ✅ All tests passing
- ✅ Zero linter errors

### Should Achieve (P1)

- ✅ Comprehensive error handling
- ✅ Detailed logging
- ✅ CloudWatch metrics
- ✅ Documentation complete

### Nice to Have (P2)

- CloudWatch alarms
- Email template improvements
- Analytics tracking

---

## 10. Timeline & Deliverables

### Estimated Timeline

- **Phase 1:** 1-2 hours (Foundation)
- **Phase 2:** 2-3 hours (Core Implementation)
- **Phase 3:** 1 hour (Monitoring)
- **Phase 4:** 2-3 hours (Testing)
- **Total:** 6-9 hours

### Deliverables

1. ✅ Enhanced `lib/aws-ses.ts`
2. ✅ New `lib/aws-ses-retry.ts`
3. ✅ New `app/api/health/ses/route.ts`
4. ✅ Updated `app/api/leads/route.ts`
5. ✅ Unit tests for all modules
6. ✅ Integration tests
7. ✅ Documentation
8. ✅ All subtasks marked complete in Task Master

---

## Appendices

### A. AWS SES Error Codes

**Retry:** Throttling, NetworkError, TimeoutError  
**Fail Fast:** MessageRejected, ConfigurationSetDoesNotExist, InvalidCredentials

### B. Email Template Fields

**Required:** Name, Email, Phone, Service Type, Location  
**Optional:** Company Name, Message  
**System:** Timestamp

### C. Environment Variables

- `AWS_REGION` (us-east-1)
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CONTACT_EMAIL` (info@t5fueling.com)

---

**END OF PRD**

This PRD provides complete requirements for Task #30 implementation. Follow the handoff document (`HANDOFF_AMAZON_Q_TASK30.md`) for step-by-step instructions.

