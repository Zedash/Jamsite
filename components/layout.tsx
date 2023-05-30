import type { Global, Page } from '@/types/api'
import { useState } from 'react'
import Navbar from './elements/navbar'
import Footer from './elements/footer'
import NotificationBanner from './elements/notification-banner'

interface ILayoutProps {
  children: React.ReactNode
  global: Global['attributes']
  pageContext: Page['attributes']
}

const Layout = ({
  children,
  global,
  pageContext,
}: ILayoutProps): JSX.Element => {
  const { navbar, footer, notificationBanner } = global

  const [bannerIsShown, setBannerIsShown] = useState(true)
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* Aligned to the top */}
      <header className="flex-1">
        {notificationBanner && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        <Navbar navbar={navbar} pageContext={pageContext} />
      </header>
      <main>{children}</main>
      {/* Aligned to the bottom */}
      <Footer footer={footer} />
    </div>
  )
}

export default Layout
