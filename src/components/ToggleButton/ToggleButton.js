import React, { useState } from 'react'
import ArrowUp from 'icons/arrow-up.svg'
import ArrowDown from 'icons/arrow-down.svg'
import './ToggleButton.styles.css'
/**
 * Component to display booklist
 * @component
 * @param {object} props
 * @param {function} props.onClick
 * @param {Number} props.idx used for mutually exclusive toggle group
 * @param {Number} props.currentActive index of current active toggle button in a group
 * @param {string} props.testid
 * @example
 * return <BookList />
 */

const ToggleButton = ({
  children,
  onClick,
  idx,
  currentActive,
  setCurrentActive,
  testid,
}) => {
  const [toggleValue, setToggleValue] = useState(null)
  const handleButtonClick = () => {
    setCurrentActive(idx)
    setToggleValue(!toggleValue)
    onClick(!toggleValue)
  }
  return (
    <button
      data-testid={testid}
      className={`toggle-button ${
        currentActive === idx && 'toggle-button-active'
      }`}
      onClick={handleButtonClick}
    >
      {children}
      {currentActive === idx && (
        <img
          alt={toggleValue ? 'arrow up' : 'arrow down'}
          src={toggleValue ? ArrowUp : ArrowDown}
        />
      )}
    </button>
  )
}

export default ToggleButton
