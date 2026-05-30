---
locale: en
slug: tesoreria-alfin
name: Regulatory-report automation · Alfin Treasury
client: Alfin Banco
role: Full Stack Developer · Treasury area
period: 2025-11 — Present
summary: Python tool that automates the consolidation and validation of inputs for Treasury's regulatory and internal reports, distributed as an executable.
order: 2
featured: true
nda: true
stack:
  - Python
  - pandas
  - openpyxl
  - logging
  - Excel
  - Environment variables
  - Executable packaging
metrics:
  - value: "97.5%"
    label: Report-time reduction
  - value: 2 h → 3 min
    label: Before vs. after
  - value: "100%"
    label: Processes with traceability
images:
  - src: /images/projects/tesoreria-alfin.webp
    width: 1200
    height: 675
    alt: Regulatory-report automation · Alfin Treasury
links: {}
---

Internal Python tool (pandas, openpyxl, logging) that automates the consolidation and validation of inputs for Treasury's regulatory and internal reports, previously executed manually on Excel workbooks. The system validates input data, generates the required reports, and records full traceability of each run.

Requirements were gathered directly with Treasury's business area, with secure credential handling via environment variables and packaging as a distributable executable for the team.

Impact: report-preparation time reduced from ~2 hours to ~3 minutes (≈97.5%), freeing team capacity for higher-value work and removing a recurring source of manual errors.
