describe('Blog app tests 5.17-5.22', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Cypress Test User',
      username: 'testusername1',
      password: 'testpassword1',
    }

    cy.request('POST', 'http://localhost:3000/api/users/', user)

    const seconduser = {
      name: 'Cypress Test User 2',
      username: 'testusername2',
      password: 'testpassword2',
    }

    cy.request('POST', 'http://localhost:3000/api/users/', seconduser)

    cy.visit('http://localhost:3000')
  })

  it('5.17 Login form is shown by default', function () {
    cy.visit('http://localhost:3000')
    cy.get('#login-form').contains('login')
    cy.get('#login-form').contains('username')
    cy.get('#login-form').contains('password')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      /*Login directly with HTTP request, see ./cypress/support/commands folder for the login command code
      cy.login({ username: 'testusername1', password: 'testpassword1' }) 

      /*Login with form
        cy.contains('log in').click()
        cy.get('#username').type('testusername1')
        cy.get('#password').type('testpassword1')
        cy.get('#login-button').click()
      

      cy.contains('Cypress Test User logged in')*/
    })

    it('5.18 login succeeds with correct credentials', function () {
      //Login directly with HTTP request, see ./cypress/support/commands folder for the login command code
      cy.login({
        username: 'testusername1',
        password: 'testpassword1',
      })

      cy.contains('Cypress Test User logged in')
      cy.contains('logout').click()
    })

    it('5.18 Login fails with wrong credentials', function () {
      //Login directly with HTTP request, see ./cypress/support/commands folder for the login command code

      cy.login({
        username: 'testusername1',
        password: 'testpassword167',
      })

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('5.19 a new blog can be created', function () {
      cy.login({
        username: 'testusername1',
        password: 'testpassword1',
      })

      cy.contains('new blog').click()
      cy.get('#new-blog-title').clear()
      cy.get('#new-blog-title').type('a blog created by cypress')
      cy.contains('save').click()
      //Finding the view button for the newly created blog
      cy.contains('a blog created by cypress')
        .parent()
        .find('button')
        .contains('view')
        .as('theButton')
      cy.get('@theButton').click()
      //After pressing blog view button, check that all the column headers are shown
      cy.get('#list-blog-title')
        .contains('a blog created by cypress')
        .parent()
        .should('contain', 'Author')
        .and('contain', 'title')
        .and('contain', 'URL')
        .and('contain', 'Likes')
    })

    it('5.20 a new blog can be liked', function () {
      cy.login({
        username: 'testusername1',
        password: 'testpassword1',
      })

      cy.contains('new blog').click()
      cy.get('#new-blog-title').clear()
      cy.get('#new-blog-title').type('a blog created by cypress')
      cy.get('#new-blog-likes').type('468781')
      cy.contains('save').click()
      //Finding the view button for the newly created blog
      cy.contains('a blog created by cypress')
        .parent()
        .find('button')
        .contains('view')
        .as('theButton')
      cy.get('@theButton').click()
      //After pressing blog view button, check that all the column headers as well as like and remove buttons are shown
      cy.get('#list-blog-title')
        .contains('a blog created by cypress')
        .parent()
        .should('contain', 'Author')
        .and('contain', 'Title')
        .and('contain', 'URL')
        .and('contain', 'Likes')

      cy.get('#list-blog-title')
        .contains('a blog created by cypress')
        .parent()
        .find('button')
        .contains('Like this blog')
        .click()

      //Checking that likes are properly increased, page must be refreshed first to show the updated likes
      cy.visit('http://localhost:3000')
      /*Pressing view so the updated likes can be seen in the cypress test suite, doesn't work for some reason
      cy.contains('a blog created by cypress').parent().find('button').contains('view').as('theButton')
      cy.get('@theButton').click()
      */
      cy.get('#list-blog-title')
        .contains('a blog created by cypress')
        .parent()
        .should('contain', '468782')
    })

    it('5.21 a new blog can be deleted', function () {
      cy.login({
        username: 'testusername1',
        password: 'testpassword1',
      })

      cy.contains('new blog').click()
      cy.get('#new-blog-title').clear()
      cy.get('#new-blog-title').type('a blog created by cypress')
      cy.contains('save').click()

      //Finding the view button for the newly created blog
      cy.contains('a blog created by cypress')
        .parent()
        .find('button')
        .contains('view')
        .as('theButton')
      cy.get('@theButton').click()

      //After pressing blog view button, check that the like and remove buttons are shown
      cy.get('#list-blog-title')
        .contains('a blog created by cypress')
        .parent()
        .should('contain', 'Like this blog')
        .and('contain', 'Remove this blog')

      cy.get('#list-blog-title')
        .contains('a blog created by cypress')
        .parent()
        .find('button')
        .contains('Remove this blog')
        .click()

      //Check that the removed blog no longer exists, page must be refreshed after deleting a blog
      cy.visit('http://localhost:3000')
      cy.get('#list-blog-title').should('not.exist')
    })

    it('5.21 a blog can only be deleted by its own user', function () {
      cy.login({
        username: 'testusername1',
        password: 'testpassword1',
      })

      cy.contains('new blog').click()
      cy.get('#new-blog-title').clear()
      cy.get('#new-blog-title').type('a blog created by cypress')
      cy.contains('save').click()
      cy.contains('logout').click()

      cy.login({
        username: 'testusername2',
        password: 'testpassword2',
      })

      //Finding the view button for the newly created blog
      cy.contains('a blog created by cypress')
        .parent()
        .find('button')
        .contains('view')
        .as('theButton')
      cy.get('@theButton').click()

      //After pressing blog view button, check that only the like button is shown for the new user
      cy.get('#list-blog-title')
        .contains('a blog created by cypress')
        .parent()
        .should('contain', 'Like this blog')
        .and('not.exist', 'Remove this blog')
    })

    describe('if several blogs are added', function () {
      beforeEach(function () {
        // see ./cypress/support/commands folder for createBlog command code
        cy.createBlog({
          title: 'first blog with cypress',
          author: 'author',
          url: 'testurl',
          likes: 4,
        })
        cy.createBlog({
          title: 'second blog with cypress',
          author: 'author',
          url: 'testurl',
          likes: 8,
        })
        cy.createBlog({
          title: 'third blog with cypress',
          author: 'author',
          url: 'testurl',
          likes: 12,
        })
      })

      it('one of these can be viewed fully', function () {
        cy.contains('second blog with cypress')
          .parent()
          .find('button')
          .as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'view')
      })

      it('then example, click all view buttons', function () {
        cy.get('button')
          .contains('view')
          .then((buttons) => {
            console.log('number of view buttons', buttons.length)
            cy.wrap(buttons[0]).click()
          })
      })
    })
  })
})
