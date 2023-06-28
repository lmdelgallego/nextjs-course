import { Fragment } from "react";
import Head from "next/head";
import AllPosts from "../../components/posts/all-post"
import { getAllPosts } from "../../utils/post-util"

function AllPostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name='description' content='A list of all programming-related tutorials and posts!' />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  )
}

export function getStaticProps() {
  const allPosts = getAllPosts()
  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostPage