import { AgentDetailsView } from '@/views/AgentDetailsView'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/agents/$agent')({
  component: AgentDetailsView,
})
