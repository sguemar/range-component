import { MouseEvent, useCallback, useEffect, useState } from 'react'

import { BulletProps } from '@/lib/definitions'

export const Bullet = ({
  startPosition,
  updatePercentage,
  updateValue,
}: BulletProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsMouseDown(true)
  }

  const handleMouseMove = useCallback(
    (e) => {
      updatePercentage(1)
      updateValue(1)
    },
    [updatePercentage, updateValue],
  )

  useEffect(() => {
    if (isMouseDown) {
      document.addEventListener('mousemove', handleMouseMove)
    }
    return () => {
      if (isMouseDown) {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [handleMouseMove, isMouseDown])

  return (
    <div
      data-testid="bullet"
      style={{
        left: `${startPosition}%`,
      }}
      onMouseDown={handleMouseDown}
    ></div>
  )
}
