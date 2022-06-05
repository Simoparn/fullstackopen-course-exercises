import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './Blogform'
import userEvent from '@testing-library/user-event'

test('5.16 <BlogForm /> calls the received prop callback function with the right data when a blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getByRole('textbox')

  //Testing for multiple input fields
  // const inputs = screen.getAllByRole('textbox')
  //await user.type(inputs[0], 'testing a form...')

  //Find by placeholder text
  // const input = screen.getByPlaceholderText('write here note content')

  //Find by id
  //const { container } = render(<NoteForm createNote={createNote} />)
  //const input = container.querySelector('#note-input')

  //Find by text content, promise returned
  //const element = screen.getByText(
  //  'Does not work anymore :(', { exact: false }
  //)

  

  const sendButton = screen.getByText('save')

  await user.type(input, 'testing the form for adding a new blog...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].content).toBe('testing the form for adding a new blog...')
})







/*Make sure that something is not rendered
test('renders nothing', () => {
  const blog = {
    title: 'This is a reminder',
    author: 'Testauthor',
    url: 'testURL',
    likes: 313
  }

  render(<Blog blog={blog} />)

  const element = screen.queryByText('do not want this to be rendered')
  expect(element).toBeNull()
})*/


