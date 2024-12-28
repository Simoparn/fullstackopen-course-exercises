import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './Blogform'
import userEvent from '@testing-library/user-event'

test('5.16 <BlogForm /> calls the received prop callback function with the right data when a blog is created', async () => {
  const user = userEvent.setup()
  const mockCreateBlog = jest.fn()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const inputs = screen.getAllByRole('textbox')
  console.log('Test 5.16: first input field default value: ', inputs[0].value)
  console.log('Test 5.16: second input field default value: ', inputs[1].value)
  console.log('Test 5.16: third input field default value: ', inputs[2].value)
  console.log('Test 5.16: fourth input field default value: ', inputs[3].value)
  await user.clear(inputs[0])
  await user.clear(inputs[1])
  await user.clear(inputs[2])
  await user.type(inputs[0], 'testing the form for adding a new blog title...')
  await user.type(inputs[1], 'testing the form for adding a new blog author...')
  await user.type(inputs[2], 'testing the form for adding a new blog url...')

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
  await user.click(sendButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  console.log(
    '5.16 test: mockCreateBlog calls content:',
    mockCreateBlog.mock.calls[0][0].title
  )
  expect(mockCreateBlog.mock.calls[0][0].title).toBe(
    'testing the form for adding a new blog title...'
  )
  expect(mockCreateBlog.mock.calls[0][0].author).toBe(
    'testing the form for adding a new blog author...'
  )
  expect(mockCreateBlog.mock.calls[0][0].url).toBe(
    'testing the form for adding a new blog url...'
  )
  expect(mockCreateBlog.mock.calls[0][0].likes).toBe(0)
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
