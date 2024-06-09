import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import NormalRange from '@/exercise1/page'

const { getNormalRangeData } = vi.hoisted(() => {
  return {
    getNormalRangeData: vi.fn().mockResolvedValue({
      min: 1,
      max: 100,
    }),
  }
})

vi.mock('@/lib/range-services', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/lib/range-services')>()
  return {
    ...mod,
    getNormalRangeData,
  }
})

describe('Exercise 1', () => {
  it('should render the exercise 1 page with a range component', () => {
    render(<NormalRange />)

    const rangeComponent = screen.findByTestId('range-container')

    expect(screen.getByRole('heading', { name: 'Normal Range', level: 2 }))
    expect(rangeComponent).toBeDefined()
  })

  it('should initialize the range values from the API call', async () => {
    const mockData = {
      min: 8,
      max: 99,
    }
    getNormalRangeData.mockResolvedValue(mockData)

    render(<NormalRange />)

    const minValue = await screen.findByText(`${mockData.min}€`)
    const maxValue = await screen.findByText(`${mockData.max}€`)

    expect(minValue).toBeDefined()
    expect(maxValue).toBeDefined()
  })
})
