import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Bullet } from '@/ui/bullet'
import { BulletProps } from '@/lib/definitions'

describe('Bullet', () => {
  const updatePercentage = vi.fn()
  const updateValue = vi.fn()

  afterEach(() => {
    cleanup()
  })

  const defaultProps: BulletProps = {
    currentPercentage: 0,
    maximumPosition: 500,
    maximumValue: 5,
    minimumPosition: 0,
    minimumValue: 1,
    rangeLineLeftOffset: 100,
    rangeLineLength: 500,
    updatePercentage,
    updateValue,
  }

  const setup = (props: Partial<BulletProps>) => {
    render(<Bullet {...defaultProps} {...props} />)
  }

  it('should render the bullet element correctly', () => {
    setup({})

    expect(screen.getByTestId('bullet')).toBeDefined()
  })

  describe('Start position', () => {
    it('should be placed at 0% on the first render', () => {
      setup({})

      const minBullet = screen.getByTestId('bullet')

      expect(minBullet.style.left).toBe('0%')
    })

    it('should be placed at 67% on the first render', () => {
      const currentPercentage = 67

      setup({ currentPercentage })

      const minBullet = screen.getByTestId('bullet')

      expect(minBullet.style.left).toBe(`${currentPercentage}%`)
    })

    it('should be placed at 100% on the first render', () => {
      const currentPercentage = 100

      setup({ currentPercentage })

      const minBullet = screen.getByTestId('bullet')

      expect(minBullet.style.left).toBe(`${currentPercentage}%`)
    })
  })

  it('should call the updatePercentage and updateValue functions when the user moves the bullet', () => {
    setup({})

    const minBullet = screen.getByTestId('bullet')

    fireEvent.mouseDown(minBullet)

    fireEvent.mouseMove(minBullet, {
      clientX: 50,
    })

    expect(updatePercentage).toHaveBeenCalledOnce()
    expect(updateValue).toHaveBeenCalledOnce()
  })
})
