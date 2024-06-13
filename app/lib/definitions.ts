export type RangeProps = {
  min?: number
  max?: number
  valueRange?: Array<number>
}

export type NormalRangeData = {
  max: number
  min: number
}

export type FixedValuesRangeData = {
  valueRange: Array<number>
}

export type EditableValueProps = {
  currentValue: number
  fixedMode: boolean
  justifySelfRight?: boolean
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
  fixedValues?: Array<number>
  maximumPosition: number
  maximumValue: number
  minimumPosition: number
  minimumValue: number
  rangeLineLeftOffset: number
  rangeLineLength: number
  updatePercentage: (newPercentage: number) => void
  updateValue: (newValue: number) => void
  zIndex: number
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

export type ApiCallHandlerParams<Result> = {
  service: () => Promise<Result>
}

export type UseApi = {
  apiCallHandler: <Result>(
    params: ApiCallHandlerParams<Result>,
  ) => Promise<Result>
  error: string
  isLoading: boolean
}
