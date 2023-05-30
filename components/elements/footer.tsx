import type { Global } from '@/types/api'
import NextImage from './image'
import CustomLink from './custom-link'

interface IFooterProps {
  footer: Global['attributes']['footer']
}

const Footer = ({ footer }: IFooterProps) => {
  return (
    <footer className="bg-gray-dark min-h-112 py-8 text-sm">
      <div className="container flex flex-col lg:flex-row lg:justify-between">
        <div>
          {footer.logo && (
            <NextImage
              height={33}
              media={footer.logo.picture.data.attributes}
              width={120}
            />
          )}
        </div>
        <nav className="flex flex-wrap flex-row lg:gap-20 items-start lg:justify-end mb-10">
          {footer.columns?.map((footerColumn) => (
            <div
              key={footerColumn.id}
              className="mt-10 lg:mt-0 w-6/12 lg:w-auto"
            >
              <p className="uppercase tracking-wide font-semibold">
                {footerColumn.title}
              </p>
              <ul className="mt-2">
                {footerColumn.links?.map((link) => (
                  <li
                    key={link.id}
                    className="text-gray py-1 px-1 -mx-1 hover:text-gray-900"
                  >
                    <CustomLink link={link}>{link.text}</CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="text-sm py-6 text-gray">
        <div className="xl:container lg:px-4 flex">
          <div className="flex-initial">
            <ul className="flex">
              <li className="pr-4">Mentions légales</li>
              <li className="pr-4">CGUV</li>
              <li>Politiques sur les cookies</li>
            </ul>
          </div>
          <div className="flex-1 text-center">
            JameSite™ © {new Date().getFullYear()}. {footer.smallText}
          </div>
          <div className="flex-1 text-right text-white font-black uppercase">
            France - € - EUR
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
