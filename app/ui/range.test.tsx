import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, test } from 'vitest'

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

  it('should render two bullet elements', () => {
    setup({})

    expect(screen.getAllByTestId('bullet')).toHaveLength(2)
  })

  test('the min bullet should be placed at the start position on the first render', () => {
    setup({})

    const bullets = screen.getAllByTestId('bullet')
    const minBullet = bullets[0]

    expect(minBullet.style.left).toBe('0%')
  })

  test('the max bullet should be placed at the end position on the first render', () => {
    setup({})

    const bullets = screen.getAllByTestId('bullet')
    const minBullet = bullets[1]

    expect(minBullet.style.left).toBe('100%')
  })

  it('should hide the min value label and show an input when clicking on the label', () => {
    setup({})

    const minValueText = `${defaultProps.min}€`

    expect(screen.queryByRole('spinbutton')).toBeNull()

    const minLabel = screen.getByText(minValueText)

    fireEvent.click(minLabel)

    expect(screen.queryByText(minValueText)).toBeNull()

    const minValueInput = screen.getByRole('spinbutton')

    expect(minValueInput).toBeDefined()
  })
})
