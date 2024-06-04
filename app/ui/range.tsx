import { RangeProps } from '@/lib/definitions'

import styles from './range.module.css'

export const Range = (props: RangeProps) => {
  return (
    <>
      <label>{props.min}€</label>
      <div
        className={styles.rangeContainer}
        data-testid="range-container"
      ></div>
    </>
  )
}
