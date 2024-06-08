'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'

import { Bullet } from '@/ui/bullet'
import { RangeLineBounds, RangeProps } from '@/lib/definitions'

import styles from '@/ui/range.module.css'

export const Range = (props: RangeProps) => {
  const [minBulletPercentage, setMinBulletPercentage] = useState(0)
  const [maxBulletPercentage, setMaxBulletPercentage] = useState(100)

  const [currentMinValue, setCurrentMinValue] = useState(props.min)
  const [currentMaxValue, setCurrentMaxValue] = useState(props.max)

  const [isEditingMinValue, setIsEditingMinValue] = useState(false)

  const [isInvalidMinValue, setIsInvalidMinValue] = useState(false)
  const [minInputValue, setMinInputValue] = useState(currentMinValue)

  const [rangeLineBounds, setRangeLineBounds] = useState<RangeLineBounds>({
    left: 0,
    right: 0,
  })

  const rangeLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rect = rangeLineRef.current.getBoundingClientRect()
    setRangeLineBounds({ left: rect.left, right: rect.right })
  }, [])

  const rangeLineLength = useMemo(() => {
    const { left, right } = rangeLineBounds
    return right - left
  }, [rangeLineBounds])

  const getPercentageByValue = (newValue: number) =>
    ((newValue - props.min) * 100) / (props.max - props.min)

  const getMinBulletMaxPosition = () => {
    return (maxBulletPercentage * rangeLineLength) / 100 - 1
  }

  const updateMinBulletPercentage = (newPercentage: number) => {
    setMinBulletPercentage(newPercentage)
  }

  const updateMinBulletValue = (newValue: number) => {
    setCurrentMinValue(newValue)
    setMinInputValue(newValue)
  }

  const getMaxBulletMinPosition = () => {
    return (minBulletPercentage * rangeLineLength) / 100 + 1
  }

  const updateMaxBulletPercentage = (newPercentage: number) => {
    setMaxBulletPercentage(newPercentage)
  }

  const updateMaxBulletValue = (newValue: number) => {
    setCurrentMaxValue(newValue)
  }

  const handleClickMinLabel = () => {
    setIsEditingMinValue(true)
  }

  const handleMinValueChange = (e: FormEvent<HTMLInputElement>) => {
    const newValue = Number(e.currentTarget.value)
    setMinInputValue(newValue)
    if (newValue > currentMaxValue || newValue < props.min) {
      setIsInvalidMinValue(true)
      return
    }
    setIsInvalidMinValue(false)
  }

  const handleMinValueBlur = () => {
    setIsEditingMinValue(false)
    updateMinBulletValue(minInputValue)
    setMinBulletPercentage(getPercentageByValue(minInputValue))
  }

  return (
    <div className={styles.rangeContainer} data-testid="range-container">
      {!isEditingMinValue ? (
        <label
          className={`${styles.minValue} ${styles.label}`}
          onClick={handleClickMinLabel}
        >
          {currentMinValue}€
        </label>
      ) : (
        <div>
          <input
            onBlur={handleMinValueBlur}
            onChange={handleMinValueChange}
            type="number"
            value={minInputValue}
          />
          {isInvalidMinValue && <p>Invalid value</p>}
        </div>
      )}
      <div ref={rangeLineRef} className={styles.rangeLine}>
        <Bullet
          currentPercentage={minBulletPercentage}
          maximumPosition={getMinBulletMaxPosition()}
          maximumValue={props.max}
          minimumPosition={0}
          minimumValue={props.min}
          rangeLineLeftOffset={rangeLineBounds.left}
          rangeLineLength={rangeLineLength}
          updatePercentage={updateMinBulletPercentage}
          updateValue={updateMinBulletValue}
        />

        <Bullet
          currentPercentage={maxBulletPercentage}
          maximumPosition={rangeLineLength}
          maximumValue={props.max}
          minimumPosition={getMaxBulletMinPosition()}
          minimumValue={props.min}
          rangeLineLeftOffset={rangeLineBounds.left}
          rangeLineLength={rangeLineLength}
          updatePercentage={updateMaxBulletPercentage}
          updateValue={updateMaxBulletValue}
        />
      </div>
      <label className={styles.maxValue}>{currentMaxValue}€</label>
    </div>
  )
}
