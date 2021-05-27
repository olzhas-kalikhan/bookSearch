import BookListItem from 'components/BookListItem/BookListItem'
import Loader from 'components/Loader/Loader'
import Searchbar from 'components/Searchbar/Searchbar'
import React, { useEffect, useState } from 'react'
import { getBookBySearchTerm } from 'services/booksAPI'
import { sortedArrayBy } from 'utilities/sortBy'
import './BookList.styles.css'

/**
 * Component to display booklist
 * @component
 * @example
 * return <BookList />
 */

const BookList = () => {
  const [bookData, setBookData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [sortType, setSortType] = useState({
    field: 'title',
    isAscending: true,
  })
  const toggleTitleSort = (isAscending) =>
    setSortType({
      field: 'title',
      isAscending,
    })
  const toggleDateSort = (isAscending) =>
    setSortType({
      field: 'first_publish_year',
      isAscending,
    })

  const fetchBooks = async (searchTerm) => {
    try {
      setIsLoading(true)
      const data = await getBookBySearchTerm(searchTerm)
      setBookData(data.docs)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks('Gatsby')
  }, [])

  useEffect(() => {
    setBookData((prevState) =>
      sortedArrayBy([...prevState], sortType.field, sortType.isAscending),
    )
  }, [sortType])
  return (
    <>
      <header>
        <Searchbar
          onSearch={fetchBooks}
          actions={{ toggleTitleSort, toggleDateSort }}
        />
      </header>
      <main>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="book-list" data-testid="book-list">
            {bookData.map((bookData, idx) => (
              <BookListItem
                {...bookData}
                bookDataKey={bookData.key}
                key={bookData.key + '' + idx}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default BookList
