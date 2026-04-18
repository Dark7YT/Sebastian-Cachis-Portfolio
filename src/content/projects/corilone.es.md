---
locale: es
slug: corilone
name: CorilOne — Coril AM & Altum MFO
client: Grupo Coril
role: Desarrollador Full Stack · Arquitectura DDD/CQRS
period: 2025-09 — Presente
summary: Plataforma corporativa para gestión y visualización de portafolios Multi-Family Office, con foco en posiciones consolidadas, crecimiento histórico y analítica de inversiones.
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
    label: Arquitectura aplicada
  - value: Event-driven
    label: Integración entre bounded contexts
  - value: Multi-tenant
    label: Soporte Coril AM + Altum MFO
images:
  - src: /images/projects/corilone.webp
    alt: CorilOne — plataforma Coril AM & Altum MFO
links: {}
---

Participación en el diseño e implementación de módulos críticos de CorilOne, plataforma corporativa del Grupo Coril que integra la operación de Coril Asset Management y Altum Multi-Family Office. El sistema consolida portafolios, visualiza posiciones y reporta crecimiento histórico para clientes institucionales y familias de alto patrimonio.

El desarrollo se estructura con Domain-Driven Design y CQRS, separando lectura y escritura, con comunicación asíncrona entre servicios vía Kafka y RabbitMQ. Los entregables combinan backend en Spring Boot (Java 17/21), frontend en Next.js 16 y almacenamiento de activos en AWS S3, todo orquestado con Docker.
