import Image from 'next/image'
import { getStrapiMedia } from 'utils/media'

interface INextImageProps {
  media: {
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
  height?: number
  width?: number
}

interface ILoaderProps {
  src: string
  width?: number
  quality?: number
}

const NextImage = ({ media, height, width }: INextImageProps) => {
  const { url, alternativeText } = media

  // TODO: Use width and quality for optimized images
  // See https://nextjs.org/docs/basic-features/image-optimization
  const loader = ({ src }: ILoaderProps): string => {
    return getStrapiMedia(src)
  }

  // The image has a fixed width and height
  if (width && height) {
    return (
      <Image
        src={url}
        loader={loader}
        alt={alternativeText || ''}
        height={height}
        width={width}
        unoptimized
      />
    )
  }

  // The image is responsive
  return (
    <Image
      loader={loader}
      layout="responsive"
      width={media.width}
      height={media.height}
      objectFit="contain"
      src={url}
      alt={alternativeText || ''}
      unoptimized
    />
  )
}

export default NextImage
