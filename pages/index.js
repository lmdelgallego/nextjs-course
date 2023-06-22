import { Fragment } from "react"
import Hero from "../components/home-page/hero"
import FeaturePosts from "../components/home-page/featured-posts"
import { getFeaturePosts } from "../utils/post-util"

function HomePage(props) {

  return <Fragment>
    <Hero />
    <FeaturePosts posts={props.posts}/>
  </Fragment>
}

export function getStaticProps() {
  const featurePosts = getFeaturePosts()
  return {
    props: {
      posts: featurePosts
    },
    // revalidate: 600
  }
}

export default HomePage