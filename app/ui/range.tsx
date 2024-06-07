'use client'

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

import { Bullets } from '@/lib/constants'
import { limitBulletPosition } from '@/lib/utils'
import { RangeProps } from '@/lib/definitions'

import styles from '@/ui/range.module.css'

export const Range = (props: RangeProps) => {
  const [minBulletXPercentage, setMinBulletPercentage] = useState(0)
  const [maxBulletXPercentage, setMaxBulletPercentage] = useState(100)

  const [currentMinValue, setCurrentMinValue] = useState(props.min)
  const [currentMaxValue, setCurrentMaxValue] = useState(props.max)

  const [isMouseDown, setIsMouseDown] = useState(false)
  const [selectedBullet, setSelectedBullet] = useState<Bullets>(null)

  const rangeLineRef = useRef<HTMLDivElement>(null)

  const stopDragging = () => {
    setIsMouseDown(false)
    setSelectedBullet(null)
  }

  const handleMouseMove = useCallback(
    (e) => {
      const { left, right } = rangeLineRef.current.getBoundingClientRect()
      const rangeLineLength = right - left

      let limitedBulletPosition = 0
      if (selectedBullet === Bullets.Min) {
        limitedBulletPosition = limitBulletPosition({
          current: e.clientX - left,
          max: (maxBulletXPercentage * rangeLineLength) / 100 - 1,
          min: 0,
        })
        const bulletPercentage = (limitedBulletPosition * 100) / rangeLineLength
        setMinBulletPercentage(bulletPercentage)

        const newMinValue =
          ((props.max - props.min) * bulletPercentage) / 100 + props.min
        setCurrentMinValue(Number(newMinValue.toFixed(2)))
      }

      if (selectedBullet === Bullets.Max) {
        limitedBulletPosition = limitBulletPosition({
          current: e.clientX - left,
          max: rangeLineLength,
          min: (minBulletXPercentage * rangeLineLength) / 100 + 1,
        })
        const bulletPercentage = (limitedBulletPosition * 100) / rangeLineLength
        setMaxBulletPercentage(bulletPercentage)

        const newMaxValue =
          ((props.max - props.min) * bulletPercentage) / 100 + props.min
        setCurrentMaxValue(Number(newMaxValue.toFixed(2)))
      }
    },
    [
      maxBulletXPercentage,
      minBulletXPercentage,
      props.max,
      props.min,
      selectedBullet,
    ],
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

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>, bullet: Bullets) => {
    e.preventDefault()
    setIsMouseDown(true)
    setSelectedBullet(bullet)
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
          className={`${styles.bullet} ${isMouseDown ? styles.grabbing : ''}`}
          onMouseDown={(e) => handleMouseDown(e, Bullets.Min)}
        ></div>
        <div
          data-testid="max-bullet"
          style={{
            left: `${maxBulletXPercentage}%`,
          }}
          className={`${styles.bullet} ${isMouseDown ? styles.grabbing : ''}`}
          onMouseDown={(e) => handleMouseDown(e, Bullets.Max)}
        ></div>
      </div>
      <label className={styles.maxValue}>{currentMaxValue}€</label>
    </div>
  )
}
