export type RangeProps = {
  min: number
  max: number
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
