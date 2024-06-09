import { describe, expect, it, vi } from 'vitest'

import { getNormalRangeData } from '@/lib/range-services'
import { NormalRangeResponse } from '@/lib/definitions'

const fetchSpy = vi.spyOn(global, 'fetch')

const mockData: NormalRangeResponse = {
  min: 1,
  max: 100,
}

describe('Range services', () => {
  it('should get the data from the API successfully', async () => {
    fetchSpy.mockResolvedValueOnce({
      json: async () => ({ ...mockData }),
    } as Response)

    const rangeData = await getNormalRangeData()

    expect(fetchSpy).toHaveBeenCalledWith(
      'http://demo8836791.mockable.io/normal-range',
    )

    expect(rangeData).toEqual(mockData)
  })
})
