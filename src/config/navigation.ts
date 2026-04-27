export interface NavLink {
  href: string
  label: string
  icon: string
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/kanban', label: 'Kanban Comercial', icon: 'Columns2' },
  { href: '/copiloto', label: 'Copiloto IA', icon: 'MessageSquare' },
  { href: '/sala-de-guerra', label: 'Sala de Guerra', icon: 'Swords' },
]
