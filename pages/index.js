import { Fragment } from "react"
import Head from "next/head";

import Hero from "../components/home-page/hero"
import FeaturePosts from "../components/home-page/featured-posts"
import { getFeaturePosts } from "../utils/post-util"

function HomePage(props) {

  return <Fragment>
    <Head>
      <title>Luis' Blog</title>
      <meta name='description' content='I post about programming and web development.' />
    </Head>
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