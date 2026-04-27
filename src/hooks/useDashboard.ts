'use client'

import { useEffect } from 'react'
import { useDashboardStore } from '@/store/dashboard.store'

export function useDashboard() {
  const { data, loading, error, fetch } = useDashboardStore()

  useEffect(() => {
    void fetch()
  }, [fetch])

  return { data, loading, error }
}
