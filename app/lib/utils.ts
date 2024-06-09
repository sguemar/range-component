import { LimitBulletPositionParams, RangeProps } from '@/lib/definitions'

export const limitBulletPosition = ({
  current,
  max,
  min,
}: LimitBulletPositionParams) => {
  if (current < min) return min
  if (current > max) return max
  return current
}

export const isRangePropsValid = ({
  max,
  min,
  valueRange,
}: RangeProps): boolean => {
  if (max !== undefined && min !== undefined && valueRange === undefined)
    return true
  if (max === undefined && min === undefined && valueRange !== undefined)
    return true
  return false
}
