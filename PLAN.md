# Affable - Maintenance & Property Health Platform

> A companion product for Hospitable: Smart Maintenance Issue Tracking with Property Health Intelligence

---

## The Problem

Property managers lose thousands to reactive maintenance. Issues go unreported, small problems become expensive repairs, and teams waste hours coordinating through scattered channels. Hospitable has basic "issue alerts" but no comprehensive maintenance lifecycle.

**Pain points:**
- Issues discovered late (during guest check-in)
- No visibility into property health trends
- Team coordination through WhatsApp/spreadsheets
- No cost tracking per property
- Reactive instead of predictive maintenance

---

## The Solution

**Affable** is a maintenance operations platform that:
1. **Catches issues early** with systematic tracking
2. **Scores property health** to prioritize attention
3. **Automates team coordination** via intelligent queues
4. **Tracks real costs** to inform decisions

---

## Domain Model

### Aggregates

```
Property (Root)
├── PropertyId
├── Name, Address
├── Rooms[] (Room entity)
├── HealthScore (value object)
└── IssueCount

Issue (Root)
├── IssueId
├── PropertyId (reference)
├── RoomId (reference)
├── Category: IssueCategory enum
├── Severity: Severity enum
├── Status: IssueStatus enum
├── Title, Description
├── Photos[]
├── ReportedBy: TeamMemberId
├── AssignedTo: TeamMemberId | null
├── EstimatedCost: Money | null
├── ActualCost: Money | null
├── ReportedAt, TargetResolutionAt
├── ResolvedAt | null
└── Notes[]

TeamMember (Root)
├── TeamMemberId
├── Name, Email, Phone
├── Skills: SkillSet[]
├── Availability: AvailabilityStatus
├── CurrentWorkload: int (issue count)
└── MaxCapacity: int
```

### Entities

```
Room
├── RoomId
├── Name (e.g., "Master Bedroom", "Kitchen")
├── Floor
└── Area: square feet
```

### Value Objects

```
HealthScore
├── Overall: int (0-100)
├── Factors: HealthFactor[]
└── LastCalculated: DateTime

Money
├── Amount: decimal
└── Currency: string

IssueCategory
├── Plumbing
├── Electrical
├── HVAC
├── Appliances
├── Furniture
├── Structural
├── Safety
└── Other

Severity
├── Critical (guest safety, blocks bookings)
├── High (major inconvenience)
├── Medium (minor inconvenience)
└── Low (cosmetic)

IssueStatus
├── Reported
├── Triaged
├── Assigned
├── InProgress
├── PendingApproval (cost threshold)
├── Resolved
└── Closed
```

---

## Domain Events

### Issue Lifecycle Events

```
IssueReported
├── issueId, propertyId, roomId
├── category, severity, title, description
├── photos[], reportedBy, reportedAt

IssueTriaged
├── issueId
├── category (may be refined)
├── severity (may be escalated/downgraded)
├── targetResolutionAt
├── triagedBy, triagedAt

IssueAssigned
├── issueId
├── assignedTo: teamMemberId
├── assignedBy, assignedAt

IssueWorkStarted
├── issueId
├── startedBy, startedAt

IssueCostEstimated
├── issueId
├── estimatedCost: Money
├── needsApproval: bool (if > threshold)

IssueCostApproved
├── issueId
├── approvedBy, approvedAt

IssueResolved
├── issueId
├── actualCost: Money
├── resolutionNotes
├── resolvedBy, resolvedAt

IssueClosed
├── issueId
├── closedBy, closedAt
```

### System Events (Queue-Driven)

```
IssueEscalated
├── issueId
├── reason: EscalationReason
├── escalatedAt

SLABreached
├── issueId
├── expectedResolutionAt
├── currentStatus
├── breachDuration

RecurringMaintenanceScheduled
├── propertyId
├── roomId
├── categoryId
├── scheduledAt
├── recurringRule (monthly, quarterly, annually)

PropertyHealthRecalculated
├── propertyId
├── newScore: HealthScore
├── previousScore
├── factors: HealthFactor[]
├── calculatedAt
```

### Integration Events (would emit to other systems)

```
MaintenanceCostRecorded
├── propertyId
├── issueId
├── amount
├── category
└── recordedAt

TeamWorkloadChanged
├── teamMemberId
├── previousWorkload
├── newWorkload
└── changedAt
```

---

## Queue System

### Queues

```
triage-queue
├── Priority: Severity (Critical > High > Medium > Low)
├── FIFO within priority
├── Workers: Triagers (senior staff)
└── Poll interval: 30 seconds

├── Message: IssueReported event
├── Processing: Classify severity, assign target date
└── Output: IssueTriaged event

assignment-queue
├── Priority: Severity + PropertyHealthScore (low health = higher)
├── Workers: Assignment Algorithm
└── Poll interval: 1 minute

├── Message: IssueTriaged event
├── Processing: Match skills to category, balance workload
└── Output: IssueAssigned event

escalation-queue
├── Delayed jobs (check every 4 hours)
├── Condition: Issue still in same status
└── Output: IssueEscalated event (notification to supervisor)

cost-approval-queue
├── Priority: FIFO
├── Condition: estimatedCost > threshold (e.g., $500)
└── Workers: Property Manager / Owner

├── Message: IssueCostEstimated (with needsApproval = true)
├── Processing: Manager reviews and approves/rejects
└── Output: IssueCostApproved event

health-score-queue
├── Scheduled: Daily recalculation per property
├── Batch processing: All properties
└── Output: PropertyHealthRecalculated events

recurring-maintenance-queue
├── Scheduled: Generate tasks per schedule
├── Types: Monthly (HVAC filter), Quarterly (deep clean), Annually (inspect)
└── Output: RecurringMaintenanceScheduled → creates ProactiveIssue
```

### Queue Flow Diagram

```
┌─────────────────┐
│ IssueReported   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  triage-queue   │────▶│   IssueTriaged   │
└─────────────────┘     └────────┬─────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌──────────────────┐
│ assignment-queue│────▶│   IssueAssigned   │
└─────────────────┘     └────────┬─────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
         ┌──────────────────┐      ┌─────────────────┐
         │ IssueCostEstimated│      │  escalation-queue│
         └────────┬─────────┘      │ (if overdue)    │
                  │                 └─────────────────┘
                  ▼
         ┌────────────────────┐    estimatedCost > $threshold ?
         │ cost-approval-queue│─────────────────────────────────┐
         │ (if > threshold)   │                                 │
         └────────┬───────────┘                                 │
                  │                                             │
                  ▼                                             │
         ┌──────────────────┐                                   │
         │ IssueCostApproved│◀──────────────────────────────────┘
         └────────┬─────────┘         (or auto-approve if < threshold)
                  │
                  ▼
         ┌──────────────────┐
         │ IssueResolved    │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐     ┌───────────────────────┐
         │ PropertyHealth   │────▶│ health-score-queue    │
         │ Recalculated     │     │ (async recalculation) │
         └──────────────────┘     └───────────────────────┘
```

---

## Application Features

### Core Features (MVP)

1. **Issue Dashboard**
   - List all issues with filters (status, severity, property, category)
   - Visual priority matrix (Critical-High issues in red zone)
   - Quick stats: Open, In Progress, Overdue counts

2. **Property Health Overview**
   - Card per property with health score (0-100)
   - Color-coded: Green (80+), Yellow (60-79), Red (<60)
   - Click to drill into property details

3. **Issue Reporting**
   - Simple form: Property → Room → Category → Severity
   - Photo upload (up to 5 photos)
   - Description with markdown support
   - Estimated resolution date auto-suggested

4. **Issue Workflow**
   - Status progression with clear actions
   - Add notes at any stage
   - Assignment to team members
   - Cost tracking (estimated vs actual)

5. **Team Management**
   - Add team members with skills
   - View current workload per person
   - Set availability (available, on vacation, etc.)

### Wow Features (The Impressive Parts)

6. **Smart Assignment Algorithm**
   - Auto-assign based on: Skills match + Workload balance + Proximity
   - Explain WHY assigned (e.g., "Assigned to Maria: Expert in HVAC, has 2 active issues (below capacity of 5)")

7. **Property Health Intelligence**
   - Score formula: Base score - (Issue penalty) + (Resolution bonus)
   - Factors breakdown: "Kitchen docked 15 points for unresolved plumbing issue"
   - Trend visualization: Health over time

8. **SLA Tracking**
   - Target resolution times by severity
   - Visual countdown on each issue
   - Auto-escalation when approaching breach

9. **Cost Analytics**
   - Total maintenance spend per property
   - Spend by category (where's money going?)
   - Comparison: This quarter vs last quarter

10. **Responsive Timeline**
    - Visual timeline per issue: Reported → Triaged → Assigned → Resolved
    - Duration at each stage
    - Who did what and when

### Nice-to-Have (If Time Permits)

11. **Recurring Maintenance**
    - Schedule quarterly deep cleans
    - Annual HVAC inspections
    - Auto-create issues when due

12. **Photo Annotations**
    - Draw on photos (arrows, circles)
    - Highlight problem areas

13. **Mobile-First Reporting**
    - PWA for on-the-go issue creation
    - Camera integration

---

## User Roles

```
Admin
├── Full access to all features
├── Manage team members
├── Configure settings (SLA thresholds, cost thresholds)
└── View all analytics

Property Manager
├── View/edit all issues
├── Assign team members
├── Approve costs > threshold
├── View analytics for assigned properties
└── Manage properties

Team Member (Maintenance Staff)
├── View assigned issues
├── Update issue status
├── Add photos/notes
├── Mark resolved
└── View own workload
```

---

## Key Metrics to Show

1. **Mean Time to Resolution** (by severity)
2. **Property Health Score** (overall portfolio average)
3. **Cost per Property** (monthly, quarterly, yearly)
4. **Team Utilization** (% of capacity used)
5. **SLA Compliance Rate** (% resolved on time)

---

## Why This Impresses

1. **Domain Modeling Depth**
   - Clear aggregates with proper boundaries
   - Value objects for type safety
   - Domain events for decoupling
   - Shows DDD understanding

2. **Queue Architecture**
   - Real-world use of async processing
   - Escalation automation
   - Demonstrates scalable thinking

3. **Product Thinking**
   - Solves a real pain point
   - Health scores = value beyond just "ticket tracking"
   - SLA tracking = business alignment

4. **Clean Architecture**
   - Domain core with no external dependencies
   - Events drive everything
   - Testable business logic

5. **Complementary to Hospitable**
   - Doesn't compete, enhances
   - Addresses gap in their operations story
   - Shows market awareness

---

## Quick Build Strategy

### Phase 1: Core Domain (Day 1-2)
- Property, Issue, TeamMember models
- Basic CRUD for properties and team
- Issue creation (reported status only)

### Phase 2: Queue System (Day 2-3)
- Triage queue (manual triage UI)
- Assignment queue (smart assignment)
- Status transitions

### Phase 3: Dashboard & Scoring (Day 3-4)
- Property health scoring
- Issue dashboard with filters
- Team workload view

### Phase 4: Polish (Day 4-5)
- SLA tracking
- Cost tracking
- Timeline visualization
- Analytics charts

---

## Success Criteria

- [ ] Can report an issue with photos
- [ ] Issue goes through full workflow to resolution
- [ ] Health score recalculates on issue resolve
- [ ] Can see team workload balance
- [ ] Can track costs per property
- [ ] SLA breaches are visible
- [ ] Dashboard shows meaningful metrics