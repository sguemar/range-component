import { FormEvent, useState } from 'react'

import { EditableValueProps } from '@/lib/definitions'

import styles from '@/ui/editable-value.module.css'

export const EditableValue = ({
  currentValue,
  fixedMode,
  justifySelfRight = false,
  maximumValue,
  maxLimitValue,
  minimumValue,
  minLimitValue,
  resetInputValue,
  updateBulletPercentage,
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

  const label = (
    <label
      className={`${styles.label} ${justifySelfRight ? styles.justifySelfRight : ''} ${!fixedMode ? styles.cursorPointer : ''}`}
      onClick={handleClickLabel}
    >
      {currentValue}€
    </label>
  )

  if (fixedMode) return label

  return (
    <>
      {!isEditingValue ? (
        label
      ) : (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            onBlur={handleValueBlur}
            onChange={handleValueChange}
            type="number"
            value={currentValue}
          />
          <span className={styles.currencySymbol}>€</span>
          {isInvalidValue && (
            <p className={styles.errorMessage}>Invalid value</p>
          )}
        </div>
      )}
    </>
  )
}
