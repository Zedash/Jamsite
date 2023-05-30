import type { CarouselProps } from '@/types/api'
import type { OfferProps } from '@/types/ads'
import Slider from 'react-slick'

interface ICarouselProps {
  data: CarouselProps
  hits: {
    ads: {
      offers: Array<OfferProps>
    }
  }
}

const Carousel = ({ data, hits }: ICarouselProps): JSX.Element => {
  const settings = {
    dots: data.dots,
    infinite: data.infinite,
    speed: 500,
    slidesToShow: data.slidesToShow,
    slidesToScroll: data.slidesToShow,
  }
  return (
    <Slider {...settings}>
      {hits.ads.offers.map((offer) => (
        <div key={offer.id}>
          <h3>{offer.brand}</h3>
        </div>
      ))}
    </Slider>
  )
}

export default Carousel
