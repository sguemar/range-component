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

  it('should render the Range component succesfully', () => {
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
})
