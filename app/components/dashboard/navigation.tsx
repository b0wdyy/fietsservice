import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DashboardIcon, GearIcon, PersonIcon } from '@radix-ui/react-icons'
import { Link, NavLink } from '@remix-run/react'

export function Navigation() {
    return (
        <div className="fixed top-0 hidden h-screen w-48 flex-col justify-between pt-8 shadow-md shadow-zinc-400 md:flex">
            <div className="flex-col gap-8 md:flex">
                <NavigationItem href="invoices" text="Facturen" icon={<DashboardIcon />} />
                <NavigationItem href="config" text="Configuratie" icon={<GearIcon />} />
                <NavigationItem href="users" text="Gebruikers" icon={<PersonIcon />} />
            </div>

            <div className="flex flex-col items-center justify-center pb-8">
                <Button asChild className="mb-4">
                    <Link to="/new">Nieuw factuur</Link>
                </Button>

                <span className="block">© {new Date().getFullYear()}</span>
            </div>
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
