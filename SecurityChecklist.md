# Task 1 - Security checklist

# Blaze Diagnosis Cyber Security Checklist
```
Reviewer: 

Date:
```

```
Nr                       Security Check                                                          Yes/No                      Comments/Findings
```

## Login Risks

1. Are strong password requirements enforced (length, complexity, uniqueness)?
2. Passwords stored using secure hashing algorithms (bcrypt, Argon2, PBKDF2).
3. Is Multi-Factor Authentication (MFA) available or required?
4. Are login attempts limited to prevent brute-force attacks?
5. Are user sessions automatically timed out after inactivity?
6. Are account lockout mechanisms implemented after multiple failed login attempts?
7. Are secure protocols (HTTPS/TLS) used for login pages?
8. Secure password reset process.


## Role-Based Access Control (RBAC)

9. Are users assigned roles based on job responsibilities?
10. Are permissions restricted according to the principle of least privilege?
11. Can users access only the data and functions required for their role?
12. Are administrator privileges limited to authorized personnel?
13. Are role permissions reviewed regularly?
14. Principle of least privilege applied.


## Customer Data Exposure

15. Is sensitive customer data encrypted at rest?
16. Is sensitive customer data encrypted during transmission?
17. Are customer records protected from unauthorized access?
18. Is personal information masked when displayed where appropriate?
19. Are data exports restricted and monitored?
20. Are customer data retention and deletion policies implemented?
21. Data backups performed regularly.
22. Data retention and deletion policies defined.
23. No sensitive information exposed in logs.

## API Access Control

24. Are APIs protected with authentication mechanisms?
25. Are API authorization checks performed for every request?
26. Are API keys securely stored and managed?
27. Is rate limiting implemented to prevent abuse?
28. Are API requests and responses logged for auditing?
29. Are unused or deprecated API endpoints disabled?
30. API responses avoid revealing internal system details.

## Input Validation and Injection Prevention
31. Protection against SQL injection.
32. Protection against command injection.
33. Protection against Cross-Site Scripting (XSS).
34. Protection against Cross-Site Request Forgery (CSRF).
35. File uploads validated and restricted.
36. User input sanitized before processing.

## Password Handling

37. Are passwords hashed before storage?
38. Are strong hashing algorithms used (e.g., bcrypt, Argon2, PBKDF2)?
39. Are passwords never stored in plain text?
40. Are password reset processes secure and time-limited?
41. Are password change requests logged and monitored?

## Environment Variables

42. Are secrets stored in environment variables rather than source code?
43. Are production and development environments separated?
44. Is access to environment configuration restricted?
45. Are environment variables excluded from version control systems?
46. Are secrets rotated periodically?

## GitHub Secret Exposure

47. Are API keys, passwords, and tokens excluded from repositories?
48. Are .env files listed in .gitignore?
49. Is secret-scanning enabled for repositories?
50. Are pull requests reviewed for accidental secret exposure?
51. Have exposed secrets been revoked and replaced immediately?
52. Repository visibility reviewed (public/private).
53. Branch protection enabled.
54. Code reviews mandatory.
55. Dependabot enabled.
56. Push protection enabled.
57. GitHub Actions permissions restricted.
58. Personal Access Tokens use minimum required permissions.
59. Old tokens and keys revoked.
60. Contributors use MFA on GitHub accounts.
61. Audit logs reviewed periodically.

## Error Message Safety

62. Do error messages avoid revealing system details?
63. Are database errors hidden from end users?
64. Are stack traces disabled in production environments?
65. Are detailed error logs stored securely for administrators only?
66. Do user-facing error messages provide minimal information?
67. Are application logs monitored for suspicious activity?

## Dependency and Supply Chain Security

68. Third-party libraries kept up to date.
69. Dependencies scanned for vulnerabilities.
70. Unused packages removed.
71. Package versions pinned where appropriate.
72. Software Bill of Materials (SBOM) generated.
73. External packages obtained from trusted sources.
74. Build artifacts verified.

## Secure Coding Practices
75. Peer code reviews performed.
76. Static Application Security Testing (SAST) used.
77. Dynamic Application Security Testing (DAST) performed where applicable.
78. Security requirements included in development lifecycle.
79. OWASP Top 10 risks considered.
80. Secure coding standards documented.

## Overall Assessment
```
90–100%	Excellent security posture
75–89%	Good security posture with minor improvements needed
50–74%	Moderate risk – several areas require attention
Below 50%	High risk – immediate remediation recommended
```
Summary of Findings:


Recommended Actions:

```
Total Checks Passed: ______ / 80
Security Compliance Percentage: ______ %
```

# Security Risks and Mapping

## Authentication (Login / Register / Password Reset)
### Security Risks
- Weak password policies
- Brute-force login attacks
- Credential stuffing
- Session hijacking
- Insecure password reset flow
- Missing MFA

### Application Areas Affected
- Login page (frontend)
- Authentication API endpoints (backend)
- Session management system
- Password reset email service
- Identity provider (if used)

### Controls
- MFA enforced for admin users
- Rate limiting on login endpoints
- Secure session cookies (HttpOnly, Secure, SameSite)
- Token expiration + refresh handling
- Strong password hashing (Argon2/bcrypt)

## User Management & Role-Based Access Control (RBAC)
### Security Risks
- Privilege escalation (horizontal/vertical)
- Unauthorized access to admin features
- Broken access control (OWASP Top 10)
- Exposed admin endpoints

### Application Areas Affected
- User role tables (database)
- Admin dashboard
- Middleware / authorization layer
- API endpoint permission logic

### Controls
- Enforce RBAC in backend middleware
- Server-side authorization checks (never client-only)
- Principle of least privilege
- Separate admin/user endpoints

## Frontend (Web Application UI)
### Security Risks
- Cross-Site Scripting (XSS)
- CSRF attacks
- Sensitive data displayed in UI
- Insecure local storage usage (tokens in localStorage)

### Application Areas Affected
- Forms (input fields)
- JavaScript handling user input
- Client-side storage
- UI rendering of API responses

### Controls
- Input sanitization and output encoding
- CSRF tokens for form submissions
- Avoid storing JWTs in localStorage (prefer cookies)
- Content Security Policy (CSP)

## API Layer / Backend Services
### Security Risks
- Unauthorized API access
- Injection attacks (SQL/NoSQL/command)
- Broken object-level authorization (BOLA)
- Excessive data exposure
- Missing rate limiting

### Application Areas Affected
- REST/GraphQL endpoints
- Controllers/services layer
- API gateway (if used)
- Data serialization layer

### Controls
- Validate all inputs (server-side)
- Parameterized queries / ORM usage
- API authentication (JWT/OAuth2)
- Rate limiting per IP/user
- Field-level access control

## Database Layer
### Security Risks
- SQL injection
- Data leakage via overly broad queries
- Unencrypted sensitive data
- Excessive database permissions
- Backup exposure

### Application Areas Affected
- Database schema
- Query layer / ORM
- Database connection configuration
- Backup storage

### Controls
- Least-privilege DB users
- Encrypted data at rest
- Parameterized queries only
- Secure backups (encrypted + access controlled)

## Secrets & Configuration (Environment Variables)
### Security Risks
- Hardcoded secrets in code
- .env files pushed to GitHub
- Leaked API keys
- Exposed credentials in logs

### Application Areas Affected
- GitHub repository
- CI/CD pipelines
- Configuration files (config.js, .env)
- Logging system

### Controls
- GitHub Secret Scanning enabled
- Use GitHub Actions Secrets / vaults
- .gitignore properly configured
- Rotate exposed credentials immediately

## GitHub Repository & Source Control
### Security Risks
- Public repo exposing sensitive logic
- Leaked credentials in commits
- Malicious pull requests
- Weak branch protection
- Unauthorized merges

### Application Areas Affected
- GitHub repo settings
- Branch structure (main, dev)
- Pull request workflow
- Commit history

### Controls
- Branch protection rules (required reviews)
- CODEOWNERS enforcement
- Signed commits (optional but strong control)
- Secret scanning + Dependabot alerts
- Restrict force-pushes

## CI/CD Pipeline (GitHub Actions)
### Security Risks
- Secrets exposed in logs
- Over-permissive workflow permissions
- Malicious workflow injection
- Compromised build artifacts

### Application Areas Affected
- .github/workflows/
- Deployment scripts
- Build environment
- Release pipelines

### Controls
- Minimal GITHUB_TOKEN permissions
- Separate dev/staging/prod workflows
- Approved deployment gates
- No secrets printed in logs
- Signed build artifacts (optional advanced control)

## Dependencies & Third-Party Libraries
### Security Risks
- Vulnerable npm/pip packages
- Supply chain attacks
- Outdated libraries
- Malicious transitive dependencies

### Application Areas Affected
- package.json, requirements.txt
- Build system
- Dependency lock files

### Controls
- Dependabot alerts enabled
- Regular dependency updates
- Lockfile enforcement (package-lock.json)
- Vulnerability scanning (Snyk, GitHub Security)

## Logging & Error Handling
### Security Risks
- Sensitive data in logs
- Stack traces exposed to users
- Log injection attacks
- Missing audit trails

### Application Areas Affected
- Logging framework
- Error handlers (backend)
- Monitoring tools (e.g., dashboards)

### Controls
- Generic error messages for users
- Detailed logs only in secure environments
- Mask sensitive fields (passwords, tokens)
- Centralized logging system

## Deployment / Hosting Environment
### Security Risks
- Open ports/services
- Misconfigured cloud storage
- Exposed admin dashboards
- Weak firewall rules
- Unpatched servers

### Application Areas Affected
- Hosting platform (Azure/AWS/VPS)
- Web server (Nginx/Apache)
- Container configuration (Docker/K8s)

### Controls
- HTTPS enforced (TLS certificates)
- Firewall rules restricted
- Regular patching
- Container runs as non-root user
- Secrets injected at runtime only

## Monitoring & Incident Response
### Security Risks
- Undetected breaches
- No audit trail
- Delayed incident response
- Lack of anomaly detection

### Application Areas Affected
- Monitoring tools (logs/alerts)
- Admin dashboards
- Security alert systems

### Controls
- Audit logging enabled
- Alerting on suspicious activity
- Incident response plan documented
- Access logs reviewed regularly