import type { RichTextProps } from '@/types/api'
import Markdown from 'react-markdown'

interface IRichTextProps {
  data: RichTextProps
}

const RichText = ({ data }: IRichTextProps): JSX.Element => {
  return (
    <div className="prose prose-lg container py-12">
      <Markdown>{data.content || ''}</Markdown>
    </div>
  )
}

export default RichText
