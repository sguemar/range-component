import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Range } from './range'

describe('Range component', () => {

  afterEach(() => {
    cleanup()
  })

  it('should render the Range component succesfully', () => {
    render(<Range min={1} />)

    expect(screen.getByTestId('range-container')).toBeDefined()
  })

  it('should display a label with the min value passed by params', () => {
    const minValue = 1
    render(<Range min={minValue} />)

    expect(screen.getByText(`${minValue}€`)).toBeDefined()
  })
})
