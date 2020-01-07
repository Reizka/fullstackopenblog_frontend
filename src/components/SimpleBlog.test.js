import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'
import { prettyDOM } from '@testing-library/dom'
afterEach(cleanup)

test('text is  correct -SimbleBlog', () => {

  const blogPost = {
    title: 'Component testing is done with react-testing-library',
    author: 'ms. smarty pants',
    likes:100,
    userId:'123'
  }

  const component = render(
    <SimpleBlog blog={blogPost} />
  )
  const iv = component.container.querySelector('div')
  const div = component.container.querySelector('.title')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library ms. smarty pants'
  )
})

test('likes are  correct -SimbleBlog', () => {

  const blogPost = {
    title: 'Component testing is done with react-testing-library',
    author: 'ms. smarty pants',
    likes:100,
    userId:'123'
  }

  const component = render(
    <SimpleBlog blog={blogPost} />
  )
  const div = component.container.querySelector('.likes')
  expect(div).toHaveTextContent(
    'blog has 100 likes'
  )
})


test('clicking the button calls event handler once', async () => {
  const blogPost = {
    title: 'Component testing is done with react-testing-library',
    author: 'ms. smarty pants',
    likes:100,
    userId:'123'
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blogPost} onClick={mockHandler}/>
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})