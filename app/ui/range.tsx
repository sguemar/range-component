'use client'

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

import { RangeProps } from '@/lib/definitions'
import { limitBulletPosition } from '@/lib/utils'

import styles from './range.module.css'

export const Range = (props: RangeProps) => {
  const [minBulletXPercentage, setMinBulletPercentage] = useState(0)
  const [maxBulletXPercentage, setMaxBulletPercentage] = useState(100)
  const [currentMinValue, setCurrentMinValue] = useState(props.min)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const rangeLineRef = useRef<HTMLDivElement>(null)

  const stopDragging = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = useCallback(
    (e) => {
      const { left, right } = rangeLineRef.current.getBoundingClientRect()
      const rangeLineLength = right - left
      const limitedBulletPosition = limitBulletPosition({
        current: e.clientX - left,
        max: rangeLineLength,
        min: 0,
      })
      const bulletPercentage = (limitedBulletPosition * 100) / rangeLineLength
      setMinBulletPercentage(bulletPercentage)

      const newMinValue =
        ((props.max - props.min) * bulletPercentage) / 100 + props.min
      setCurrentMinValue(Number(newMinValue.toFixed(2)))
    },
    [props.max, props.min],
  )

  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mouseup', stopDragging)
      document.addEventListener('mousemove', handleMouseMove)
    }
    return () => {
      if (isMouseDown) {
        document.removeEventListener('mouseup', stopDragging)
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [handleMouseMove, isMouseDown])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsMouseDown(true)
  }

  return (
    <div className={styles.rangeContainer} data-testid="range-container">
      <label className={styles.minValue}>{currentMinValue}€</label>
      <div ref={rangeLineRef} className={styles.rangeLine}>
        <div
          data-testid="min-bullet"
          style={{
            left: `${minBulletXPercentage}%`,
          }}
          className={`${styles.minBullet} ${isMouseDown ? styles.grabbing : ''}`}
          onMouseDown={handleMouseDown}
        ></div>
        <div
          data-testid="max-bullet"
          style={{
            left: `${maxBulletXPercentage}%`,
          }}
        ></div>
      </div>
      <label className={styles.maxValue}>{props.max}€</label>
    </div>
  )
}
