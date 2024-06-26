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
  it('should render the exercise 1 page with a range component', async () => {
    render(<NormalRange />)

    const rangeComponent = screen.findByTestId('range-container')
    const heading = await screen.findByRole('heading', {
      name: 'Normal Range',
      level: 2,
    })

    expect(rangeComponent).toBeDefined()
    expect(heading).toBeDefined()
  })

  it('should initialize the range values from the API call', async () => {
    const mockData = {
      min: 8,
      max: 99,
    }
    getNormalRangeData.mockResolvedValueOnce(mockData)

    render(<NormalRange />)

    const minValue = await screen.findByText(`${mockData.min}€`)
    const maxValue = await screen.findByText(`${mockData.max}€`)

    expect(minValue).toBeDefined()
    expect(maxValue).toBeDefined()
  })

  it('should show an error if the API call fails', async () => {
    const errorMessage = 'There was an error'
    getNormalRangeData.mockRejectedValueOnce(errorMessage)

    render(<NormalRange />)

    const errorNode = await screen.findByText(errorMessage)

    expect(errorNode).toBeDefined()
  })
})
