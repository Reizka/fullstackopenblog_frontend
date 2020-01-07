import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/__mocks__/blogs')
import App from './App'

describe('<App />', () => {
  test('renders all blogs it gets from backend', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blogpost')
    )

    const blogs = component.container.querySelectorAll('.blogpost')
    expect(blogs.length).toBe(4)

    expect(component.container).toHaveTextContent(
      'done with'
    )
    expect(component.container).toHaveTextContent(
      'react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'testing is'
    )
  })
})