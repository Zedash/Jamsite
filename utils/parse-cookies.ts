import type { NextApiRequest } from 'next'
import cookie from 'cookie'

export function parseCookies(req: NextApiRequest): { [key: string]: string } {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}
