import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { UseApi } from '@/lib/definitions'
import { useApi } from '@/lib/hooks/useApi'

describe('useApi', () => {
  const setup = () => {
    const { result } = renderHook<UseApi, null>(() => useApi())

    return result
  }

  it('should return a isLoading variable initially false', () => {
    const result = setup()

    expect(result.current.isLoading).toBe(false)
  })

  it('should return an error variable initially null', () => {
    const result = setup()

    expect(result.current.error).toBeNull()
  })

  it('should return a apiCallHandler function', () => {
    const result = setup()

    expect(typeof result.current.apiCallHandler).toBe('function')
  })

  describe('apiCallHandler', () => {
    it('should call the function passed by params', () => {
      const service = vi.fn()
      const result = setup()

      result.current.apiCallHandler({ service })

      expect(service).toHaveBeenCalledOnce()
    })

    it('should return the service returned data if the API call is success', async () => {
      const mockServiceData = 'Mock data'
      const service = vi.fn().mockResolvedValue(mockServiceData)
      const result = setup()

      const data = await result.current.apiCallHandler({ service })

      expect(data).toBe(mockServiceData)
    })

    it('should return isLoading true when the service call is loading', async () => {
      const service = vi.fn().mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('Successful response')
          }, 1000)
        })
      })
      const result = setup()

      expect(result.current.isLoading).toBe(false)

      await result.current.apiCallHandler({ service })

      expect(result.current.isLoading).toBe(true)
    })

    it('should return isLoading false when a successful service call ends', async () => {
      const service = vi.fn().mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('Successful response')
          }, 1000)
        })
      })
      const result = setup()

      expect(result.current.isLoading).toBe(false)

      await result.current.apiCallHandler({ service })

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('should return an error message if the service call fails', async () => {
      const errorMessage = 'There was an error'
      const service = vi.fn().mockRejectedValue(errorMessage)
      const result = setup()

      await result.current.apiCallHandler({ service })

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage)
      })
    })
  })
})
