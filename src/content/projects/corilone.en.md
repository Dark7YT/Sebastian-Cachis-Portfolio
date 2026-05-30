---
locale: en
slug: corilone
name: CorilOne — Coril AM & Altum MFO Platform
client: Grupo Coril
role: Full Stack Developer · DDD/CQRS/Hexagonal Architecture
period: 2025-09 — Present
summary: Corporate platform for portfolio management and visualization, used by financial advisors and Multi-Family Office clients, in controlled production. Backend in Java 17/21 + Spring Boot 3.x as a modular monolith following DDD, CQRS, and hexagonal architecture.
order: 1
featured: true
nda: true
stack:
  - Java 17/21
  - Spring Boot 3.x
  - Spring Security
  - Spring Data JPA
  - JWT
  - PostgreSQL
  - Flyway
  - Next.js 16
  - TypeScript
  - shadcn/ui
  - TanStack Query
  - Recharts
  - RabbitMQ
  - AWS S3
  - Docker
  - GitHub Actions
metrics:
  - value: "~40–60"
    label: Secure REST endpoints
  - value: 5s → <1s
    label: Historical-positions query
  - value: 6 contexts
    label: DDD bounded contexts
images:
  - src: /images/projects/corilone.webp
    width: 1200
    height: 675
    alt: CorilOne — Coril AM & Altum MFO platform screenshot
links: {}
---

Contributor to the architectural design and end-to-end development of CorilOne, Grupo Coril's corporate platform that serves Coril Asset Management and Altum Multi-Family Office solutions. The system consolidates portfolios, visualizes positions, and reports historical growth for financial advisors and institutional clients.

The backend is a modular monolith in Java 17/21 with Spring Boot 3.x following DDD, CQRS, and hexagonal architecture, with separate bounded contexts for IAM, Clients, Portfolios, File Ingestion, Reporting, and Audit. REST APIs apply Spring Security + JWT with refresh tokens and ADMIN/CLIENT roles.

PostgreSQL modeled with Flyway, composite indexes, and DTO projections (~30 tables, historical-positions query reduced from ~5s to under 1s). Frontend in Next.js 16 with TypeScript, Tailwind, shadcn/ui, TanStack Query, and Recharts for financial dashboards. AWS S3 for bulk uploads, RabbitMQ for asynchronous processing, and Testcontainers + GitHub Actions for testing and CI/CD.
