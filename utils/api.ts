import qs from 'qs'

type SlugArray = {
  slug: string | string[] | null | undefined
}
// Thanks to Strapi for making the API requests ugly.
// The encodeValuesOnly parameter prettify the url.
const getGlobalDataQuery = (locale: string) => {
  return qs.stringify(
    {
      locale: locale,
      populate: {
        notificationBanner: {
          populate: '*',
        },
        metadata: {
          populate: {
            shareImage: {
              populate: '*',
            },
          },
        },
        navbar: {
          populate: {
            logo: {
              populate: '*',
            },
            links: {
              populate: '*',
            },
            loginButton: {
              populate: '*',
            },
            searchBox: {
              populate: '*',
            },
          },
        },
        footer: {
          populate: {
            logo: {
              populate: '*',
            },
          },
        },
        favicon: {
          populate: '*',
        },
        localizations: {
          populate: '*',
        },
      },
      publicationState: 'live',
    },
    {
      encodeValuesOnly: true,
    }
  )
}

const getPageDataQuery = (
  home: string,
  pageSlug?: string | null | undefined,
  preview?: boolean | null
) => {
  return qs.stringify(
    {
      filters: {
        slug: {
          $eq: pageSlug || '',
        },
        shortName: {
          $eq: home,
        },
      },
      populate: {
        contentSections: {
          populate: '*',
        },
        metadata: {
          populate: {
            shareImage: {
              populate: '*',
            },
          },
        },
        localizations: {
          populate: '*',
        },
      },
      publicationState: preview ? 'preview' : 'live',
    },
    {
      encodeValuesOnly: true,
    }
  )
}

export function getStrapiURL(path: string): string {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string, options = {}) {
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_STRAPI_API_TOKEN}`,
    },
  }
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl, mergedOptions as RequestInit)

  if (!response.ok) {
    throw new Error(`${response.statusText} ${response.status}`)
  }
  const data = await response.json()
  return data.data
}

/**
 *
 * @param {object} params The router params object with slug: { slug: [<slug>] }
 * @param {string} locale The current locale specified in router.locale
 * @param {boolean} preview router isPreview value
 */
export async function getPageData(
  params: SlugArray,
  locale: string | undefined,
  preview: boolean | null
) {
  const home = locale === 'fr' ? 'Accueil' : 'Home'
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug
  // Find the pages that match this slug
  const pagesData = await fetchAPI(
    // If slug is not defined nor an Array of empty strign,
    // we should get the Homepage in an another way.
    // Thats why we use the shortName parameter to get the Homepage here.
    `/api/pages?filters${getPageDataQuery(home, slug, preview)}`
  )

  // Make sure we found something, otherwise return null
  if (pagesData === null || pagesData.length === 0) {
    return null
  }

  return pagesData[0]
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale = 'en' as string) {
  const global = await fetchAPI(`/api/global?${getGlobalDataQuery(locale)}`)
  return global
}
