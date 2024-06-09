import { FixedValuesRangeData, NormalRangeData } from '@/lib/definitions'
import {
  BASE_API_URL,
  FIXED_VALUES_RANGE_ENDPOINT,
  NORMAL_RANGE_ENDPOINT,
} from '@/lib/endpoints'

export const getNormalRangeData = async (): Promise<NormalRangeData> => {
  const endpoint = `${BASE_API_URL}${NORMAL_RANGE_ENDPOINT}`
  const response = await fetch(endpoint)
  const data: NormalRangeData = await response.json()
  return {
    min: data.min,
    max: data.max,
  }
}

export const getFixedValuesRangeData =
  async (): Promise<FixedValuesRangeData> => {
    const endpoint = `${BASE_API_URL}${FIXED_VALUES_RANGE_ENDPOINT}`
    const response = await fetch(endpoint)
    const data: FixedValuesRangeData = await response.json()
    return {
      valueRange: data.valueRange,
    }
  }
