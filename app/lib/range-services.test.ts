import { describe, expect, it, vi } from 'vitest'

import { BASE_API_URL, NORMAL_RANGE_ENDPOINT } from '@/lib/endpoints'
import { getNormalRangeData } from '@/lib/range-services'
import { NormalRangeData } from '@/lib/definitions'

const fetchSpy = vi.spyOn(global, 'fetch')

const mockData: NormalRangeData = {
  min: 1,
  max: 100,
}

describe('Range services', () => {
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
