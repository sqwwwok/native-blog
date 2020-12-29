import config from '../config.js'
import ContentContainer from './components/content-container.js'
import Home from './components/contents/home.js'
import Blogs from './components/contents/blogs.js'
import Docs from './components/contents/docs.js'


ContentContainer({
  name: 'content-container',
  navgation: config.navgation,
  profile: config.favicon,
})

Home({
  name: 'home-content'
})

Blogs({
  name: 'blogs-content'
})

Docs({
  name: 'docs-content'
})




