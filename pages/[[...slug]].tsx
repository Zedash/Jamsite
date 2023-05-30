import type { GetStaticProps, GetStaticPaths } from 'next'
import type { Global, Page } from '@/types/api'
import type { UserProps } from '@/types/auth'
import type { OfferProps } from '@/types/ads'
import ErrorPage from 'next/error'
import { getPageData, fetchAPI, getGlobalData } from 'utils/api'
import { authService } from 'services/auth.service'
import { adsService } from 'services/ads.service'
import Sections from '@/components/sections'
import Seo from '@/components/elements/seo'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import { getLocalizedPaths } from '@/utils/localize'

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

interface DynamicPageProps {
  hits: {
    ads: {
      offers: Array<OfferProps>
    }
  }
  sections: Page['attributes']['contentSections']
  metadata: Global['attributes']['metadata']
  preview: boolean
  global: Global['attributes']
  pageContext: Page['attributes']
}

const DynamicPage = ({
  hits,
  sections,
  metadata,
  preview,
  global,
  pageContext,
}: DynamicPageProps): JSX.Element => {
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />
      {/* Display content sections */}
      <Sections sections={sections} preview={preview} hits={hits} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const locales = context.locales || ['en', 'fr']
  // Get all pages from Strapi
  const allPages = locales.map(async (locale: string) => {
    const apiPath = `/api/pages?_locale=${locale}&populate=*`
    const localePages = await fetchAPI(apiPath)
    return localePages
  })

  const pages = await (await Promise.all(allPages)).flat()

  const paths = pages.map((page) => {
    const { slug } = page.attributes
    // Decompose the slug that was saved in Strapi
    const slugArray = !slug ? false : slug.split('/')

    return {
      params: { slug: slugArray },
      // Specify the locale to render
      locale: page.locale,
    }
  })

  return { paths, fallback: true }
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async (context) => {
  const { params, locale, locales, defaultLocale, preview = null } = context
  const { API_USER, API_PWD } = process.env

  // Get token to fetch all routes from our API
  const user = (await authService.login(
    API_USER as string,
    API_PWD as string
  )) as UserProps

  // Fetch data used by our components
  const offers = (await adsService.getAllOffers(
    user.token
  )) as Array<OfferProps>

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData(
    { slug: !params?.slug ? [''] : params.slug },
    locale,
    preview
  )

  if (pageData === null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { contentSections, metadata, localizations, slug } = pageData.attributes

  const pageContext = {
    locale: pageData.attributes.locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = await getLocalizedPaths(
    pageContext as Page['attributes']
  )

  return {
    props: {
      hits: {
        ads: {
          offers,
        },
      },
      preview,
      sections: contentSections,
      metadata,
      global: globalLocale.attributes,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicPage
