export interface NavItem {
    label: string;
    href: string;
}

export const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Profile', href: '/profile' },
    { label: 'Services', href: '/services' },
    { label: 'Rental', href: '/rental' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact', href: '/contact' },
];
