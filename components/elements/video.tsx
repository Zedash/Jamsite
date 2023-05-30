import type { VideoProps, PosterProps } from '@/types/api'
import { getStrapiMedia } from 'utils/media'

interface IVideoProps {
  media: VideoProps
  poster: PosterProps
  className?: string
  controls?: boolean
  autoPlay?: boolean
}

const Video = ({
  media,
  poster,
  className,
  controls = true,
  autoPlay = false,
}: IVideoProps): JSX.Element => {
  const fullVideoUrl = getStrapiMedia(media.url)
  const fullPosterUrl = getStrapiMedia(poster?.url)

  return (
    <video
      className={className}
      poster={fullPosterUrl}
      controls={controls}
      autoPlay={autoPlay}
    >
      <source src={fullVideoUrl} type={media.mime} />
    </video>
  )
}

export default Video
