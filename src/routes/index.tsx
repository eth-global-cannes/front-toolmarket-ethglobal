import { MarketplaceView } from '@/views/MarketplaceView'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: MarketplaceView,
})

