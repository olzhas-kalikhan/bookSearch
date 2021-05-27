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
import BookList from './BookList'
import { getBookBySearchTerm } from 'services/booksAPI'
import MockData from './BookList.mocks.json'
jest.mock('services/booksAPI')
jest.setTimeout(20000)
afterEach(cleanup)
beforeEach(() => {
  getBookBySearchTerm.mockResolvedValue(MockData)
  jest.spyOn(window, 'fetch').mockImplementation((...args) => {
    console.warn('window.fetch is not mocked for this call', ...args)
    return Promise.reject(new Error('This must be mocked!'))
  })
})

describe('BookList Component', () => {
  test('should load and display booklist items', async () => {
    render(<BookList />)

    const loader = await screen.findByTestId('loader')
    const bookList = await screen.findByTestId('book-list')
    const bookListItems = await screen.findAllByTestId('book-list-item')

    await waitFor(() => {
      expect(getBookBySearchTerm).toHaveBeenCalledTimes(1)
      expect(loader).not.toBeInTheDocument()
      expect(bookList).toBeInTheDocument()
      expect(bookListItems).toHaveLength(MockData.docs.length)
    })
  })

  test('should update booklist items when search input value is changed', async () => {
    render(<BookList />)
    await waitFor(() => {
      expect(getBookBySearchTerm).toBeCalledTimes(1)
    })
    const searchInput = await screen.findByPlaceholderText('Search book title')
    act(() => {
      fireEvent.change(searchInput, { target: { value: 'harry potter' } })
    })

    const bookList = await screen.findByTestId('book-list')

    const bookListItems = await screen.findAllByTestId('book-list-item')

    await waitFor(() => {
      expect(getBookBySearchTerm).toBeCalledTimes(1)
      expect(bookList).toBeInTheDocument()
      expect(bookListItems).toHaveLength(MockData.docs.length)
    })
  })

  test('should be sorted by title when clicked on title button', async () => {
    render(<BookList />)
    const buttonTitleSort = await screen.findByTestId('button-title-sort')
    expect(buttonTitleSort).toBeInTheDocument()
    fireEvent.click(buttonTitleSort)
    let bookTitles = await screen.findAllByTestId('book-title')
    let sorted = isSorted(bookTitles, true)

    expect(sorted).toBeTruthy()

    fireEvent.click(buttonTitleSort)
    bookTitles = await screen.findAllByTestId('book-title')
    sorted = isSorted(bookTitles, false)
    expect(sorted).toBeTruthy()
  })
})
/**
 *
 * @param {Array} bookTitles
 * @param {boolean} ascending
 * @returns {boolean}
 */
const isSorted = (bookTitles, ascending) => {
  let sorted = true
  for (let i = 0; i < bookTitles.length - 1; i++) {
    if (
      !checkDiff(
        ascending,
        bookTitles[i].textContent,
        bookTitles[i + 1].textContent,
      )
    ) {
      sorted = false
      break
    }
  }
  return sorted
}
/**
 * Returns checks if two strings positive or negative difference between based on @param ascending
 * @param {boolean} ascending
 * @param {string} elementA
 * @param {string} elementB
 * @returns {boolean}
 */
const checkDiff = (ascending, a, b) => {
  return ascending ? a <= b : a >= b
}
