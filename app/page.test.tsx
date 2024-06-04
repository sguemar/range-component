import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import Home from '@/page'

describe('Home', () => {
  it('should render the range component', () => {
    render(<Home />)

    expect(screen.getByTestId('range-container')).toBeDefined()
  })
})
