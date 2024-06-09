import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import NormalRange from '@/exercise1/page'

describe('Exercise 1', () => {
  it('should render the exercise 1 page with a range component', () => {
    render(<NormalRange />)

    expect(screen.getByRole('heading', { name: 'Normal Range', level: 2 }))
    expect(screen.getByTestId('range-container'))
  })
})
