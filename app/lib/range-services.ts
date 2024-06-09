import { NormalRangeData } from '@/lib/definitions'
import { BASE_API_URL, NORMAL_RANGE_ENDPOINT } from '@/lib/endpoints'

export const getNormalRangeData = async (): Promise<NormalRangeData> => {
  const endpoint = `${BASE_API_URL}${NORMAL_RANGE_ENDPOINT}`
  const response = await fetch(endpoint)
  const data = await response.json()
  return {
    min: data.min,
    max: data.max,
  }
}
