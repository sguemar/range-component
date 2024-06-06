'use client'

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

import { RangeProps } from '@/lib/definitions'
import { limitBulletPosition } from '@/lib/utils'

import styles from './range.module.css'

export const Range = (props: RangeProps) => {
  const [minBulletXPosition, setMinBulletXPosition] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const rangeLineRef = useRef<HTMLDivElement>(null)

  const stopDragging = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = useCallback((e) => {
    const { left, right } = rangeLineRef.current.getBoundingClientRect()
    const rangeLineLength = right - left
    const limitedBulletPosition = limitBulletPosition(
      e.clientX - left,
      rangeLineLength,
    )
    const bulletPosition = (limitedBulletPosition * 100) / rangeLineLength
    setMinBulletXPosition(bulletPosition)
  }, [])

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
      <label className={styles.minValue}>{props.min}€</label>
      <div ref={rangeLineRef} className={styles.rangeLine}>
        <div
          data-testid="min-bullet"
          style={{
            left: `${minBulletXPosition}%`,
          }}
          className={`${styles.minBullet} ${isMouseDown ? styles.grabbing : ''}`}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <label className={styles.maxValue}>{props.max}€</label>
    </div>
  )
}
