import type { Page } from '@/types/api'
import { useEffect, useState, useRef, SetStateAction, LegacyRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Cookies from 'js-cookie'
import { MdExpandMore } from 'react-icons/md'
import WorldIcon from './icons/world'

import { useOnClickOutside } from '../utils/hooks'
import { getLocalizedPage, localizePath } from '@/utils/localize'

const LocaleSwitch = ({ pageContext }: { pageContext: Page['attributes'] }) => {
  const isMounted = useRef(false)
  const select = useRef()
  const router = useRouter()
  const [locale, setLocale] = useState()
  const [showing, setShowing] = useState(false)

  const handleLocaleChange = async (selectedLocale: string): Promise<void> => {
    // Persist the user's language preference
    // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
    Cookies.set('NEXT_LOCALE', selectedLocale)
    setLocale(selectedLocale as unknown as SetStateAction<undefined>)
  }

  const handleLocaleChangeRef = useRef(handleLocaleChange)
  useOnClickOutside(select, () => setShowing(false))

  useEffect(() => {
    const localeCookie = Cookies.get('NEXT_LOCALE')
    if (!localeCookie) {
      handleLocaleChangeRef.current(router.locale as string)
    }

    const checkLocaleMismatch = async () => {
      if (
        !isMounted.current &&
        localeCookie &&
        localeCookie !== pageContext.locale
      ) {
        // Redirect to locale page if locale mismatch
        const localePage = await getLocalizedPage(localeCookie, pageContext)

        router.push(
          `${localizePath({ ...pageContext, ...localePage })}`,
          `${localizePath({ ...pageContext, ...localePage })}`,
          { locale: localePage.locale }
        )
      }
      setShowing(false)
    }

    const localeToSet = localeCookie || router.locale

    setLocale(localeToSet as unknown as SetStateAction<undefined>)
    checkLocaleMismatch()

    return () => {
      isMounted.current = true
    }
  }, [locale, router, pageContext])

  return (
    <div
      ref={select as unknown as LegacyRef<HTMLDivElement>}
      className="relative ml-4 "
    >
      <button
        type="button"
        className="hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600 focus:outline-none flex items-center justify-between px-2 py-2 cursor-pointer h-full rounded-md w-20"
        onClick={() => setShowing(!showing)}
      >
        <WorldIcon />
        <span className="capitalize">{locale}</span>
        <MdExpandMore className="ml-1 text-primary-600" />
      </button>
      <div
        className={`w-full bg-white p-1 mt-1 shadow-lg rounded-md ${
          showing ? 'absolute' : 'hidden'
        }`}
      >
        {pageContext.localizedPaths &&
          pageContext.localizedPaths.map(({ href, locale }) => {
            return (
              <Link href={href} key={locale} locale={locale} passHref>
                <p
                  onClick={() => handleLocaleChange(locale)}
                  className="capitalize hover:bg-primary-5 cursor-pointer p-2 rounded-md text-center hover:text-primary-600"
                >
                  {locale}
                </p>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default LocaleSwitch
