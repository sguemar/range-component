import { MouseEvent, useCallback, useEffect, useState } from 'react'

import { BulletProps } from '@/lib/definitions'
import { limitBulletPosition } from '@/lib/utils'

import styles from '@/ui/bullet.module.css'

export const Bullet = ({
  currentPercentage,
  fixedValues,
  maximumPosition,
  maximumValue,
  minimumPosition,
  minimumValue,
  rangeLineLeftOffset,
  rangeLineLength,
  updatePercentage,
  updateValue,
  zIndex,
}: BulletProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false)

  const getPositionPercentage = (
    bulletPosition: number,
    rangeLineLength: number,
  ) => (bulletPosition * 100) / rangeLineLength

  const getNewValue = useCallback(
    (bulletPercentage: number) => {
      if (fixedValues) {
        const numberOfFixedValues = fixedValues.length
        const index = Math.min(
          numberOfFixedValues - 1,
          Math.floor(bulletPercentage / (100 / numberOfFixedValues)),
        )
        return fixedValues[index]
      }
      const newValue =
        ((maximumValue - minimumValue) * bulletPercentage) / 100 + minimumValue
      return Number(newValue.toFixed(2))
    },
    [maximumValue, minimumValue, fixedValues],
  )

  const handleStartDrag = () => {
    setIsMouseDown(true)
  }

  const handleDragMovement = useCallback(
    (e) => {
      const currentXPointerPosition =
        e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
      const limitedBulletPosition = limitBulletPosition({
        current: currentXPointerPosition - rangeLineLeftOffset,
        max: maximumPosition,
        min: minimumPosition,
      })

      const newPercentage = getPositionPercentage(
        limitedBulletPosition,
        rangeLineLength,
      )
      updatePercentage(newPercentage)

      updateValue(getNewValue(newPercentage))
    },
    [
      updatePercentage,
      updateValue,
      getNewValue,
      maximumPosition,
      minimumPosition,
      rangeLineLength,
      rangeLineLeftOffset,
    ],
  )

  const handleDragStop = () => {
    setIsMouseDown(false)
  }

  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mouseup', handleDragStop)
      document.addEventListener('mousemove', handleDragMovement)

      document.addEventListener('touchmove', handleDragMovement)
      document.addEventListener('touchend', handleDragStop)
    }
    return () => {
      if (isMouseDown) {
        document.removeEventListener('mouseup', handleDragStop)
        document.removeEventListener('mousemove', handleDragMovement)

        document.removeEventListener('touchend', handleDragStop)
        document.removeEventListener('touchmove', handleDragMovement)
      }
    }
  }, [handleDragMovement, isMouseDown])

  return (
    <div
      className={`${styles.bullet} ${isMouseDown ? styles.grabbing : ''}`}
      data-testid="bullet"
      onMouseDown={handleStartDrag}
      onTouchStart={handleStartDrag}
      style={{
        left: `${currentPercentage}%`,
        zIndex,
      }}
    ></div>
  )
}
