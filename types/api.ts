/* Elements types */

type Favicon = {
  data: {
    attributes: {
      id: string
      name: string
      alternativeText?: string
      caption?: string
      width?: number
      height?: number
      formats?: {
        small?: {
          ext: string
          url: string
          hash: string
          mime: string
          name: string
          path: string | null
          size: number
          width: number
          height: number
        }
        thumbnail?: {
          ext: string
          url: string
          hash: string
          mime: string
          name: string
          path: string | null
          size: number
          width: number
          height: number
        }
      }
      hash: string
      ext: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      provider_metadata?: object
      related?: {
        data: Array<object>
      }
      created_by?: {
        data: {
          id: number
          attributes: object
        }
      }
      updated_by?: {
        data: {
          id: number
          attributes: object
        }
      }
    }
  }
}

type NotificationBanner = {
  id: string
  text?: string
  type: 'alert' | 'info' | 'warning'
}

export type MetaData = {
  id: string
  metaTitle: string
  metaDescription: string
  metaTitleSuffix: string
  shareImage: {
    data: {
      id: string
      attributes: {
        name: string
        alternativeText?: string
        caption?: string
        width?: number
        height?: number
        formats: object
        hash: string
        ext?: string
        mime: string
        size: number
        url: string
        previewUrl?: string
        provider: string
        provider_metadata?: object
        related?: string
        created_by?: string
        updated_by?: string
      }
    }
  }
  twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterUsername?: string
}

export type LinkProps = {
  id: string
  url: string
  newTab?: boolean
  text: string
  type?: 'primary' | 'secondary'
}

export type Navbar = {
  id: string
  links?: { id: string; url: string; newTab?: boolean; text: string }[]
  loginButton: LinkProps
  logo: {
    id: string
    title: string
    picture: {
      data: {
        id: number
        attributes: {
          id: string
          name: string
          alternativeText?: string
          caption?: string
          width?: number
          height?: number
          formats?: object
          hash: string
          ext?: string
          mime: string
          size: number
          url: string
          previewUrl?: string
          provider: string
          provider_metadata?: object
          related?: string
          created_by?: string
          updated_by?: string
        }
      }
    }
  }
  searchBox?: {
    id: string
    placeholder: string
    value?: string
    type: 'primary' | 'secondary'
    cleanButton?: boolean
  }
  dropdown?: {
    id: string
    text?: string
    links?: { id: string; url: string; newTab?: boolean; text: string }[]
  }[]
}

export type Footer = {
  id: string
  logo?: {
    id: string
    title: string
    picture: {
      data: {
        id: number
        attributes: {
          id: string
          name: string
          alternativeText?: string
          caption?: string
          width?: number
          height?: number
          formats?: object
          hash: string
          ext?: string
          mime: string
          size: number
          url: string
          previewUrl?: string
          provider: string
          provider_metadata?: object
          related?: string
          created_by?: string
          updated_by?: string
        }
      }
    }
  }
  columns?: {
    id: string
    title?: string
    links?: LinkProps[]
    type?: 'row' | 'column'
  }[]
  smallText?: string
}

export type VideoProps = {
  id: string
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: object
  hash: string
  ext?: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: object
  related?: string
  created_by?: string
  updated_by?: string
}

export type CarouselProps = {
  type: 'wanted' | 'social' | 'articles' | 'press' | 'sales'
  slidesToShow: number
  infinite: boolean
  dots: boolean
}

export type PosterProps = {
  id: string
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: object
  hash: string
  ext?: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: object
  related?: string
  created_by?: string
  updated_by?: string
}

/* Sections types */
export type HeroProps = {
  __component: 'sections.hero'
  id: string
  title?: string
  label?: string
  description?: string
  picture: {
    id: string
    name: string
    alternativeText?: string
    caption?: string
    width?: number
    height?: number
    formats?: object
    hash: string
    ext?: string
    mime: string
    size: number
    url: string
    previewUrl?: string
    provider: string
    provider_metadata?: object
    related?: string
    created_by?: string
    updated_by?: string
  }
  smallTextWithLink?: string
  buttons?: LinkProps[]
}

export type TestimonialsGroupProps = {
  __component: 'sections.testimonials-group'
  id: string
  title?: string
  description?: string
  link?: { id: string; url: string; newTab?: boolean; text: string }
  logos?: {
    id: string
    title?: string
    logo?: {
      id: string
      name: string
      alternativeText?: string
      caption?: string
      width?: number
      height?: number
      formats?: object
      hash: string
      ext?: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      provider_metadata?: object
      related?: string
      created_by?: string
      updated_by?: string
    }
  }[]
  testimonials?: {
    id: string
    logo?: {
      id: string
      name: string
      alternativeText?: string
      caption?: string
      width?: number
      height?: number
      formats?: object
      hash: string
      ext?: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      provider_metadata?: object
      related?: string
      created_by?: string
      updated_by?: string
    }
    picture?: {
      id: string
      name: string
      alternativeText?: string
      caption?: string
      width?: number
      height?: number
      formats?: object
      hash: string
      ext?: string
      mime: string
      size: number
      url: string
      previewUrl?: string
      provider: string
      provider_metadata?: object
      related?: string
      created_by?: string
      updated_by?: string
    }
    text?: string
    authorName?: string
    authorTitle?: string
    link?: string
  }[]
}

export type LargeVideoProps = {
  __component: 'sections.large-video'
  id: string
  title?: string
  description?: string
  video: VideoProps
  poster: PosterProps
}

export type BottomActionsProps = {
  __component: 'sections.bottom-actions'
  id: string
  title: string
  buttons: LinkProps[]
}

export type RichTextProps = {
  __component: 'sections.rich-text'
  id: string
  content?: string
}

export type LeadFormProps = {
  __component: 'sections.lead-form'
  id: string
  title?: string
  emailPlaceholder?: string
  submitButton?: {
    id: string
    text?: string
    type?: 'primary' | 'secondary'
  }
  location?: string
}

export type MiddleSectionProps = {
  __component: 'sections.middle-section'
  id: string
  title: string
  path: string
  carousel: CarouselProps
}

export type DynamicZone =
  | HeroProps
  | LargeVideoProps
  | BottomActionsProps
  | RichTextProps
  | MiddleSectionProps

/* Main types */
type GlobalLocalizations = {
  id: string
  metadata?: MetaData
  metaTitleSuffix: string
  favicon?: string
  notificationBanner?: NotificationBanner
  navbar?: Navbar
  footer?: Footer
  localizations?: string[]
  locale?: string
  created_by?: string
  updated_by?: string
}

export interface Global {
  id: string
  attributes: {
    metadata: MetaData
    metaTitleSuffix: string
    favicon: Favicon
    notificationBanner: NotificationBanner
    navbar: Navbar
    footer: Footer
    localizations?: {
      data: GlobalLocalizations[]
    }
    locale?: string
  }
}

export interface Page {
  id: string
  attributes: {
    shortName?: string
    metadata: MetaData
    contentSections: DynamicZone[]
    status: 'published' | 'draft'
    slug?: string
    localizations: {
      data: {
        id: string
        attributes: {
          shortName?: string
          metadata: MetaData
          contentSections: DynamicZone[]
          status: 'published' | 'draft'
          slug?: string
          localizations?: string[]
          locale?: string
          created_by?: string
          updated_by?: string
        }
      }[]
    }
    locale: string
    locales: string[]
    defaultLocale: string
    localizedPaths?: {
      locale: string
      href: string
    }[]
  }
}
