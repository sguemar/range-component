import { LimitBulletPositionParams } from '@/lib/definitions'

export const limitBulletPosition = ({
  current,
  max,
  min,
}: LimitBulletPositionParams) => {
  if (current < min) return min
  if (current > max) return max
  return current
}
