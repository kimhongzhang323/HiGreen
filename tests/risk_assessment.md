# System Risk Assessment

## Executive Summary
The current HiGreen application utilizes a mock-data architecture suitable for rapid prototyping and MVP demonstration. However, transition to production requires addressing several high-priority risks.

## 1. Security Risks
| Risk | Severity | Description | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Hardcoded Credentials** | **Critical** | Admin and user passwords ('123') are visible in source code. | Implement environment variables (`.env`) and hash passwords using `bcrypt`. |
| **No Authentication Token** | High | Current login returns a static string instead of a valid JWT signed by a private key. | Implement proper `jsonwebtoken` signing with expiration and refresh tokens. |
| **HTTP Communication** | Medium | API calls are over HTTP, susceptible to interception. | Enforce HTTPS/TLS for all API traffic in production. |

## 2. Data Integrity & Storage
| Risk | Severity | Description | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **In-Memory Storage** | **Critical** | All data (new reports, points) is lost when the server restarts. | Connect to a persistent database like MongoDB or PostgreSQL. |
| **No Data Validation** | High | API accepts any payload, risking database corruption or injection attacks. | Use libraries like `joi` or `express-validator` to sanitize inputs. |

## 3. Scalability & Performance
| Risk | Severity | Description | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Monolithic Structure** | Low | Current structure is simple but may grow unwieldy. | Adopt MVC pattern strictly. Consider microservices if features expand significantly. |
| **Asset Loading** | Medium | Images are loaded from external URLs or local assets without caching strategy. | Implement CDN/caching headers for static assets. |

## Conclusion
The application is functionally complete for demonstration ("Pro" UI, correct flows). Immediate next steps for production readiness are **Database Integration** and **Security Hardening**.
