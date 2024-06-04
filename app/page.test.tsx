import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

test('Home', () => {
  render(<Home />)

  const paragraph = screen.getByRole('paragraph')

  expect(paragraph).toBeDefined()
  expect(paragraph.textContent).toBe("Here will be the Range component")
})
