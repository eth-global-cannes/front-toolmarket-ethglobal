/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AgentsAgentRouteImport } from './routes/agents/$agent'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AgentsAgentRoute = AgentsAgentRouteImport.update({
  id: '/agents/$agent',
  path: '/agents/$agent',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/agents/$agent': typeof AgentsAgentRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/agents/$agent': typeof AgentsAgentRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/agents/$agent': typeof AgentsAgentRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/agents/$agent'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/agents/$agent'
  id: '__root__' | '/' | '/agents/$agent'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AgentsAgentRoute: typeof AgentsAgentRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/agents/$agent': {
      id: '/agents/$agent'
      path: '/agents/$agent'
      fullPath: '/agents/$agent'
      preLoaderRoute: typeof AgentsAgentRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AgentsAgentRoute: AgentsAgentRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
