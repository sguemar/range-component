import { NormalRangeResponse } from './definitions'

export const getNormalRangeData = async (): Promise<NormalRangeResponse> => {
  const response = await fetch('http://demo8836791.mockable.io/normal-range')
  const data = await response.json()
  return {
    min: data.min,
    max: data.max,
  }
}
