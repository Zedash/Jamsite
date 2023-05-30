import type { Global } from '@/types/api'
import type { SetStateAction } from 'react'
import { MdClose, MdChevronRight } from 'react-icons/md'
import { useLockBodyScroll } from 'utils/hooks'
import { getButtonAppearance } from 'utils/button'
import ButtonLink from './button-link'
import NextImage from './image'
import CustomLink from './custom-link'

interface IMobileNavMenuProps {
  navbar: Global['attributes']['navbar']
  closeSelf: (value: SetStateAction<boolean>) => void
}

const MobileNavMenu = ({
  navbar,
  closeSelf,
}: IMobileNavMenuProps): JSX.Element => {
  // Prevent window scroll while mobile nav menu is open
  useLockBodyScroll()

  return (
    <div className="w-screen h-screen fixed top-0 left-0 overflow-y-scroll bg-white z-10 pb-6">
      <div className="container h-full flex flex-col justify-between">
        {/* Top section */}
        <div className="flex flex-row justify-between py-2 items-center">
          {/* Company logo */}
          <NextImage
            width={120}
            height={33}
            media={navbar.logo.picture.data.attributes}
          />
          {/* Close button */}
          <button onClick={() => closeSelf} className="py-1 px-1">
            <MdClose className="h-8 w-auto" />
          </button>
        </div>
        {/* Bottom section */}
        <div className="flex flex-col justify-end w-9/12 mx-auto">
          <ul className="flex flex-col list-none gap-6 items-baseline text-xl mb-10">
            {navbar.links?.map((navLink) => (
              <li key={navLink.id} className="block w-full">
                <CustomLink link={navLink}>
                  <div className="hover:text-gray-900 py-6 flex flex-row justify-between items-center">
                    <span>{navLink.text}</span>
                    <MdChevronRight className="h-8 w-auto" />
                  </div>
                </CustomLink>
              </li>
            ))}
          </ul>
          <ButtonLink
            button={navbar.loginButton}
            appearance={getButtonAppearance(navbar.loginButton.type, 'light')}
          />
        </div>
      </div>
    </div>
  )
}

export default MobileNavMenu
