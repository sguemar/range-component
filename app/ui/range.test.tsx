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

  describe('Manually value editing', () => {
    it('should hide the min value label and display an input with the current min value when clicking on the label', () => {
      setup({})

      const minValueText = `${defaultProps.min}€`

      expect(screen.queryByRole('spinbutton')).toBeNull()

      const minLabel = screen.getByText(minValueText)

      fireEvent.click(minLabel)

      expect(screen.queryByText(minValueText)).toBeNull()

      const minValueInput = screen.getByRole('spinbutton')

      expect(minValueInput).toBeDefined()

      const value = Number(minValueInput.getAttribute('value'))

      expect(value).toBe(defaultProps.min)
    })

    it('should change the input value if it is valid', () => {
      setup({})

      const minValueText = `${defaultProps.min}€`
      const minLabel = screen.getByText(minValueText)

      fireEvent.click(minLabel)

      const minValueInput = screen.getByRole('spinbutton')

      const newValue = 3
      fireEvent.change(minValueInput, { target: { value: newValue } })

      const value = Number(minValueInput.getAttribute('value'))

      expect(value).toBe(newValue)

      const errorMessage = screen.queryByText('Invalid value')

      expect(errorMessage).toBeNull()
    })

    it('should display an error message if the new value is higher than the maximum value', () => {
      setup({})

      const minValueText = `${defaultProps.min}€`
      const minLabel = screen.getByText(minValueText)

      fireEvent.click(minLabel)

      const minValueInput = screen.getByRole('spinbutton')

      const newValue = 6
      fireEvent.change(minValueInput, { target: { value: newValue } })

      const errorMessage = screen.getByText('Invalid value')

      expect(errorMessage).toBeDefined()
    })

    it('should display an error message if the new value is lower than the minimum value', () => {
      setup({})

      const minValueText = `${defaultProps.min}€`
      const minLabel = screen.getByText(minValueText)

      fireEvent.click(minLabel)

      const minValueInput = screen.getByRole('spinbutton')

      const newValue = -1
      fireEvent.change(minValueInput, { target: { value: newValue } })

      const errorMessage = screen.getByText('Invalid value')

      expect(errorMessage).toBeDefined()
    })

    it('should hide the error message if the new value becomes valid again', () => {
      setup({})

      const minValueText = `${defaultProps.min}€`
      const minLabel = screen.getByText(minValueText)

      fireEvent.click(minLabel)

      const minValueInput = screen.getByRole('spinbutton')

      let newValue = -1
      fireEvent.change(minValueInput, { target: { value: newValue } })

      let errorMessage = screen.getByText('Invalid value')

      expect(errorMessage).toBeDefined()

      newValue = 4
      fireEvent.change(minValueInput, { target: { value: newValue } })

      errorMessage = screen.queryByText('Invalid value')

      expect(errorMessage).toBeNull()
    })

    it('should display the min value label again with the new value when the input loses focus', () => {
      setup({})

      let minValueText = `${defaultProps.min}€`
      let minLabel = screen.getByText(minValueText)

      fireEvent.click(minLabel)

      let minValueInput = screen.getByRole('spinbutton')

      const newValue = 3.5
      fireEvent.change(minValueInput, { target: { value: newValue } })

      fireEvent.blur(minValueInput)

      minValueInput = screen.queryByRole('spinbutton')

      expect(minValueInput).toBeNull()

      minValueText = `${newValue}€`

      minLabel = screen.getByText(minValueText)
      expect(minLabel).toBeDefined()
    })

    it('should update the min bullet after the manual modification', () => {
      setup({})

      let minValueText = `${defaultProps.min}€`
      let minLabel = screen.getByText(minValueText)

      fireEvent.click(minLabel)

      let minValueInput = screen.getByRole('spinbutton')

      const newValue = 3
      fireEvent.change(minValueInput, { target: { value: newValue } })

      fireEvent.blur(minValueInput)

      const bullets = screen.getAllByTestId('bullet')
      const minBullet = bullets[0]

      expect(minBullet.style.left).toBe('50%')
    })
  })
})
