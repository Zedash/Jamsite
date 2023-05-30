import type { AppProps, AppContext } from 'next/app'
import type { Global } from '@/types/api'
import App from 'next/app'
import Head from 'next/head'
import ErrorPage from 'next/error'
import { DefaultSeo } from 'next-seo'
import { getStrapiMedia } from 'utils/media'
import { getGlobalData } from 'utils/api'
import '@/styles/globals.scss'

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  // Extract the data we need
  const { global }: { global: Global['attributes'] } = pageProps
  if (!global) {
    return <ErrorPage statusCode={404} />
  }

  const { metadata, favicon } = global

  return (
    <>
      {/* Favicon */}
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(favicon.data.attributes.url)}
        />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${metadata.metaTitleSuffix}`}
        title="Page"
        description={metadata.metaDescription}
        openGraph={{
          images: Object.values(
            metadata.shareImage.data.attributes.formats
          ).map((image) => {
            return {
              url: getStrapiMedia(image.url),
              width: image.width,
              height: image.height,
            }
          }),
        }}
        twitter={{
          cardType: metadata?.twitterCardType,
          handle: metadata?.twitterUsername,
        }}
      />
      {/* Display the content */}
      <Component {...pageProps} />
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
CustomApp.getInitialProps = async (appContext: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const globalLocale = await getGlobalData(appContext.router.locale)

  return {
    ...appProps,
    pageProps: {
      global: globalLocale,
    },
  }
}

export default CustomApp
