/*
 * Sidebar.tsx easy usage with wouter
 * 
 * Created by Dr. Maximillian Dornseif 2021-09-10 in huWaWi3-frontend
 * Copyright (c) 2022 Maximillian Dornseif
 */

import { INavLink, INavLinkGroup, Nav } from '@fluentui/react/lib/Nav'
import { Stack } from '@fluentui/react/lib/Stack'
import React from 'react'
import { Route, useLocation, useRouter } from 'wouter'

export interface ISidebarNavLink extends INavLink {
  component: JSX.Element
}

interface ISidebarPropsItem extends Omit<INavLinkGroup, 'links'> {
  links: Array<INavLink>
}
export interface ISidebarProps extends Record<string, ISidebarPropsItem> {}

export function WithSidebar(props: { items: ISidebarProps; children?: React.ReactNode }) {
  const [location, navigate] = useLocation()
  const router = useRouter()

  const navLinkGroups = []
  const navContent = []
  let selectedKey: string = ''
  for (const [grname, gr] of Object.entries(props.items)) {
    const links = []
    let collapseByDefault: boolean = gr.collapseByDefault || false
    for (const item of gr.links) {
      const key = `${grname}-${item?.title}`
      const [match] = router.matcher(`${item.path}/:p*`, location)
      // invariant(!item?.path.endsWith('/'), `${item?.path} must not end with /`)
      if (match) {
        selectedKey = key
        collapseByDefault = false
      }
      links.push({
        key,
        name: item.title,
        onClick: () => navigate(`${item?.path}`),
      })
      navContent.push(
        <Route key={item.path} path={`${item.path}/:p*`}>
          {item.component}
        </Route>
      )
    }
    navLinkGroups.push({
      ...gr,
      name: grname,
      links,
      selectedKey,
      collapseByDefault,
    })
  }

  return (
    <Stack horizontal tokens={{ childrenGap: '2em' }}>
      <Stack.Item order={0}>
        <nav>
          <Nav groups={navLinkGroups as any} selectedKey={selectedKey} />
        </nav>
      </Stack.Item>
      <Stack.Item grow order={1}>
        <div className="authRequired">
          <main>{selectedKey ? navContent : props.children}</main>
        </div>
      </Stack.Item>
    </Stack>
  )
}
