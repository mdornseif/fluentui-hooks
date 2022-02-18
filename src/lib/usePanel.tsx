/*
 * usePanel.tsx - Provide FluentUI Panel management
 *
 * Created by Dr. Maximillian Dornseif 2021-09-30 in huWaWi3 21.6.0
 * Copyright (c) 2021 HUDORA GmbH
 */

import { PanelType } from '@fluentui/react/lib/Panel'
import camelCase from 'lodash.camelcase'
import { useCallback, useState } from 'react'
import { BooleanParam, useQueryParam } from 'use-query-params'

export function usePanel(title: string): [() => void, object, boolean, () => void] {
  const [isPanelOpenSP, setIsPanelOpenSP] = useQueryParam(camelCase(`${title}Panel`), BooleanParam)
  const [isPanelOpen, setIsPanelOpen] = useState(isPanelOpenSP)
  const openPanel = useCallback(() => {
    setIsPanelOpen(true)
    setIsPanelOpenSP(true)
  }, [])
  const dismissPanel = useCallback(() => {
    setIsPanelOpen(false)
    setIsPanelOpenSP(undefined)
  }, [])

  const panelProps = {
    dataTestId: `${title}Panel`,
    headerText: title,
    isOpen: isPanelOpen,
    isLightDismiss: true,
    onDismiss: dismissPanel,
    type: PanelType.medium,
    closeButtonAriaLabel: `${title} Panel schließen`,
    isFooterAtBottom: true, // make css:100% work within the Panel
  }

  return [openPanel, panelProps, !!isPanelOpen, dismissPanel]
}
