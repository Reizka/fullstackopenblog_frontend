import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'


afterEach(cleanup)

test('renders content', () => {

  const blogPost = {
    title: 'Component testing is done with react-testing-library',
    author: 'ms. smarty pants',
    likes:100,
    userId:'123'
  }

  const component = render(
    <Blog blog={blogPost} />
  )
  const li = component.container.querySelector('div')
  //console.log(prettyDOM(li));
  //component.debug();
  // tapa 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  /* // tapa 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()*/

  // tapa 3
  const div = component.container.querySelector('.blogpost')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
