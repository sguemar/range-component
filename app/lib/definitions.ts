export type RangeProps = {
  min: number
  max: number
}

export type BulletProps = {
  startPosition: number
  updatePercentage: (newPercentage: number) => void
  updateValue: (newValue: number) => void
}

export type LimitBulletPositionParams = {
  current: number
  max: number
  min: number
}
