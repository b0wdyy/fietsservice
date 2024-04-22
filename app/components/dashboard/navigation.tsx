import { cn } from '@/lib/utils'
import { DashboardIcon, GearIcon } from '@radix-ui/react-icons'
import { NavLink } from '@remix-run/react'

export function Navigation() {
    return (
        <div className="fixed top-0 flex h-screen w-48 flex-col gap-8 pt-8 shadow-md shadow-zinc-400">
            <NavigationItem href="invoices" text="Facturen" icon={<DashboardIcon />} />
            <NavigationItem href="config" text="Configuratie" icon={<GearIcon />} />
        </div>
    )
}

type NavigationItemProps = {
    text: string
    icon: React.ReactElement
    href: string
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ text, href, icon }) => {
    const defaultClasses = ['flex', 'items-center', 'gap-8', 'px-4', 'py-2']

    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                isActive
                    ? cn(...defaultClasses, 'bg-zinc-100', 'text-zinc-600', 'font-bold')
                    : cn(...defaultClasses)
            }
        >
            {icon}
            <span>{text}</span>
        </NavLink>
    )
}
