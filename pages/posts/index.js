import AllPosts from "../../components/posts/all-post"

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

function AllPostPage() {
  return <AllPosts posts={DUMMY_POSTS} />
}

export default AllPostPage