import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Home from '@/page'

describe('Home', () => {
  it('should render the home page', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'Choose the Range Mode' }),
    ).toBeDefined()
    expect(screen.getByRole('link', { name: 'Normal' })).toBeDefined()
    expect(screen.getByRole('link', { name: 'Fixed values' })).toBeDefined()
  })
})
