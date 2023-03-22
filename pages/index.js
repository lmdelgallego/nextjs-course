import { Fragment } from "react"
import Hero from "../components/home-page/hero"
import FeaturePosts from "../components/home-page/featured-posts"

const DUMMY_POSTS = [{
  title: 'Getting started with Nextjs',
  image: 'getting-started-nextjs.png',
  excerpt:'Nextjs is a the React framework form production',
  date: '2023-02-10',
  slug: 'getting-started-with-nextjs',
},{
  title: 'Getting started with Nextjs',
  image: 'getting-started-nextjs.png',
  excerpt:'Nextjs is a the React framework form production',
  date: '2023-02-10',
  slug: 'getting-started-with-nextjs1',
},
{
  title: 'Getting started with Nextjs',
  image: 'getting-started-nextjs.png',
  excerpt:'Nextjs is a the React framework form production',
  date: '2023-02-10',
  slug: 'getting-started-with-nextjs2',
},{
  title: 'Getting started with Nextjs',
  image: 'getting-started-nextjs.png',
  excerpt:'Nextjs is a the React framework form production',
  date: '2023-02-10',
  slug: 'getting-started-with-nextjs3',
}];

function HomePage() {
  return <Fragment>
    <Hero />
    <FeaturePosts posts={DUMMY_POSTS}/>
  </Fragment>
}

export default HomePage