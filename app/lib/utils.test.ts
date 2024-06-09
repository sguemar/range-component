import { describe, expect, it } from 'vitest'

import { isRangePropsValid, limitBulletPosition } from '@/lib/utils'

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
  describe('isRangePropsValid', () => {
    it('should receive the Range component props and return a boolean', () => {
      const min = 0
      const max = 500
      const valueRange = [1, 2, 3, 4]

      const isValid = isRangePropsValid({
        min,
        max,
        valueRange,
      })

      expect(typeof isValid).toBe('boolean')
    })

    it('should return false if all the props have values', () => {
      const min = 0
      const max = 500
      const valueRange = [1, 2, 3, 4]

      const isValid = isRangePropsValid({
        min,
        max,
        valueRange,
      })

      expect(isValid).toBe(false)
    })

    it('should return false if all props are undefined', () => {
      const isValid = isRangePropsValid({})

      expect(isValid).toBe(false)
    })

    it('should return false if there is a min value but not a max value', () => {
      const isValid = isRangePropsValid({ min: 0 })

      expect(isValid).toBe(false)
    })

    it('should return false if there is a max value but not a min value', () => {
      const isValid = isRangePropsValid({ max: 10 })

      expect(isValid).toBe(false)
    })

    it('should return true if it receives a min and a max values but no range of values', () => {
      const isValid = isRangePropsValid({ min: 0, max: 10 })

      expect(isValid).toBe(true)
    })

    it('should return true if it receives a range of values but no max or min values', () => {
      const isValid = isRangePropsValid({ valueRange: [1, 2, 3, 4] })

      expect(isValid).toBe(true)
    })
  })
})
