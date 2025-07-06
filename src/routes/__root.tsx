import { WalletAccountProvider } from '@/providers/wallet-account'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <WalletAccountProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </WalletAccountProvider>
  ),
})