'use client'

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

import { RangeProps } from '@/lib/definitions'

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
    if (e.clientX > right || e.clientX < left) return

    const bulletPosition = ((e.clientX - left) * 100) / 500
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
          className={styles.minBullet}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <label className={styles.maxValue}>{props.max}€</label>
    </div>
  )
}
