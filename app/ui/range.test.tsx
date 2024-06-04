import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Range } from './range'

describe('Range component', () => {
  it('should render the Range component succesfully', () => {
    render(<Range />)

    expect(screen.getByText('Range component')).toBeDefined()
  })
})
