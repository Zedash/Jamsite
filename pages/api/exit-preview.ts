import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

const exit = async (req: NextApiRequest, res: NextApiResponse) => {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData()

  // Redirect the user back to a provided redirect path or the index page
  res.writeHead(307, { Location: '/' })
  res.end()
}

export default withSentry(exit)
