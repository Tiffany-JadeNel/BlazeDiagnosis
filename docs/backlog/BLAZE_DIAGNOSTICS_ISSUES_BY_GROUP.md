# Blaze Diagnostics Issues by Group

Use this document to preload GitHub issues or assign work to interns.

## Labels To Use

- `software-engineering-1`
- `software-engineering-2`
- `software-development-1`
- `software-development-2`
- `cloud-administration`
- `cyber-security`
- `training`
- `starter-task`
- `frontend`
- `backend`
- `database`
- `security`
- `documentation`
- `needs-review`

---

# Software Engineering 1 Issues

## Issue: Map the Blaze Diagnostics domain entities

### Goal
Identify the main business entities used by the system.

### Checklist

- List users, workshops, customers, vehicles, job cards, quotes, parts, invoices, notifications, and activity logs.
- Explain what each entity stores.
- Identify basic relationships.
- Add questions where relationships are unclear.

## Issue: Review job status workflow

### Goal
Review the suggested job statuses and explain what each one means.

### Checklist

- Define each status in simple language.
- Identify which statuses are customer-facing.
- Identify which statuses should trigger notifications.
- Identify which roles should be able to update each status.

---

# Software Engineering 2 Issues

## Issue: Review database schema gaps

### Goal
Compare the current schema notes with the MVP user stories.

### Checklist

- Identify missing tables.
- Identify missing relationships.
- Identify missing enums.
- Identify audit/logging requirements.
- Flag Prisma vs Drizzle decision points.

## Issue: Draft API contract for job cards

### Goal
Define the expected API behaviour for job card creation, update, and status changes.

### Checklist

- Define create job request fields.
- Define update job request fields.
- Define status update request fields.
- Define expected success responses.
- Define expected error responses.

---

# Software Development 1 Issues

## Issue: Create status badge component

### Goal
Create a simple reusable UI badge for job statuses.

### Checklist

- Create a component file.
- Accept a status value as a prop.
- Display readable label text.
- Use Tailwind CSS classes.
- Add a short note explaining how it works.

## Issue: Improve empty state for a list page

### Goal
Make a list page easier to understand when there is no data.

### Checklist

- Choose a list page.
- Add a clear empty state message.
- Add a simple action prompt if appropriate.
- Keep styling consistent.

---

# Software Development 2 Issues

## Issue: Trace customer feature data flow

### Goal
Document how the customer feature is structured from page to API wrapper.

### Checklist

- Identify the page file.
- Identify the component file.
- Identify the API wrapper.
- Identify the types file.
- Explain the flow in a short markdown note.

## Issue: Build vehicle details starter section

### Goal
Create or improve a vehicle details section.

### Checklist

- Display make, model, year, registration, VIN, mileage, and linked customer.
- Use existing types if available.
- Keep layout readable.
- Add a related job cards placeholder.

---

# Cloud Administration Issues

## Issue: Create local setup checklist

### Goal
Create a repeatable setup checklist for interns and mentors.

### Checklist

- List required tools.
- List required environment files.
- Explain how to start local services.
- Explain common setup problems.
- Do not include real secrets.

## Issue: Draft deployment readiness checklist

### Goal
Prepare an early checklist for future deployment.

### Checklist

- Identify frontend hosting needs.
- Identify backend hosting needs.
- Identify database hosting needs.
- Identify required environment variables.
- Identify backup requirements.
- Identify logging and monitoring needs.

---

# Cyber Security Issues

## Issue: Review customer tracking access risk

### Goal
Identify risks if customers access job tracking pages online.

### Checklist

- Identify what data customers should see.
- Identify what data customers should not see.
- Consider link sharing risk.
- Consider expired access links.
- Consider authorization checks.
- Document recommendations.

## Issue: Repository secret hygiene review

### Goal
Check that the repository is safe for student collaboration.

### Checklist

- Confirm `.env` is ignored.
- Confirm `.env.example` uses placeholders only.
- Check that no keys or passwords are committed.
- Check that docs warn students about secrets.
- Document findings.
