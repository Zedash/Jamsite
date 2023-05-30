import type { MiddleSectionProps } from '@/types/api'
import type { OfferProps } from '@/types/ads'
import Carousel from '@/components/elements/carousel'

interface IMiddleSectionProps {
  data: MiddleSectionProps
  hits: {
    ads: {
      offers: Array<OfferProps>
    }
  }
}

const MiddleSection = ({
  data,
  hits,
}: IMiddleSectionProps): JSX.Element => {
  const { type } = data.carousel
  return (
    <section className="bg-blue pt-12 pb-16">
      <div className="container max-h-96 flex flex-row align-middle text-center">
        <h2
          className="title-h2 text-white -rotate-90"
          data-chars={type.slice(type.length / 2, type.length)}
        >
          {data.title}
        </h2>
        {/* Carousel wrapper */}
        <div className="w-full lg:w-9/12 mx-auto overflow-hidden shadow-2xl">
          <Carousel data={data.carousel} hits={hits} />
        </div>
      </div>
    </section>
  )
}

export default MiddleSection
