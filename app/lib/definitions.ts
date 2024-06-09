export type RangeProps = {
  min: number
  max: number
}

export type NormalRangeResponse = {
  max: number
  min: number
}

export type EditableValueProps = {
  justifySelfRight?: boolean
  currentValue: number
  maximumValue: number
  maxLimitValue: number
  minimumValue: number
  minLimitValue: number
  resetInputValue: () => void
  updateBulletPercentage: (newPercentage: number) => void
  updateBulletValue: (newValue: number) => void
  updateCurrentInputValue: (newValue: number) => void
}

export type BulletProps = {
  currentPercentage: number
  maximumPosition: number
  maximumValue: number
  minimumPosition: number
  minimumValue: number
  rangeLineLeftOffset: number
  rangeLineLength: number
  updatePercentage: (newPercentage: number) => void
  updateValue: (newValue: number) => void
}

export type LimitBulletPositionParams = {
  current: number
  max: number
  min: number
}

export type RangeLineBounds = {
  left: number
  right: number
}
