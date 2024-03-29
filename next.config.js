/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs')
const path = require('path')

const nextWebpackPluginOptions = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
  },
  images: {
    domains: ['pulic.your-domain.com', 'assets.your-domain.com'],
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
  nextWebpackPluginOptions,
  sentryWebpackPluginOptions
)
