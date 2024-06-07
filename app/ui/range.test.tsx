import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Range } from '@/ui/range'
import { RangeProps } from '@/lib/definitions'

describe('Range component', () => {
  afterEach(() => {
    cleanup()
  })

  const defaultProps = {
    min: 1,
    max: 5,
  }

  const setup = (props: Partial<RangeProps>) => {
    render(<Range {...defaultProps} {...props} />)
  }

  it('should render the Range component successfully', () => {
    setup({})

    expect(screen.getByTestId('range-container')).toBeDefined()
  })

  it('should display a label with the min value passed by params', () => {
    setup({})

    expect(screen.getByText(`${defaultProps.min}€`)).toBeDefined()
  })

  it('should display a label with the max value passed by params', () => {
    setup({})

    expect(screen.getByText(`${defaultProps.max}€`)).toBeDefined()
  })

  describe('Min bullet', () => {
    it('should render a bullet element to select the minimum value', () => {
      setup({})

      expect(screen.getByTestId('min-bullet')).toBeDefined()
    })

    it('should be placed at the start position on the first render', () => {
      setup({})

      const minBullet = screen.getByTestId('min-bullet')

      expect(minBullet.style.left).toBe('0%')
    })
  })

  describe('Max bullet', () => {
    it('should render a bullet element to select the maximum value', () => {
      setup({})

      expect(screen.getByTestId('max-bullet')).toBeDefined()
    })

    it('should be placed at the end position on the first render', () => {
      setup({})

      const max = screen.getByTestId('max-bullet')

      expect(max.style.left).toBe('100%')
    })
  })
})
