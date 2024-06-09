import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { EditableValue } from '@/ui/editable-value'
import { EditableValueProps } from '@/lib/definitions'

describe('EditableValue', () => {
  const updateBulletPercentage = vi.fn()
  const updateBulletValue = vi.fn()
  const updateCurrentInputValue = vi.fn()
  const resetInputValue = vi.fn()

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  const defaultProps: EditableValueProps = {
    currentValue: 1,
    fixedMode: false,
    maximumValue: 5,
    maxLimitValue: 4,
    minimumValue: 1,
    minLimitValue: 1,
    resetInputValue,
    updateBulletPercentage,
    updateBulletValue,
    updateCurrentInputValue,
  }

  const setup = (props: Partial<EditableValueProps>) => {
    render(<EditableValue {...defaultProps} {...props} />)
  }

  const getValueInput = () => {
    const valueText = `${defaultProps.currentValue}€`
    const label = screen.getByText(valueText)

    fireEvent.click(label)

    return screen.getByRole('spinbutton')
  }

  it('should render a label with the current value', () => {
    setup({})

    expect(screen.getByText(`${defaultProps.currentValue}€`)).toBeDefined()
  })

  it('should hide the label and display an input with the current value when clicking on the label', () => {
    setup({})

    const valueText = `${defaultProps.currentValue}€`

    expect(screen.queryByRole('spinbutton')).toBeNull()

    const label = screen.getByText(valueText)

    fireEvent.click(label)

    expect(screen.queryByText(valueText)).toBeNull()

    const input = screen.getByRole('spinbutton')

    expect(input).toBeDefined()

    const value = Number(input.getAttribute('value'))

    expect(value).toBe(defaultProps.currentValue)
  })

  it('should not display an input when clicking on the label if fixedMode prop is true', () => {
    setup({ fixedMode: true })

    const valueText = `${defaultProps.currentValue}€`

    expect(screen.queryByRole('spinbutton')).toBeNull()

    const label = screen.getByText(valueText)

    fireEvent.click(label)

    expect(screen.queryByRole('spinbutton')).toBeNull()

    const input = screen.queryByRole('spinbutton')

    expect(input).toBeNull()

    expect(screen.getByText(valueText)).toBeDefined()
  })

  it('should call the updateCurrentValue function if the user modifies the value', () => {
    setup({})

    const valueInput = getValueInput()

    const newValue = 3
    fireEvent.change(valueInput, { target: { value: newValue } })

    expect(updateCurrentInputValue).toHaveBeenCalledWith(newValue)

    const errorMessage = screen.queryByText('Invalid value')

    expect(errorMessage).toBeNull()
  })

  it('should display an error message if the new value is higher than the maximum value', () => {
    setup({})

    const valueInput = getValueInput()

    const newValue = 6
    fireEvent.change(valueInput, { target: { value: newValue } })

    const errorMessage = screen.getByText('Invalid value')

    expect(errorMessage).toBeDefined()
  })

  it('should display an error message if the new value is lower than the minimum value', () => {
    setup({})

    const valueInput = getValueInput()

    const newValue = -1
    fireEvent.change(valueInput, { target: { value: newValue } })

    const errorMessage = screen.getByText('Invalid value')

    expect(errorMessage).toBeDefined()
  })

  it('should hide the error message if the new value becomes valid again', () => {
    setup({})

    const valueInput = getValueInput()

    let newValue = -1
    fireEvent.change(valueInput, { target: { value: newValue } })

    let errorMessage = screen.getByText('Invalid value')

    expect(errorMessage).toBeDefined()

    newValue = 4
    fireEvent.change(valueInput, { target: { value: newValue } })

    errorMessage = screen.queryByText('Invalid value')

    expect(errorMessage).toBeNull()
  })

  it('should update the bullet value when the input loses focus', () => {
    setup({})

    let valueInput = getValueInput()

    const newValue = 3
    fireEvent.change(valueInput, { target: { value: newValue } })

    fireEvent.blur(valueInput)

    valueInput = screen.queryByRole('spinbutton')

    expect(valueInput).toBeNull()

    expect(updateBulletValue).toHaveBeenCalledOnce()
    expect(updateBulletPercentage).toHaveBeenCalledOnce()
  })

  it('should not update the bullet if the current input value is invalid when the input loses focus', () => {
    setup({})

    let valueInput = getValueInput()

    const newValue = 6
    fireEvent.change(valueInput, { target: { value: newValue } })

    fireEvent.blur(valueInput)

    valueInput = screen.queryByRole('spinbutton')

    expect(valueInput).toBeNull()

    expect(resetInputValue).toHaveBeenCalledOnce()
    expect(updateBulletValue).not.toHaveBeenCalled()
    expect(updateBulletPercentage).not.toHaveBeenCalled()
  })
})
