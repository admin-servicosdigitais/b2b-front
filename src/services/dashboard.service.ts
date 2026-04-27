import type { DashboardResponse } from '@/types/api'
import { apiGet } from './api-client'

export const getDashboard = (): Promise<DashboardResponse> =>
  apiGet<DashboardResponse>('/dashboard')
