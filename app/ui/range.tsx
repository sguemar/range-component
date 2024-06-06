import { RangeProps } from '@/lib/definitions'

import styles from './range.module.css'

export const Range = (props: RangeProps) => {
  return (
    <div className={styles.rangeContainer} data-testid="range-container">
      <label className={styles.minValue}>{props.min}€</label>
      <div className={styles.rangeLine}>
        <div
          data-testid="min-bullet"
          style={{
            left: '0%',
          }}
          className={styles.minBullet}
        ></div>
      </div>
      <label className={styles.maxValue}>{props.max}€</label>
    </div>
  )
}
