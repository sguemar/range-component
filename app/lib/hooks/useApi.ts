import { useState } from 'react'

import { ApiCallHandlerParams, UseApi } from '@/lib/definitions'

export const useApi = (): UseApi => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>(null)

  const apiCallHandler = async <Result>({
    service,
  }: ApiCallHandlerParams<Result>) => {
    setIsLoading(true)
    try {
      return await service()
    } catch (error) {
      setError('There was an error')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    apiCallHandler,
    error,
    isLoading,
  }
}
