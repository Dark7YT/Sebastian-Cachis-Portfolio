import { Home, User, Briefcase, Wrench, Award, GraduationCap, MessageSquare } from 'lucide-react'; // O los iconos que elijas
import { type LucideIcon } from 'lucide-react';

export interface NavLink {
  labelKey: string;
  href: string;
  id: string;
  icon: LucideIcon; 
}

export const NAV_LINKS: NavLink[] = [
  { labelKey: 'navbar_home', href: '#home', id: 'home', icon: Home },
  { labelKey: 'navbar_about', href: '#about', id: 'about', icon: User },
  { labelKey: 'navbar_projects', href: '#projects', id: 'projects', icon: Briefcase },
  { labelKey: 'navbar_skills', href: '#skills', id: 'skills', icon: Wrench },
  { labelKey: 'navbar_experience', href: '#experience', id: 'experience', icon: Award }, // Podría ser Briefcase o similar también
  { labelKey: 'navbar_education', href: '#education', id: 'education', icon: GraduationCap },
  { labelKey: 'navbar_contact', href: '#contact', id: 'contact', icon: MessageSquare },
];