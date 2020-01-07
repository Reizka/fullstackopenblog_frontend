const blogs = [
  {
    id:'23423423423423',
    title: 'Component',
    author: 'ms. smarty pants',
    likes:1,
    userId:{
      username:'stan781',
      name:'stan',
      id:'5e0f9902dd619b81425f7f3b'
    }
  },
  {
    id:'3242dfsg3453',
    title: 'testing is ',
    author: 'ms. smarty',
    likes:2,
    userId:{
      username:'stan781',
      name:'stan',
      id:'5e0f9902dd619b81425f7f3b'
    }
  },
  {
    id:'1234124124',
    title: 'done with ',
    author: 'ms.',
    likes:3,
    userId:{
      username:'stan78',
      name:'stan',
      id:'5e0f9902dd619b81425f7f3c'
    }
  },
  {
    id:'789076897',
    title: 'react-testing-library',
    author: 'ms. pants',
    likes:4,
    userId:{
      username:'stan78',
      name:'stan',
      id:'5e0f9902dd619b81425f7f3c'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }