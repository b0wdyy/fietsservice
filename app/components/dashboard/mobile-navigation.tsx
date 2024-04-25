import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Cross2Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import { Link } from '@remix-run/react'

const menuItems = [
    { text: 'Facturen', href: 'invoices' },
    { text: 'Configuratie', href: 'config' },
]

export const MobileNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const timeline = useRef<gsap.core.Timeline | null>(null)
    const menuContainerRef = useRef<HTMLDivElement | null>(null)
    useGSAP(
        () => {
            gsap.set('.mobile-nav-menu__link', {
                y: 75,
            })
            timeline.current = gsap
                .timeline({ paused: true })
                .to(menuContainerRef.current, {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    duration: 0.3,
                    ease: 'power2.inOut',
                })
                .to('.mobile-nav-menu__link', {
                    y: 0,
                    duration: 1,
                    ease: 'power4.inOut',
                    stagger: 0.1,
                    delay: -0.75,
                })
        },
        { scope: menuContainerRef }
    )

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    useEffect(() => {
        if (isMenuOpen) {
            timeline.current?.play()
        } else {
            timeline.current?.reverse()
        }
    }, [isMenuOpen])

    return (
        <div className="relative z-20 md:hidden">
            {/* Menu trigger */}
            <Button
                onClick={toggleMenu}
                variant="default"
                className="fixed right-8 top-8 z-20 h-12 w-12 rounded-full"
            >
                {isMenuOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
            </Button>

            {/* Actual menu */}
            <div
                ref={menuContainerRef}
                className="mobile-nav-menu fixed inset-0 grid place-items-center bg-primary"
            >
                <div className="flex flex-col gap-12 text-center uppercase tracking-wider">
                    {menuItems.map((item) => (
                        <div key={item.href} className="mobile-nav-menu__link overflow-hidden">
                            <Link
                                onClick={toggleMenu}
                                className="block text-xl font-light tracking-widest text-primary-foreground"
                                to={item.href}
                            >
                                {item.text}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
