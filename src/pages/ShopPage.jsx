import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BottomNav from '../components/shop/BottomNav'
import SearchBar from '../components/shop/SearchBar'
import ShopBanner from '../components/shop/ShopBanner'
import ShopTabs from '../components/shop/ShopTabs'

const tabLabels = {
  topBrands: 'Top Brands',
  nearbyStores: 'Nearby Stores',
  marketplace: '1Fi Marketplace',
}

const searchPlaceholders = {
  [tabLabels.topBrands]: 'Search online stores...',
  [tabLabels.nearbyStores]: 'Search stores...',
  [tabLabels.marketplace]: 'Search marketplace products...',
}

function getTabForLocation(location) {
  if (location.pathname.startsWith('/shop/marketplace')) {
    return tabLabels.marketplace
  }

  return Object.values(tabLabels).includes(location.state?.activeTab)
    ? location.state.activeTab
    : tabLabels.topBrands
}

function ShopPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(() => getTabForLocation(location))
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const syncTab = window.setTimeout(() => {
      setActiveTab(getTabForLocation(location))
    }, 0)

    return () => window.clearTimeout(syncTab)
  }, [location])

  function handleTabChange(tab) {
    setActiveTab(tab)
    setSearchQuery('')
    navigate(tab === tabLabels.marketplace ? '/shop/marketplace' : '/shop', {
      state: { activeTab: tab },
    })
  }

  return (
    <div className="min-h-screen bg-page pb-24">
      <ShopBanner />

      <main className="mx-auto w-full space-y-5 px-4 py-5 md:max-w-2xl md:px-6">
        <ShopTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <SearchBar
          placeholder={searchPlaceholders[activeTab]}
          value={searchQuery}
          onChange={setSearchQuery}
        />

        {activeTab === tabLabels.topBrands && (
          <p className="rounded-2xl bg-card p-5 text-text-secondary shadow-sm">
            Coming soon
          </p>
        )}

        {activeTab === tabLabels.nearbyStores && (
          <p className="rounded-2xl bg-card p-5 text-text-secondary shadow-sm">
            Coming soon
          </p>
        )}

        {activeTab === tabLabels.marketplace && <Outlet context={{ searchQuery }} />}
      </main>

      <BottomNav />
    </div>
  )
}

export default ShopPage
