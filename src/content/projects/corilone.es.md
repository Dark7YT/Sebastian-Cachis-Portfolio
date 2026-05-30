---
locale: es
slug: corilone
name: CorilOne — Plataforma Coril AM & Altum MFO
client: Grupo Coril
role: Desarrollador Full Stack · Arquitectura DDD/CQRS/Hexagonal
period: 2025-09 — Presente
summary: Plataforma corporativa de gestión y visualización de portafolios para asesores financieros y clientes Multi-Family Office, en producción controlada. Backend Java 17/21 + Spring Boot 3.x como monolito modular bajo DDD, CQRS y arquitectura hexagonal.
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
    label: Endpoints REST seguros
  - value: 5s → <1s
    label: Consulta de posiciones históricas
  - value: 6 contexts
    label: DDD bounded contexts
images:
  - src: /images/projects/corilone.webp
    width: 1200
    height: 675
    alt: CorilOne — plataforma Coril AM & Altum MFO
links: {}
---

Participación en el diseño arquitectónico y desarrollo end-to-end de CorilOne, plataforma corporativa del Grupo Coril que sirve a Coril Asset Management y a soluciones Multi-Family Office Altum. El sistema consolida portafolios, visualiza posiciones y reporta crecimiento histórico para asesores financieros y clientes institucionales.

El backend se estructura como un monolito modular en Java 17/21 con Spring Boot 3.x bajo DDD, CQRS y arquitectura hexagonal, con bounded contexts separados para IAM, Clientes, Portafolios, Ingesta de archivos, Reporting y Auditoría. Las APIs REST aplican Spring Security + JWT con refresh tokens y roles ADMIN/CLIENT.

PostgreSQL modelado con Flyway, índices compuestos y DTO projections (~30 tablas, consulta de posiciones históricas reducida de ~5s a <1s). Frontend en Next.js 16 con TypeScript, Tailwind, shadcn/ui, TanStack Query y Recharts para dashboards financieros. AWS S3 para carga masiva, RabbitMQ para procesamiento asíncrono y Testcontainers + GitHub Actions para testing y CI/CD.
