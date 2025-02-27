import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import Blog from './Blog'

describe('5.13-5.15, blog front end tests', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'testURL',
    likes: 999,
    user: 'Test User',
    id: 'testid',
  }

  const testUser = {
    username: 'testauthor',
    name: 'Test Author',
    blogs: blog,
    id: 1,
  }

  beforeEach(async () => {})

  //TODO: view all function needs to be implemented first
  test('5.13, shows blog title and author, but not URL and likes by default', () => {
    //Find components with CSS selectors
    const { container } = render(
      <Togglable buttonLabel="view">
        <Blog blog={blog} currentUser={testUser} />
      </Togglable>
    )
    const div = container.querySelector('.singleblog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)

    const titleshown = screen.getByText(blog.title)
    const authorshown = screen.getByText(blog.author)
    const urlshown = screen.getByText(blog.url)
    const likesshown = screen.getByText(blog.likes)
    expect(titleshown).toBeDefined()
    expect(authorshown).toBeDefined()
    expect(urlshown).not.toBeDefined()
    expect(likesshown).not.toBeDefined()

    //screen.debug(element)
  })

  test('5.14 All data is shown when view button is pressed', async () => {
    const { container } = render(
      <Togglable buttonLabel="view">
        <Blog blog={blog} currentUser={testUser} />
      </Togglable>
    )

    const div = container.querySelector('.singleblog')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent('Test Author')
    expect(div).toHaveTextContent('testURL')
    expect(div).toHaveTextContent('999')

    const user = userEvent.setup()
    const viewbutton = screen.getByText('view')

    expect(viewbutton).toBeDefined()

    await user.click(viewbutton)

    const titleshown = screen.getByText(blog.title)
    const authorshown = screen.getByText(blog.author)
    const urlshown = screen.getByText(blog.url)
    const likesshown = screen.getByText(blog.likes)
    expect(titleshown).toBeDefined()
    expect(authorshown).toBeDefined()
    expect(urlshown).toBeDefined()
    expect(likesshown).toBeDefined()

    //Check event handler
    //expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('5.15 Check that event handler is called twice when like button for a blog is pressed twice', async () => {
    const mockUpdateHandler = jest.fn()
    const mockRemoveHandler = jest.fn()
    const user = userEvent.setup()

    const { container } = render(
      <Togglable buttonLabel="view">
        <Blog
          blog={blog}
          currentUser={testUser}
          updateBlog={mockUpdateHandler}
          removeBlog={mockRemoveHandler}
        />
      </Togglable>
    )

    const viewbutton = screen.getByText('view')
    expect(viewbutton).toBeDefined()

    await user.click(viewbutton)
    console.log(
      'Testing 5.15: If no error message, clicking view button succeeded'
    )

    const likebutton = screen.getByText('Like this blog')
    expect(likebutton).toBeDefined()
    try {
      await user.click(likebutton)
      await user.click(likebutton)
    } catch (err) {
      console.log('Testing 5.15: Error while trying to click the like button')
    } finally {
      console.log(
        'Testing 5.15: If no error message, clicking like button succeeded'
      )
    }

    //Check event handler calls
    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })
})
