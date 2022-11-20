import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
  return <ul>
    { props.feedbackItems.map((item) => ( <li key={item.id}>{item.text}</li> )) }
  </ul>
}

export async function getStaticProps() {
  // If you want to fetch data from an API, you can do it here and pass it to the page as props
  // fetch()
  // If the fetch data is on the same server, you can use the file system to read the data
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data
    }
  }
}

export default FeedbackPage;