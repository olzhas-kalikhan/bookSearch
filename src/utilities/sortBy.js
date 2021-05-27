/**
 * Sorts Array of objects by provided field in provided direction
 * @param {Array} arrayToSort array of objects to sort
 * @param {string} field
 * @param {boolean} ascending
 * @returns {Array} sorted array
 */

const sortedArrayBy = (arrayToSort, field, ascending) => {
  let sortedArray = arrayToSort
  sortedArray.sort((a, b) => {
    let fieldA = a[field] || 0
    let fieldB = b[field] || 0

    if (fieldA < fieldB) return ascending ? -1 : 1
    if (fieldA > fieldB) return ascending ? 1 : -1
    return 0
  })
  return sortedArray
}
export { sortedArrayBy }
