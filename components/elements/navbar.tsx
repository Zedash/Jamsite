import type { Page, Global } from '@/types/api'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getButtonAppearance } from 'utils/button'
import { MdMenu } from 'react-icons/md'
import MobileNavMenu from './mobile-nav-menu'
import ButtonLink from './button-link'
import NextImage from './image'
import CustomLink from './custom-link'
import LocaleSwitch from '../locale-switch'

interface INavbarProps {
  navbar: Global['attributes']['navbar']
  pageContext: Page['attributes']
}

const Navbar = ({ navbar, pageContext }: INavbarProps): JSX.Element => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  return (
    <>
      {/* The actual navbar */}
      <nav className="border-gray border-b-2 py-6 sm:py-2">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="h-8 w-32">
                <NextImage
                  width={120}
                  height={33}
                  media={navbar.logo.picture.data.attributes}
                />
              </a>
            </Link>
            {/* List of links on desktop */}
            <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
              {navbar?.links?.map((navLink) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink} locale={router.locale}>
                    <div className="font-bold tracking-widest hover:text-gray-dark px-2 py-1 uppercase">
                      {navLink.text}
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            {/* Locale Switch Mobile */}
            {pageContext.localizedPaths && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block md:hidden"
            >
              <MdMenu className="h-8 w-auto" />
            </button>
            {/* CTA button on desktop */}
            {navbar?.loginButton && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.loginButton}
                  appearance={getButtonAppearance(
                    navbar.loginButton.type,
                    'light'
                  )}
                  compact
                />
              </div>
            )}
            {/* Locale Switch Desktop */}
            {pageContext.localizedPaths && (
              <div className="hidden md:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

export default Navbar
