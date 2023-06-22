import AllPosts from "../../components/posts/all-post"
import { getAllPosts } from "../../utils/post-util"

function AllPostPage(props) {
  return <AllPosts posts={props.posts} />
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