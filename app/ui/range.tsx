'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Bullet } from '@/ui/bullet'
import { EditableValue } from '@/ui/editable-value'
import { isRangePropsValid } from '@/lib/utils'
import { RangeLineBounds, RangeProps } from '@/lib/definitions'

import styles from '@/ui/range.module.css'

export const Range = (props: RangeProps) => {
  const [minBulletPercentage, setMinBulletPercentage] = useState(0)
  const [maxBulletPercentage, setMaxBulletPercentage] = useState(100)

  const [currentMinValue, setCurrentMinValue] = useState(props.min)
  const [currentMaxValue, setCurrentMaxValue] = useState(props.max)

  const [minInputValue, setMinInputValue] = useState(currentMinValue)
  const [maxInputValue, setMaxInputValue] = useState(currentMaxValue)

  const [rangeLineBounds, setRangeLineBounds] = useState<RangeLineBounds>({
    left: 0,
    right: 0,
  })

  const rangeLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (rangeLineRef && rangeLineRef.current) {
      const rect = rangeLineRef.current.getBoundingClientRect()
      setRangeLineBounds({ left: rect.left, right: rect.right })
    }
  }, [])

  useEffect(() => {
    if (props.valueRange !== undefined) {
      const minValue = props.valueRange[0]
      setCurrentMinValue(minValue)
      setMinInputValue(minValue)

      const numberOfValues = props.valueRange.length
      const maxValue = props.valueRange[numberOfValues - 1]
      setCurrentMaxValue(maxValue)
      setMaxInputValue(maxValue)
    }
  }, [props.valueRange])

  const rangeLineLength = useMemo(() => {
    const { left, right } = rangeLineBounds
    return right - left
  }, [rangeLineBounds])

  if (!isRangePropsValid({ ...props })) {
    return <p>Invalid props</p>
  }

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

  const updateMinInputValue = (newValue: number) => {
    setMinInputValue(newValue)
  }

  const resetMinInputValue = () => {
    setMinInputValue(currentMinValue)
  }

  const getMaxBulletMinPosition = () => {
    return (minBulletPercentage * rangeLineLength) / 100 + 1
  }

  const updateMaxBulletPercentage = (newPercentage: number) => {
    setMaxBulletPercentage(newPercentage)
  }

  const updateMaxBulletValue = (newValue: number) => {
    setCurrentMaxValue(newValue)
    setMaxInputValue(newValue)
  }

  const updateMaxInputValue = (newValue: number) => {
    setMaxInputValue(newValue)
  }

  const resetMaxInputValue = () => {
    setMaxInputValue(currentMaxValue)
  }

  return (
    <div className={styles.rangeContainer} data-testid="range-container">
      <EditableValue
        justifySelfRight
        currentValue={minInputValue}
        maximumValue={props.max}
        maxLimitValue={currentMaxValue}
        minimumValue={props.min}
        minLimitValue={props.min}
        resetInputValue={resetMinInputValue}
        updateBulletPercentage={updateMinBulletPercentage}
        updateBulletValue={updateMinBulletValue}
        updateCurrentInputValue={updateMinInputValue}
      />
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
      <EditableValue
        currentValue={maxInputValue}
        maximumValue={props.max}
        maxLimitValue={props.max}
        minimumValue={props.min}
        minLimitValue={currentMinValue}
        resetInputValue={resetMaxInputValue}
        updateBulletPercentage={updateMaxBulletPercentage}
        updateBulletValue={updateMaxBulletValue}
        updateCurrentInputValue={updateMaxInputValue}
      />
    </div>
  )
}
