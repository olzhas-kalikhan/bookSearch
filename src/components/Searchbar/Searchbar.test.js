import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
  cleanup,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Searchbar from './Searchbar'
afterEach(cleanup)
describe('Searchbar component', () => {
  test('should update value when user types', async () => {
    const onSearch = jest.fn(() => {})
    render(<Searchbar onSearch={onSearch} actions={{}} />)
    const searchInput = await screen.findByPlaceholderText('Search book title')
    await waitFor(() => {
      expect(searchInput).toBeInTheDocument()
    })
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'harry potter' } })
    })
    await waitFor(() => {
      expect(searchInput).toHaveValue('harry potter')
    })
  })
})
