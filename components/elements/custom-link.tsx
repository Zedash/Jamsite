import type { LinkProps } from '@/types/api'
import Link from 'next/link'

interface ICustomLinkProps {
  link: LinkProps
  children: React.ReactNode
  locale?: string | undefined
}

const CustomLink = ({ link, children }: ICustomLinkProps) => {
  const isInternalLink = link.url.startsWith('/')

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href="/[[...slug]]" as={link.url}>
        <a>{children}</a>
      </Link>
    )
  }

  // Plain <a> tags for external links
  if (link.newTab) {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <a href={link.url} target="_self">
      {children}
    </a>
  )
}

export default CustomLink
