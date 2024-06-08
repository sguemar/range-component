import { FormEvent, useState } from 'react'

import { EditableValueProps } from '@/lib/definitions'

export const EditableValue = ({
  currentValue,
  maximumValue,
  maxLimitValue,
  minimumValue,
  minLimitValue,
  updateBulletPercentage,
  resetInputValue,
  updateBulletValue,
  updateCurrentInputValue,
}: EditableValueProps) => {
  const [isEditingValue, setIsEditingValue] = useState(false)
  const [isInvalidValue, setIsInvalidValue] = useState(false)

  const getPercentageByValue = (newValue: number) =>
    ((newValue - minimumValue) * 100) / (maximumValue - minimumValue)

  const handleClickLabel = () => {
    setIsEditingValue(true)
  }

  const handleValueChange = (e: FormEvent<HTMLInputElement>) => {
    const newValue = Number(e.currentTarget.value)
    updateCurrentInputValue(newValue)
    if (newValue > maxLimitValue || newValue < minLimitValue) {
      setIsInvalidValue(true)
      return
    }
    setIsInvalidValue(false)
  }

  const handleValueBlur = () => {
    setIsEditingValue(false)

    if (isInvalidValue) {
      setIsInvalidValue(false)
      resetInputValue()
    } else {
      updateBulletValue(Number(currentValue.toFixed(2)))
      updateBulletPercentage(getPercentageByValue(currentValue))
    }
  }

  return (
    <>
      {!isEditingValue ? (
        <label onClick={handleClickLabel}>{currentValue}€</label>
      ) : (
        <div>
          <input
            onBlur={handleValueBlur}
            onChange={handleValueChange}
            type="number"
            value={currentValue}
          />
          {isInvalidValue && <p>Invalid value</p>}
        </div>
      )}
    </>
  )
}
