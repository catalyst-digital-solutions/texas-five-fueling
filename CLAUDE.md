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
