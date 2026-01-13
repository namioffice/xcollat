export type NavLink = {
  label: string;
  href: string;
  id: number;
};

export const navLinks: NavLink[] = [
  {
    id: 1,
    label: "About",
    href: "/about",
  },
  {
    id: 2,
    label: "Analytics",
    href: "/analytics",
  },
  {
    id: 3,
    label: "Contact",
    href: "/contact",
  },
  {
    id: 4,
    label: "Login",
    href: "/login",
  },
];
