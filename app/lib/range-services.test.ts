import { describe, expect, it, vi } from 'vitest'

import {
  BASE_API_URL,
  FIXED_VALUES_RANGE_ENDPOINT,
  NORMAL_RANGE_ENDPOINT,
} from '@/lib/endpoints'
import {
  getFixedValuesRangeData,
  getNormalRangeData,
} from '@/lib/range-services'
import { FixedValuesRangeData, NormalRangeData } from '@/lib/definitions'

const fetchSpy = vi.spyOn(global, 'fetch')

describe('Range services', () => {
  describe('getNormalRangeData', () => {
    const mockData: NormalRangeData = {
      min: 1,
      max: 100,
    }
    it('should get the data from the API successfully', async () => {
      fetchSpy.mockResolvedValueOnce({
        json: async () => ({ ...mockData }),
      } as Response)

      const rangeData = await getNormalRangeData()
      const endpoint = `${BASE_API_URL}${NORMAL_RANGE_ENDPOINT}`

      expect(fetchSpy).toHaveBeenCalledWith(endpoint)
      expect(rangeData).toEqual(mockData)
    })
  })

  describe('getFixedValuesRangeData', () => {
    const mockData: FixedValuesRangeData = {
      valueRange: [1, 2, 3, 4],
    }
    it('should get the data from the API successfully', async () => {
      fetchSpy.mockResolvedValueOnce({
        json: async () => ({ ...mockData }),
      } as Response)

      const rangeData = await getFixedValuesRangeData()
      const endpoint = `${BASE_API_URL}${FIXED_VALUES_RANGE_ENDPOINT}`

      expect(fetchSpy).toHaveBeenCalledWith(endpoint)
      expect(rangeData).toEqual(mockData)
    })
  })
})
