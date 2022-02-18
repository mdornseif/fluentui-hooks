/*
 * useDialog.tsx - Provide FluentUI Dialog
 *
 * Created by Dr. Maximillian Dornseif 2021-10-21 in huWaWi3 21.7.1
 * Copyright (c) 2021 Maximillian Dornseif
 */

import { DialogType } from '@fluentui/react/lib/Dialog'
import camelCase from 'lodash.camelcase'
import { useCallback, useState } from 'react'
import { BooleanParam, useQueryParam } from 'use-query-params'

export function useDialog(title: string, subText = ''): [() => void, object, boolean, () => void] {
  const [isDialogOpenSP, setIsDialogOpenSP] = useQueryParam(camelCase(`${title}Dialog`), BooleanParam)
  const [isDialogOpen, setIsDialogOpen] = useState(isDialogOpenSP)
  const openDialog = useCallback(() => {
    setIsDialogOpen(true)
    setIsDialogOpenSP(true)
  }, [setIsDialogOpenSP])
  const dismissDialog = useCallback(() => {
    setIsDialogOpen(false)
    setIsDialogOpenSP(undefined)
  }, [setIsDialogOpenSP])

  const dialogProps = {
    dataTestId: `${title}Dialog`,
    hidden: !isDialogOpen,
    onDismiss: dismissDialog,
    modalProps: {
      isBlocking: true,
    },
    dialogContentProps: {
      title: title,
      subText: subText,
      type: DialogType.normal, // DialogType.medium,
      closeButtonAriaLabel: `${title} Dialog schließen`,
      // isMultiline
      // showCloseButton
    },
  }

  return [openDialog, dialogProps, !!isDialogOpen, dismissDialog]
}
