import { MouseEvent, useCallback, useEffect, useState } from 'react'

import { BulletProps } from '@/lib/definitions'
import { limitBulletPosition } from '@/lib/utils'

import styles from '@/ui/bullet.module.css'

export const Bullet = ({
  currentPercentage,
  maximumPosition,
  maximumValue,
  minimumPosition,
  minimumValue,
  rangeLineLeftOffset,
  rangeLineLength,
  updatePercentage,
  updateValue,
}: BulletProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false)

  const getPositionPercentage = (
    bulletPosition: number,
    rangeLineLength: number,
  ) => (bulletPosition * 100) / rangeLineLength

  const getNewValue = useCallback(
    (bulletPercentage: number) => {
      const newValue =
        ((maximumValue - minimumValue) * bulletPercentage) / 100 + minimumValue
      return Number(newValue.toFixed(2))
    },
    [maximumValue, minimumValue],
  )

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsMouseDown(true)
  }

  const handleMouseMove = useCallback(
    (e) => {
      const limitedBulletPosition = limitBulletPosition({
        current: e.clientX - rangeLineLeftOffset,
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

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('mousemove', handleMouseMove)
    }
    return () => {
      if (isMouseDown) {
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [handleMouseMove, isMouseDown])

  return (
    <div
      className={`${styles.bullet} ${isMouseDown ? styles.grabbing : ''}`}
      data-testid="bullet"
      onMouseDown={handleMouseDown}
      style={{
        left: `${currentPercentage}%`,
      }}
    ></div>
  )
}
