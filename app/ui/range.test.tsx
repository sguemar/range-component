import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, test } from 'vitest'

import { Range } from '@/ui/range'
import { RangeProps } from '@/lib/definitions'

describe('Range component', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Normal mode', () => {
    const defaultProps: RangeProps = {
      min: 1,
      max: 5,
    }

    const setup = (props: Partial<RangeProps>) => {
      render(<Range {...defaultProps} {...props} />)
    }

    it('should render the Range component successfully', () => {
      setup({})

      expect(screen.getByTestId('range-container')).toBeDefined()
    })

    it('should display a label with the min value passed by params', () => {
      setup({})

      expect(screen.getByText(`${defaultProps.min}€`)).toBeDefined()
    })

    it('should display a label with the max value passed by params', () => {
      setup({})

      expect(screen.getByText(`${defaultProps.max}€`)).toBeDefined()
    })

    it('should render two bullet elements', () => {
      setup({})

      expect(screen.getAllByTestId('bullet')).toHaveLength(2)
    })

    test('the min bullet should be placed at the start position on the first render', () => {
      setup({})

      const bullets = screen.getAllByTestId('bullet')
      const minBullet = bullets[0]

      expect(minBullet.style.left).toBe('0%')
    })

    test('the max bullet should be placed at the end position on the first render', () => {
      setup({})

      const bullets = screen.getAllByTestId('bullet')
      const minBullet = bullets[1]

      expect(minBullet.style.left).toBe('100%')
    })

    describe('Manually value editing', () => {
      it('should update the min bullet after the manual modification', () => {
        setup({})

        let minValueText = `${defaultProps.min}€`
        let minLabel = screen.getByText(minValueText)

        fireEvent.click(minLabel)

        let minValueInput = screen.getByRole('spinbutton')

        const newValue = 3
        fireEvent.change(minValueInput, { target: { value: newValue } })

        fireEvent.blur(minValueInput)

        const bullets = screen.getAllByTestId('bullet')
        const minBullet = bullets[0]

        expect(minBullet.style.left).toBe('50%')
      })

      it('should update the max bullet after the manual modification', () => {
        setup({})

        let maxValueText = `${defaultProps.max}€`
        let maxLabel = screen.getByText(maxValueText)

        fireEvent.click(maxLabel)

        let maxValueInput = screen.getByRole('spinbutton')

        const newValue = 3
        fireEvent.change(maxValueInput, { target: { value: newValue } })

        fireEvent.blur(maxValueInput)

        const bullets = screen.getAllByTestId('bullet')
        const maxBullet = bullets[1]

        expect(maxBullet.style.left).toBe('50%')
      })

      it('should not update the min bullet if the current input value is invalid', () => {
        setup({})

        let minValueText = `${defaultProps.min}€`
        let minLabel = screen.getByText(minValueText)

        fireEvent.click(minLabel)

        let minValueInput = screen.getByRole('spinbutton')

        const newValue = 6
        fireEvent.change(minValueInput, { target: { value: newValue } })

        fireEvent.blur(minValueInput)

        const bullets = screen.getAllByTestId('bullet')
        const minBullet = bullets[0]

        expect(minBullet.style.left).toBe('0%')
      })

      it('should not update the max bullet if the current input value is invalid', () => {
        setup({})

        let maxValueText = `${defaultProps.max}€`
        let maxLabel = screen.getByText(maxValueText)

        fireEvent.click(maxLabel)

        let maxValueInput = screen.getByRole('spinbutton')

        const newValue = 6
        fireEvent.change(maxValueInput, { target: { value: newValue } })

        fireEvent.blur(maxValueInput)

        const bullets = screen.getAllByTestId('bullet')
        const maxBullet = bullets[0]

        expect(maxBullet.style.left).toBe('0%')
      })
    })
  })

  describe('Fixed values mode', () => {
    const defaultProps: RangeProps = {
      valueRange: [1, 2, 3, 4],
    }

    const setup = (props: Partial<RangeProps>) => {
      render(<Range {...defaultProps} {...props} />)
    }

    it('should render the Range component successfully', () => {
      setup({})

      expect(screen.getByTestId('range-container')).toBeDefined()
    })

    it('should display the min label with the first value of the value range passed by params', async () => {
      setup({})

      const minLabel = await screen.findByText(`${defaultProps.valueRange[0]}€`)

      expect(minLabel).toBeDefined()
    })

    it('should display the max label with the last value of the value range passed by params', async () => {
      setup({})

      const numberOfValues = defaultProps.valueRange.length
      const maxLabel = await screen.findByText(
        `${defaultProps.valueRange[numberOfValues - 1]}€`,
      )

      expect(maxLabel).toBeDefined()
    })

    it('should not display an input when clicking on the min label', async () => {
      setup({})

      expect(screen.queryByRole('spinbutton')).toBeNull()

      const minLabel = await screen.findByText(`${defaultProps.valueRange[0]}€`)

      expect(minLabel).toBeDefined()

      fireEvent.click(minLabel)

      expect(screen.queryByRole('spinbutton')).toBeNull()
    })

    it('should not display an input when clicking on the max label', async () => {
      setup({})

      expect(screen.queryByRole('spinbutton')).toBeNull()

      const numberOfValues = defaultProps.valueRange.length
      const maxLabel = await screen.findByText(
        `${defaultProps.valueRange[numberOfValues - 1]}€`,
      )

      expect(maxLabel).toBeDefined()

      fireEvent.click(maxLabel)

      expect(screen.queryByRole('spinbutton')).toBeNull()
    })
  })

  describe('Invalid props', () => {
    const setup = (props: Partial<RangeProps>) => {
      render(<Range {...props} />)
    }

    it('should render an error message if all props are undefined', () => {
      setup({
        max: undefined,
        min: undefined,
        valueRange: undefined,
      })

      const errorMessage = screen.getByRole('paragraph')

      expect(errorMessage).toBeDefined()
      expect(errorMessage.textContent).toBe('Invalid props')
      expect(screen.queryByTestId('range-container')).toBeNull()
    })

    it('should render an error message if only the max prop is passed', () => {
      setup({
        max: 100,
        min: undefined,
        valueRange: undefined,
      })

      const errorMessage = screen.getByRole('paragraph')

      expect(errorMessage).toBeDefined()
      expect(errorMessage.textContent).toBe('Invalid props')
      expect(screen.queryByTestId('range-container')).toBeNull()
    })

    it('should render an error message if only the min prop is passed', () => {
      setup({
        max: undefined,
        min: 0,
        valueRange: undefined,
      })

      const errorMessage = screen.getByRole('paragraph')

      expect(errorMessage).toBeDefined()
      expect(errorMessage.textContent).toBe('Invalid props')
      expect(screen.queryByTestId('range-container')).toBeNull()
    })

    it('should render an error message if all props are passed', () => {
      setup({
        max: 100,
        min: 0,
        valueRange: [1, 2, 3],
      })

      const errorMessage = screen.getByRole('paragraph')

      expect(errorMessage).toBeDefined()
      expect(errorMessage.textContent).toBe('Invalid props')
      expect(screen.queryByTestId('range-container')).toBeNull()
    })
  })
})
