import { describe, expect, it } from 'vitest'

import { limitBulletPosition } from '@/lib/utils'

describe('Utils', () => {
  describe('limitBulletPosition', () => {
    it('should receive the correct params and returns a number', () => {
      const minimumPosition = 0
      const maximumPosition = 500
      const currentPosition = 40

      const bulletPosition = limitBulletPosition({
        current: currentPosition,
        max: maximumPosition,
        min: minimumPosition,
      })

      expect(typeof bulletPosition).toBe('number')
    })

    describe('Return minimum position', () => {
      it('should return 0 value if the current position is negative', () => {
        const minimumPosition = 0
        const maximumPosition = 500
        const currentPosition = -1

        const bulletPosition = limitBulletPosition({
          current: currentPosition,
          max: maximumPosition,
          min: minimumPosition,
        })

        expect(bulletPosition).toBe(minimumPosition)
      })

      it('should return 30 if the current position is lower', () => {
        const minimumPosition = 30
        const maximumPosition = 500
        const currentPosition = 10

        const bulletPosition = limitBulletPosition({
          current: currentPosition,
          max: maximumPosition,
          min: minimumPosition,
        })

        expect(bulletPosition).toBe(minimumPosition)
      })
    })

    it('should return the maximum position if the current position is greater', () => {
      const minimumPosition = 0
      const maximumPosition = 500
      const currentPosition = 501

      const bulletPosition = limitBulletPosition({
        current: currentPosition,
        max: maximumPosition,
        min: minimumPosition,
      })

      expect(bulletPosition).toBe(maximumPosition)
    })

    it('should return the current position if it is between the minimum and the maximum value', () => {
      const minimumPosition = 0
      const maximumPosition = 500
      let currentPosition = 0

      expect(
        limitBulletPosition({
          current: currentPosition,
          max: maximumPosition,
          min: minimumPosition,
        }),
      ).toBe(currentPosition)

      currentPosition = 47
      expect(
        limitBulletPosition({
          current: currentPosition,
          max: maximumPosition,
          min: minimumPosition,
        }),
      ).toBe(currentPosition)

      currentPosition = 359
      expect(
        limitBulletPosition({
          current: currentPosition,
          max: maximumPosition,
          min: minimumPosition,
        }),
      ).toBe(currentPosition)

      currentPosition = 500
      expect(
        limitBulletPosition({
          current: currentPosition,
          max: maximumPosition,
          min: minimumPosition,
        }),
      ).toBe(currentPosition)
    })
  })
})
