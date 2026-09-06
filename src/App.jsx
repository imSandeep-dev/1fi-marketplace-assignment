import { Navigate, Route, Routes } from 'react-router-dom'
import MarketplacePage from './pages/MarketplacePage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ShopPage from './pages/ShopPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shop" replace />} />
      <Route path="/shop" element={<ShopPage />}>
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="marketplace/product/:id" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  )
}

export default App
