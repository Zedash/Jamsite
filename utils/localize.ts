import { Page } from '@/types/api'
import { fetchAPI } from './api'

export async function getLocalizedPage(
  targetLocale: string,
  pageContext: Page['attributes']
): Promise<Page['attributes']> {
  const localization = pageContext.localizations.data?.find(
    (localize) => localize.attributes.locale === targetLocale
  )
  const apiPath = `/api/pages/${localization?.id}?populate=*`
  const localePage = await fetchAPI(apiPath)
  return localePage
}

export function localizePath(page: Page['attributes']) {
  const { locale, defaultLocale, slug } = page

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/${slug || ''}`
  }

  // The slug should have a localePrefix
  return `/${locale}/${slug || ''}`
}

export async function getLocalizedPaths(pageContext: Page['attributes']) {
  const paths = []

  for (const locale of pageContext.locales) {
    if (locale !== pageContext.locale) {
      const localizePage = await getLocalizedPage(locale, pageContext)
      paths.push({
        locale,
        href: localizePath({ ...localizePage, locale }),
      })
    }
  }

  paths.push({
    locale: pageContext.locale,
    href: localizePath({ ...pageContext, locale: pageContext.locale }),
  })

  return paths
}
