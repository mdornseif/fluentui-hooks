/*
 * usePanel.stories.tsx
 *
 * Created by Dr. Maximillian Dornseif 2022-02-18 in fluentui-hooks 1.0.1-beta.1
 * Copyright (c) 2023 HUDORA GmbH
 */

import React from 'react'
import { Meta, Story } from '@storybook/react'
import { usePanel } from '../src/index'
import { QueryParamProvider } from 'use-query-params'
import { WindowHistoryAdapter } from 'use-query-params/adapters/window'
import { Panel, PanelType, initializeIcons } from '@fluentui/react'

initializeIcons()

const PanelDemo = () => {
  return (
    <div border="1">
      <QueryParamProvider adapter={WindowHistoryAdapter}>
        outer
        <PanelDemoInner />
      </QueryParamProvider>
    </div>
  )
}

const PanelDemoInner = () => {
  const [openEditPanel, editPanelProps, , dismissEditPanel] = usePanel('Edit User')

  return (
    <div border="1">
      inner
      <p>Click the button to open the panel</p>
      <button onClick={openEditPanel}>Edit</button>
      <Panel {...editPanelProps} type={PanelType.medium}>
        <h2>Panel Content</h2>
        <p>This provides all the nitty-gitty-details of Panel Handling.</p>
      </Panel>
    </div>
  )
}

const meta: Meta = {
  title: 'Welcome',
  component: PanelDemo,
}

export default meta

const Template: Story<Props> = (args) => <PanelDemo {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
