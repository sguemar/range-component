import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import NormalRange from '@/exercise1/page'

vi.mock('@/lib/range-services', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/lib/range-services')>()
  return {
    ...mod,
    getNormalRangeData: vi.fn().mockResolvedValue({
      min: 1,
      max: 100,
    }),
  }
})

describe('Exercise 1', () => {
  it('should render the exercise 1 page with a range component', () => {
    render(<NormalRange />)

    expect(screen.getByRole('heading', { name: 'Normal Range', level: 2 }))
    expect(screen.getByTestId('range-container'))
  })

  it('should initialize the range values from the API call', () => {
    render(<NormalRange />)

    expect(screen.findByText('100€')).toBeDefined()
    expect(screen.findByText('1€')).toBeDefined()
  })
})
