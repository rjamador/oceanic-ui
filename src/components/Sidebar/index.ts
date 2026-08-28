import { SidebarProvider } from './context'
import {
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarPanel,
  SidebarRail,
  SidebarTrigger,
} from './Sidebar'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarMenu,
  SidebarSeparator,
} from './SidebarMenu'

/**
 * A collapsible side panel: navigation, chat history, filters, file
 * trees. Wrap the panel and the page content in `<Sidebar.Provider>`.
 *
 * ```tsx
 * <Sidebar.Provider>
 *   <Sidebar>
 *     <Sidebar.Header>…</Sidebar.Header>
 *     <Sidebar.Body>
 *       <Sidebar.Group label="Navigation">
 *         <Sidebar.Menu>
 *           <Sidebar.Item icon={<HomeIcon />} active>Home</Sidebar.Item>
 *         </Sidebar.Menu>
 *       </Sidebar.Group>
 *     </Sidebar.Body>
 *   </Sidebar>
 *   <Sidebar.Main>{children}</Sidebar.Main>
 * </Sidebar.Provider>
 * ```
 */
export const Sidebar = Object.assign(SidebarPanel, {
  Provider: SidebarProvider,
  Trigger: SidebarTrigger,
  Rail: SidebarRail,
  Main: SidebarMain,
  Header: SidebarHeader,
  Body: SidebarBody,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Menu: SidebarMenu,
  Item: SidebarItem,
  Separator: SidebarSeparator,
})

export { useSidebar } from './context'
export type {
  SidebarProviderProps,
  SidebarSide,
  SidebarCollapsible,
  SidebarVariant,
  SidebarContextValue,
} from './context'
export type {
  SidebarPanelProps,
  SidebarTriggerProps,
  SidebarRailProps,
  SidebarMainProps,
  SidebarHeaderProps,
  SidebarBodyProps,
  SidebarFooterProps,
} from './Sidebar'
export type {
  SidebarGroupProps,
  SidebarGroupLabelProps,
  SidebarMenuProps,
  SidebarItemProps,
  SidebarSeparatorProps,
} from './SidebarMenu'
