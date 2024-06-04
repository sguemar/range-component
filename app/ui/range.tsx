import { RangeProps } from '@/lib/definitions'

import styles from './range.module.css'

export const Range = (props: RangeProps) => {
  return (
    <div className={styles.rangeContainer} data-testid="range-container">
      <label className={styles.minValue}>{props.min}€</label>
      <div className={styles.rangeLine}> </div>
    </div>
  )
}
