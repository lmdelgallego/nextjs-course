import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'posts');

function getPostData (fileName) {
  const filePath = path.join(postDirectory, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, ''); // remove the file extension

  const postData = {
    slug: postSlug,
    ...data,
    content
  }
  return postData;
}

function getAllPosts () {
  const postFiles = fs.readdirSync(postDirectory);
  const allPosts = postFiles.map(postFile => getPostData(postFile))
  const sortedPosts = allPosts.sort( (postA, postB) => postA.date > postB.date ? -1 : 1 )
  return sortedPosts;
}

function getFeaturePosts() {
  const allPosts = getAllPosts()
  const featurePosts = allPosts.filter(post => post.isFeatured )
  return featurePosts;
}