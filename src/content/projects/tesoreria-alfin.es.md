---
locale: es
slug: tesoreria-alfin
name: Automatización de reportes regulatorios · Tesorería Alfin
client: Alfin Banco
role: Desarrollador Full Stack · Área de Tesorería
period: 2025-11 — Presente
summary: Herramienta en Python para automatizar la consolidación y validación de insumos de reportes regulatorios e internos de Tesorería, distribuida como ejecutable.
order: 2
featured: true
nda: true
stack:
  - Python
  - pandas
  - openpyxl
  - logging
  - Excel
  - Variables de entorno
  - Empaquetado ejecutable
metrics:
  - value: "97.5%"
    label: Reducción del tiempo del reporte
  - value: 2 h → 3 min
    label: Antes vs. después
  - value: "100%"
    label: Procesos con trazabilidad
images:
  - src: /images/projects/tesoreria-alfin.webp
    width: 1200
    height: 675
    alt: Automatización de reportes regulatorios · Tesorería Alfin
links: {}
---

Herramienta interna en Python (pandas, openpyxl, logging) para automatizar la consolidación y validación de insumos de los reportes regulatorios e internos de Tesorería que antes se ejecutaban manualmente sobre libros de Excel. El sistema valida los datos de entrada, genera los reportes exigidos y deja trazabilidad de cada ejecución.

El levantamiento de requerimientos se hizo directamente con el área usuaria de Tesorería, con manejo seguro de credenciales mediante variables de entorno y empaquetado como ejecutable distribuible al equipo.

El impacto se refleja en una reducción del tiempo de armado del reporte de ~2 horas a ~3 minutos (≈97.5%), liberando capacidad para tareas de mayor valor y eliminando una fuente recurrente de errores manuales.
