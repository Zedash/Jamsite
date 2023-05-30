# JamSite NextJS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This frontend relies on Next's Static Generation using Strapi as the data source. Make sure Strapi is running in parallel when you run this app.

This project is designed for flexibility. Using it, we'll be able to manage our website content entirely in Strapi, and get a Next app automatically generated. Marketing teams will be able to create pages and design their layout without help from developers.

## 🌟Project features

- Code with [TypeScript](https://www.typescriptlang.org/)!
- Linting files with 😎[ESLint](https://eslint.org/)
- Formatting files with 💅[Prettier](https://prettier.io/)
- Linting, typechecking and formatting on commit using 🐺[husky](https://github.com/typicode/husky) hooks
- Pages creation within Strapi, no code necessary
- Fully flexible page structure: design the pages you want using UI Sections
- 8 UI Sections out of the box: Hero, RichText, LargeVideo, Testimonials, Pricing, BottomActions, FeatureRows, FeatureColumns
- Easy to theme with 🍸[TailwindCSS](https://tailwindcss.com/)
- Static site generation with Next.js (_Yes sir!_)
- An integrated Preview Mode, to view your pages on a private URL before publishing them😱
- Content in multiple languages using i18n

## Getting Started🚀

For the love of 🐼Pandas, use Yarn!

### Requirements

If you don't want to have a headache searching about what's going on with, be sure to have all of this:

- VSCode editor
- In-memory data structure store [Redis](https://redis.io/download) v6.2
- JS runtime [Node.js](https://nodejs.org/en/download/) >= v14.18.1
- Dependency management with [Yarn](https://yarnpkg.com/lang/en/) LTS
- MacOS, Windows (_including WSL2_), and Linux are supported

### Setup

First, create `.env.local` by copying the sample file and change env variables as per the [instructions](#environment-variables):

```console
 cp .env.example .env.local
```

#### Install it

```shell
# Obviously, the dependencies must be installed first.
$ yarn
yarn install v1.22.17
info No lockfile found.
[1/5] Validating package.json...
[2/5] Resolving packages...
warning danger > @babel/polyfill@7.12.1: 🚨 This package has been deprecated in favor of separate inclusion of a polyfill and regenerator-runtime (when needed). See the @babel/polyfill docs (https://babeljs.io/docs/en/babel-polyfill) for more information.
warning danger > @babel/polyfill > core-js@2.6.12: core-js@<3.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Please, upgrade your dependencies to the actual version of core-js.
warning danger > gitlab@10.2.1: The gitlab package has found a new home in the @gitbeaker organization. For the latest gitlab node library, check out @gitbeaker/node. A full list of the features can be found here: https://github.com/jdalrymple/gitbeaker#readme
warning postcss-preset-env > postcss-color-hex-alpha > postcss-values-parser > flatten@1.0.3: flatten is deprecated in favor of utility frameworks such as lodash.
[3/5] Fetching packages...
[4/5] Linking dependencies...
warning " > @sentry/nextjs@6.15.0" has incorrect peer dependency "next@^10.0.8 || ^11.0".
warning " > @sentry/nextjs@6.15.0" has unmet peer dependency "webpack@>= 4.0.0".
[5/5] Building fresh packages...
success Saved lockfile.
$ husky install
husky - Git hooks installed
Done in 31.39s.
```

#### Run it

```shell
# Then runs the app in the development mode using Yarn.
$ yarn dev
yarn run v1.22.17
$ next
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) with your browser, that's where the Next frontend server will run as you can see the result.

You can start editing the page by modifying any `components/*.tsx`. The page auto-updates as you edit the file.

## Routes

`pages/[[...slug]].js`

This file generates all the app's route. First, it fetches all the pages entries in Strapi. Then, it creates one route per page found. These routes can look like this:

- yoursite.com
- yoursite.com/page
- yoursite.com/page/nested/route

Notice that the path of the page can be several layers deep, or it can be the root of the site. This is possible thanks to Next's [optional catch-all routes](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes).

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/preview](http://localhost:3000/api/preview). This endpoint can be edited in `pages/api/preview.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file

- `NEXT_PUBLIC_URL`
  - This our application URL. Locally, you can set this to `http://localhost:3000`
- `NEXT_PUBLIC_APP_STAGE`
  - Set this to `developement` when working locally
- `NEXT_PUBLIC_STRAPI_API_URL`
  - This our Headless CMS URL. Locally, set this to `http://localhost:1337` if using default settings
- `NEXT_PREVIEW_SECRET`
  - Set this to any randomly generated string with `openssl rand -base64 32` for exemple
- `SENTRY_AUTH_TOKEN`
  - Log in to [Sentry.io](https://sentry.io) to get this `token`
- `SENTRY_DSN`
  - Go to [Sentry.io](https://sentry.io) to get the `DSN`
- `SENTRY_ENVIRONMENT`
  - Same as `NEXT_PUBLIC_APP_STAGE`

> ⚠️ Don't mess with the `APP_VERSION` and `SENTRY_RELEASE` keys, leave them alone!

## Preview Mode

You can turn preview mode on with a URL like this:

`http://localhost:3000/api/preview?secret=<next-preview-secret>&slug=<slug>`

`<next-preview-secret>` is the secret token defined in your `.env.local` config,
`<slug>` is the slug you entered in Strapi for your page.

While preview mode is on you can access `draft` pages just like you would `published` pages.

For example [http://localhost:3000/secret](http://localhost:3000/secret) would be available in preview mode.

> ℹ️ A banner will remain under the navigation to let you know preview mode is on and it will also allow you to turn it off.

## Customize the site

To edit this website, you'll need to run both the frontend and the backend in your development environment.

### Adding Sections

We have already built some sections, but you will likely want to add more to fit your needs. Follow these steps:

- Create a new component in Strapi in the "sections" category
- In the Content-Types Builder, open the Pages collection and check your new section on the `contentSections` field.
- Create a React component that takes a `data` prop in `/components/sections`
- To link your Strapi section to this React component, open `/components/sections.ts`, and add an entry to the `sectionComponents` object.

### Custom theme

We use Tailwind CSS for styling. To modify your page's look, you can edit the theme in `/tailwind.config.js`. Read the [Tailwind docs](https://v1.tailwindcss.com/docs/theme) to view all the changes you can make. For example, you can change the primary color like this:

```javascript
const { colors } = require(`tailwindcss/defaultTheme`)

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: colors.green,
      },
    },
  },
}
```

## Capturing Errors

Once you're set up, the SDK will automatically capture unhandled errors and promise rejections, and monitor performance in the client. You can also manually capture errors.

### Manually capture errors

You can pass an `Error` object to `captureException()` to get it captured as event. It's also possible to pass non-`Error` objects and strings, but be aware that the resulting events in Sentry may be missing a stacktrace.

```javascript
import * as Sentry from '@sentry/nextjs'

try {
  aFunctionThatMightFail()
} catch (err) {
  Sentry.captureException(err)
}
```

To capture [Next.js API Route](https://nextjs.org/docs/api-routes/introduction) errors and monitor server performance, you need to wrap your handlers with a Sentry function:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
}

export default withSentry(handler)
```

Another common operation is to capture a _bare message_. A message is textual information that should be sent to Sentry. Typically messages are not emitted, but they can be useful for some teams.

```javascript
import * as Sentry from '@sentry/nextjs'

Sentry.captureMessage('Something went wrong')
```

Go to `localhost:3000/api/sentry?error=1` to test your Sentry setup.

## Test code & pull request

### DangerJS: Test your PRs locally

One good thing of Danger JS is it’s very easy to set up a local development environment. You can run it locally against an opened pull request. This will not leave real comment in GitHub.

You need to store the token as `DANGER_GITHUB_API_TOKEN` first.

```shell
$ export DANGER_GITHUB_API_TOKEN={YOUT_GITHUB_TOKEN}
Done in 0.02s.
```

Now you are ready to test a pull request locally. You should have somthing like this.

```shell
$ yarn danger pr {GITHUB_PR_URL}
yarn run v1.22.17
$ danger pr https://github.com/Zedash/Jamsite/pull/10
Starting Danger PR on Zedash/Jamesite#10

Danger: ⅹ Failing the build, there are 3 fails.
## Failures
Please add Jira ticket to your PR.
-
Please fix the PR title.
-
Please add a changelog entry for your changes.
## Warnings
There are library changes, but not tests. That's OK as long as you're refactoring existing code
## Messages
Changed Files in this PR:
 - assets/css/layout/post-list.sass

Done in 3.32s
```

// TODO: Jest documentation (Jest)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
