import React, { useEffect, useRef, useState } from 'react'
import './Searchbar.styles.css'
import SearchIcon from 'icons/search-icon.svg'
import ToggleButton from 'components/ToggleButton/ToggleButton'

/**
 * Displays search input and buttons for sorting
 * @component
 * @param {function} props.onSearch
 * @param {Array} props.action Array of functions for sort buttons
 * @example
 * <Searchbar onSearch={()=>{}} actions={{action1, action2}}
 */
const Searchbar = ({ onSearch, actions }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeButton, setActiveButton] = useState(-1)
  const scrollPosY = useRef(null)
  const [searchBarHidden, setSearchBarHidden] = useState(false)
  const { toggleTitleSort, toggleDateSort } = actions
  const timer = useRef(null)

  const toggleGroup = [
    {
      title: 'Title',
      action: toggleTitleSort,
      testid: 'button-title-sort',
    },
    {
      title: 'Date',
      action: toggleDateSort,
      testid: 'button-date-sort',
    },
  ]
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
    if (timer) clearTimeout(timer.current)
    if (event.target.value.length > 3)
      timer.current = setTimeout(() => {
        onSearch(event.target.value)
        setActiveButton(-1)
      }, 2000)
  }
  const handleScroll = (event) => {
    const window = event.currentTarget
    setSearchBarHidden(scrollPosY.current < window.scrollY)
    scrollPosY.current = window.scrollY
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className={`search-bar ${searchBarHidden && 'search-bar-hidden'}`}>
      <div className="search-bar-input-container">
        <div className="search-bar-input">
          <input
            aria-label="search-bar"
            type="text"
            placeholder="Search book title"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className="search-bar-icon">
            <img alt="search icon" src={SearchIcon} />
          </div>
        </div>
        <div className="search-bar-buttons">
          {toggleGroup.map((toggle, idx) => (
            <ToggleButton
              testid={toggle.testid}
              key={`sort-toggle-button-${idx}`}
              onClick={toggle.action}
              currentActive={activeButton}
              setCurrentActive={setActiveButton}
              idx={idx}
            >
              {toggle.title}
            </ToggleButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Searchbar
