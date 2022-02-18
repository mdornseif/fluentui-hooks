/*
 * useTitle.tsx
 *
 * Created by Dr. Maximillian Dornseif 2021-10-18 in huWaWi3 21.7.1
 * Copyright (c) 2021 HUDORA GmbH
 */

import React from 'react'

export function useTitle(title: string): void {
  React.useEffect(() => {
    const prevTitle = document.title
    document.title = title

    return () => {
      document.title = prevTitle
    }
  }, [title])
}
