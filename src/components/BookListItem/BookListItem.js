import React from 'react'
import './BookListItem.styles.css'
/**
 * Component to display book item and its details.
 * @component
 * @param props.bookDataKey unique key for book item; retruned from book api. Needs separate prop to avoid overwritting 'key' prop
 * @param {String} props.title  book title
 * @param {String} props.cover_i link to image of book cover
 * @param {Array} props.author_name array of book authors' names
 * @param {Number} props.first_publish_year
 * @example
 * return <BookListItem {...bookData} bookDataKey={bookData.key} />
 */

const BookListItem = (props) => {
  const { bookDataKey, title, cover_i, author_name, first_publish_year } = props
  return (
    <div className="book-list-item" data-testid="book-list-item">
      <div className="book-cover" data-testid="book-cover">
        {cover_i && cover_i !== -1 ? (
          <img
            src={`http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}
            alt={`Cover for "${title}" book by ${author_name}`}
          />
        ) : (
          <div className="book-cover-alt ">
            <h4 className="long-title"> {title}</h4>
            {author_name?.map((author, idx) => (
              <h5 key={`${bookDataKey}-${idx}-cover-author`}>{author}</h5>
            ))}
          </div>
        )}
      </div>
      <div className="book-details" data-testid="book-details">
        <h2
          data-testid="book-title"
          className={`${title.length > 100 && 'long-title'}`}
        >
          {title}
        </h2>
        {author_name?.map((author, idx) => (
          <h3 key={`${bookDataKey}-${idx}-author`}>{author}</h3>
        ))}
        <h3> {first_publish_year}</h3>
      </div>
    </div>
  )
}

export default BookListItem
