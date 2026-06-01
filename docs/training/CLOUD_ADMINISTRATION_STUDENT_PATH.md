# Cloud Administration Learning Path

## Primary Goal

Support the Blaze Diagnostics project by helping with local environment setup, deployment preparation, CI/CD documentation, backups, monitoring, and operational readiness.

## Study Focus

- GitHub repository workflow
- Environment variables and secret management
- Docker and docker-compose basics
- PostgreSQL local services
- Redis/local service awareness
- GitHub Actions basics
- CI/CD concepts
- Deployment environments: development, staging, production
- Backup and restore planning
- Logging and monitoring basics
- Release checklists

## Start With

1. `.env.example`
2. `backend/.env.example`
3. `frontend/.env.example`
4. `docker-compose.yml`
5. `.github/`
6. `docs/security/STUDENT_SECURITY_RULES.md`

## Suitable Starter Tasks

- Create a local setup checklist.
- Document required environment variables.
- Check that `.env` files are ignored.
- Review Docker service requirements.
- Draft a deployment environment checklist.
- Draft a database backup and restore plan.
- Review GitHub Actions or CI placeholder.
- Create a release checklist for mentors to review.

## Important Security Rule

Cloud Administration students must be especially careful with secrets. Never commit actual passwords, tokens, API keys, production URLs, private SSH keys, or database credentials.
