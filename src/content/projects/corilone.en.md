---
locale: en
slug: corilone
name: CorilOne — Coril AM & Altum MFO
client: Grupo Coril
role: Full Stack Developer · DDD/CQRS Architecture
period: 2025-09 — Present
summary: Corporate platform for Multi-Family Office portfolio management and visualization, focused on consolidated positions, historical growth, and investment analytics.
order: 1
featured: true
nda: true
stack:
  - Java 17/21
  - Spring Boot 3
  - Next.js 16
  - PostgreSQL
  - Kafka
  - RabbitMQ
  - AWS S3
  - Docker
metrics:
  - value: DDD + CQRS
    label: Applied architecture
  - value: Event-driven
    label: Integration across bounded contexts
  - value: Multi-tenant
    label: Coril AM + Altum MFO support
images: []
links: {}
---

Contributor to the design and implementation of critical modules of CorilOne, Grupo Coril's corporate platform that integrates the operation of Coril Asset Management and Altum Multi-Family Office. The system consolidates portfolios, visualizes positions, and reports historical growth for institutional clients and high-net-worth families.

Development is structured with Domain-Driven Design and CQRS, splitting reads from writes, with asynchronous inter-service communication via Kafka and RabbitMQ. Deliverables combine a Spring Boot backend (Java 17/21), a Next.js 16 frontend, and asset storage on AWS S3, all orchestrated with Docker.
