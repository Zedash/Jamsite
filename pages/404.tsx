import Link from 'next/link'

export default function NotFound(): JSX.Element {
  return (
    // We need to assume and return a 404 when the current slug does not match a category in the CMS
    // since we are using a broad url rewrite this could either a category or other page request
    <>
      <h1>Houston we have a 404</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  )
}
