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
import ToggleButton from './ToggleButton'

describe('toggle button component', () => {
  test('should change icon on click', () => {
    const onClick = jest.fn(() => {})
    const setCurrentActive = jest.fn(() => {})
    render(
      <ToggleButton
        onClick={onClick}
        idx={0}
        currentActive={0}
        setCurrentActive={setCurrentActive}
      >
        Button
      </ToggleButton>,
    )
    const button = screen.getByText('Button')
    expect(button).toBeInTheDocument()
    const NumOfClicks = 50
    for (let i = 0; i < NumOfClicks; i++) {
      fireEvent.click(button)
      if (i % 2 === 0) {
        const imgArrowUp = screen.getByAltText('arrow up')
        expect(imgArrowUp).toBeInTheDocument()
      } else {
        const imgArrowDown = screen.getByAltText('arrow down')
        expect(imgArrowDown).toBeInTheDocument()
      }
    }
    expect(onClick).toBeCalledTimes(NumOfClicks)
  })
})
