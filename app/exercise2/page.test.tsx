import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import FixedValuesRange from '@/exercise2/page'

const { getFixedValuesRangeData } = vi.hoisted(() => {
  return {
    getFixedValuesRangeData: vi.fn().mockResolvedValue({
      valueRange: [1, 2, 3, 4],
    }),
  }
})

vi.mock('@/lib/range-services', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/lib/range-services')>()
  return {
    ...mod,
    getFixedValuesRangeData,
  }
})

describe('Exercise 2', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render the exercise 2 page with a range component', async () => {
    render(<FixedValuesRange />)

    const rangeComponent = screen.findByTestId('range-container')
    const heading = await screen.findByRole('heading', {
      name: 'Fixed values Range',
      level: 2,
    })

    expect(rangeComponent).toBeDefined()
    expect(heading).toBeDefined()
  })

  it('should initialize the range values from the API call', async () => {
    const mockData = {
      valueRange: [5, 7.5, 11, 24],
    }
    getFixedValuesRangeData.mockResolvedValueOnce(mockData)

    render(<FixedValuesRange />)

    const minValue = await screen.findByText(`${mockData.valueRange[0]}€`)
    const numberOfFixedValues = mockData.valueRange.length
    const maxValue = await screen.findByText(
      `${mockData.valueRange[numberOfFixedValues - 1]}€`,
    )

    expect(minValue).toBeDefined()
    expect(maxValue).toBeDefined()
  })

  it('should show an error if the API call fails', async () => {
    const errorMessage = 'There was an error'
    getFixedValuesRangeData.mockRejectedValueOnce(errorMessage)

    render(<FixedValuesRange />)

    const errorNode = await screen.findByText(errorMessage)

    expect(errorNode).toBeDefined()
  })
})
