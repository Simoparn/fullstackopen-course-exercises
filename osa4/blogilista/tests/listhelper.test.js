const listHelper = require('../utils/list_helper')

describe('4.3', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('4.4, total likes', () => {
  const listWithBlogs = [
    {
      title: 'trying blogs',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM',
      likes: 4,
      id: '625cacca596836b2313bbe80'
    },
    {
      title: 'more blogs',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO',
      likes: 14,
      id: '625cade0596836b2313bbe85'
    },
    {
      title: 'even more blogs',
      author: 'Moore Blogger',
      url: 'https://nice-and-fine-example-blogs.com/MooreB',
      likes: 30,
      id: '625dbbbb4f7946bbd5b89ae7'
    }
  ]

  test('total likes in the blogs', () => {

    const result = listHelper.totalLikes(listWithBlogs)
    expect(result).toBe(48)
  })
})

describe('4.5, favorite blog', () => {
  const listWithBlogs = [
    {
      title: 'trying blogs',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM',
      likes: 4,
      id: '625cacca596836b2313bbe80'
    },
    {
      title: 'more blogs',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO',
      likes: 14,
      id: '625cade0596836b2313bbe85'
    },
    {
      title: 'even more blogs',
      author: 'Moore Blogger',
      url: 'https://nice-and-fine-example-blogs.com/MooreB',
      likes: 30,
      id: '625dbbbb4f7946bbd5b89ae7'
    }
  ]

  test('favorite blog', () => {

    const result = listHelper.favoriteBlog(listWithBlogs)
    expect(result).toBe(listWithBlogs[2])
  })
})



describe('4.6, most blogs', () => {

  const listWithBlogs = [
    {
      title: 'trying blogs',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM',
      likes: 4,
      id: '625cacca596836b2313bbe80'
    },
    {
      title: 'trying blogs 2',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM_2',
      likes: 3,
      id: '625dcb0f6fef1c6e3f77d472'
    },
    {
      title: 'trying blogs 3',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM_3',
      likes: 14,
      id: '625dcb346fef1c6e3f77d474'
    },
    {
      title: 'more blogs',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO',
      likes: 14,
      id: '625cade0596836b2313bbe85'
    },
    {
      title: 'more blogs 2',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO_2',
      likes: 24,
      id: '625dcb8d6fef1c6e3f77d476'
    },
    {
      title: 'more blogs 3',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO_3',
      likes: 18,
      id: '625dcbab6fef1c6e3f77d478'
    },
    {
      title: 'more blogs 4',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO_4',
      likes: 22,
      id: '625dcbe56fef1c6e3f77d47a'
    },
    {
      title: 'even more blogs',
      author: 'Moore Blogger',
      url: 'https://nice-and-fine-example-blogs.com/MooreB',
      likes: 30,
      id: '625dbbbb4f7946bbd5b89ae7'
    },
    {
      title: 'even more blogs 2',
      author: 'Moore Blogger',
      url: 'https://nice-and-fine-example-blogs.com/MooreB_2',
      likes: 8,
      id: '625dcc526fef1c6e3f77d47d'
    }
  ]

  test('Person with most blogs', () => {

    const result = listHelper.mostBlogs(listWithBlogs)
    expect(result).toEqual({"author":listWithBlogs[4].author, "blogs":4})
  })
})


describe('4.7, person with most total likes', () => {


  const listWithBlogs = [
    {
      title: 'trying blogs',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM',
      likes: 4,
      id: '625cacca596836b2313bbe80'
    },
    {
      title: 'trying blogs 2',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM_2',
      likes: 3,
      id: '625dcb0f6fef1c6e3f77d472'
    },
    {
      title: 'trying blogs 3',
      author: 'Meikä Mattilainen',
      url: 'https://nice-and-fine-example-blogs.com/MeikaM_3',
      likes: 14,
      id: '625dcb346fef1c6e3f77d474'
    },
    {
      title: 'more blogs',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO',
      likes: 14,
      id: '625cade0596836b2313bbe85'
    },
    {
      title: 'more blogs 2',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO_2',
      likes: 24,
      id: '625dcb8d6fef1c6e3f77d476'
    },
    {
      title: 'more blogs 3',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO_3',
      likes: 18,
      id: '625dcbab6fef1c6e3f77d478'
    },
    {
      title: 'more blogs 4',
      author: 'Alan Oldham',
      url: 'https://nice-and-fine-example-blogs.com/AlanO_4',
      likes: 22,
      id: '625dcbe56fef1c6e3f77d47a'
    },
    {
      title: 'even more blogs',
      author: 'Moore Blogger',
      url: 'https://nice-and-fine-example-blogs.com/MooreB',
      likes: 30,
      id: '625dbbbb4f7946bbd5b89ae7'
    },
    {
      title: 'even more blogs 2',
      author: 'Moore Blogger',
      url: 'https://nice-and-fine-example-blogs.com/MooreB_2',
      likes: 68,
      id: '625dcc526fef1c6e3f77d47d'
    }
  ]



  test('Person with most total likes', () => {

    const result= listHelper.mostLikes(listWithBlogs)
    expect(result).toEqual({"author":listWithBlogs[7].author, "blogs":98})
  })


})