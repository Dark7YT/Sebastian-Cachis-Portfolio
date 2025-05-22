// src/constants/navigation.ts
export interface NavLink {
  labelKey: string; // Clave para i18n
  href: string;     // Para el ancla #section-id
  id: string;       // Para asociar con la sección (scroll spy)
}

export const NAV_LINKS: NavLink[] = [
  { labelKey: 'navbar_home', href: '#home', id: 'home' },
  { labelKey: 'navbar_about', href: '#about', id: 'about' },
  { labelKey: 'navbar_projects', href: '#projects', id: 'projects' },
  { labelKey: 'navbar_skills', href: '#skills', id: 'skills' },
  { labelKey: 'navbar_experience', href: '#experience', id: 'experience' },
  { labelKey: 'navbar_education', href: '#education', id: 'education' },
  { labelKey: 'navbar_contact', href: '#contact', id: 'contact' },
];
