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
import BookItemMockData from './BookListItem.mocks.json'
import BookListItem from './BookListItem'
afterEach(cleanup)

describe('BookListItem component', () => {
  test('should display book title, cover, authors and pubslish year', () => {
    render(<BookListItem {...BookItemMockData} />)
    const item = screen.getByTestId('book-list-item')
    const bookCover = screen.getByTestId('book-cover')
    const bookDetails = screen.getByTestId('book-details')
    expect(item).toBeInTheDocument()
    expect(bookCover).toBeInTheDocument()
    expect(bookDetails).toBeInTheDocument()
  })
})
