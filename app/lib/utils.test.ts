import { describe, expect, it } from 'vitest'

import { limitBulletPosition } from '@/lib/utils'

describe('Utils', () => {
  describe('limitBulletPosition', () => {
    const maximumXPosition = 500

    it('should receive the current pointer X position, the maximum possible position and returns a number', () => {
      const currentXPosition = 40
      const bulletPosition = limitBulletPosition(
        currentXPosition,
        maximumXPosition,
      )

      expect(typeof bulletPosition).toBe('number')
    })

    it('should return 0 if the current X position is lower than 0', () => {
      const currentXPosition = -1
      const bulletPosition = limitBulletPosition(
        currentXPosition,
        maximumXPosition,
      )

      expect(bulletPosition).toBe(0)
    })

    it('should return the maximum possible position if the current X position is greater than the maximum value', () => {
      const currentXPosition = 501
      const bulletPosition = limitBulletPosition(
        currentXPosition,
        maximumXPosition,
      )

      expect(bulletPosition).toBe(maximumXPosition)
    })

    it('should return the current X position if it is between 0 and the maximum value', () => {
      let currentXPosition = 0
      expect(limitBulletPosition(currentXPosition, maximumXPosition)).toBe(
        currentXPosition,
      )

      currentXPosition = 47
      expect(limitBulletPosition(currentXPosition, maximumXPosition)).toBe(
        currentXPosition,
      )

      currentXPosition = 359
      expect(limitBulletPosition(currentXPosition, maximumXPosition)).toBe(
        currentXPosition,
      )

      currentXPosition = 500
      expect(limitBulletPosition(currentXPosition, maximumXPosition)).toBe(
        currentXPosition,
      )
    })
  })
})
