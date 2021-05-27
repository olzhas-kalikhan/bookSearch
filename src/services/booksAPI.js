/**
 * Sends request to get book data based on IBSN code
 * @param {int || string} IBSN
 * @returns Promise
 */
const getBookByIBSN = (IBSN) => {
  return new Promise((resolve, reject) => {
    fetch(`http://openlibrary.org/api/volumes/brief/isbn/${IBSN}.json`)
      .then((response) => response.json())
      .then((bookData) => resolve(bookData))
      .catch((err) => reject(err))
  })
}
/**
 * ends request to get book data based on search term
 * @param {string} searchTerm
 * @returns Promsise
 */
const getBookBySearchTerm = (searchTerm) => {
  return new Promise((resolve, reject) => {
    fetch(`http://openlibrary.org/search.json?title=${searchTerm}`)
      .then((response) => response.json())
      .then((bookList) => resolve(bookList))
      .catch((err) => reject(err))
  })
}
export { getBookByIBSN, getBookBySearchTerm }
