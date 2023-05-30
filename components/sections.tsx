import type { Page, DynamicZone } from '@/types/api'
import type { OfferProps } from '@/types/ads'
import { useRouter } from 'next/router'
import Hero from './sections/hero'
import LargeVideo from './sections/large-video'
import BottomActions from './sections/bottom-actions'
import RichText from './sections/rich-text'
import MiddleSection from './sections/middle-section'

interface ISectionsProps {
  sections: Page['attributes']['contentSections']
  preview: boolean
  hits: {
    ads: {
      offers: Array<OfferProps>
    }
  }
}

interface ISectionProps {
  sectionData: DynamicZone
  hits: {
    ads: {
      offers: Array<OfferProps>
    }
  }
}

// Map Strapi sections to section components
const sectionComponents = {
  'sections.hero': Hero,
  'sections.large-video': LargeVideo,
  'sections.bottom-actions': BottomActions,
  'sections.rich-text': RichText,
  'sections.middle-section': MiddleSection,
}

// Display a section individually
const Section = ({ sectionData, hits }: ISectionProps) => {
  // Prepare the component
  const SectionComponent = sectionComponents[sectionData.__component]

  if (!SectionComponent) {
    return null
  }

  // Display the section
  return <SectionComponent data={sectionData as never} hits={hits} />
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{' '}
        <a className="underline" href={exitURL}>
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, preview, hits }: ISectionsProps) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}
          hits={hits}
          key={`${section.__component}${section.id}`}
        />
      ))}
    </div>
  )
}

export default Sections
