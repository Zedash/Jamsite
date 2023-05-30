import type { Global } from '@/types/api'
import Image from 'next/image'
import Markdown from 'react-markdown'
import classNames from 'classnames'
import { MdClose } from 'react-icons/md'
import iconAlertInfo from '@/assets/icons/alert-info.svg'

interface INotificationBannerProps {
  data: Global['attributes']['notificationBanner']
  closeSelf: () => void
}

const NotificationBanner = ({
  data,
  closeSelf,
}: INotificationBannerProps): JSX.Element => {
  const { type, text } = data
  return (
    <div
      className={classNames(
        // Common classes
        'text-white px-2 py-2',
        {
          // Apply theme based on notification type
          'bg-gray-dark': type === 'info',
          'bg-yellow-alert': type === 'warning',
          'bg-red-alert': type === 'alert',
        }
      )}
    >
      <div className="container flex flex-row justify-between items-center ">
        <Image alt="" src={iconAlertInfo} height={36} width={36} />
        <div className="rich-text-banner ml-2 flex-1">
          <Markdown>{text || ''}</Markdown>
        </div>
        <button onClick={closeSelf} className="px-1 py-1 flex-shrink-0">
          <MdClose className="h-6 w-auto" color="#fff" />
        </button>
      </div>
    </div>
  )
}

export default NotificationBanner
