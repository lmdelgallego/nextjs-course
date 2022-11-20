import { useState, Fragment } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {

  const [feedbackData, setFeedbackData] = useState()

  // how to get the data from the server form dynamic route
  function loadFeedbackHandler(id) {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then(({ feedback }) => {
        setFeedbackData(feedback)
      });
  }


  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text} <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Detail</button>
          </li>
        ))
        }
      </ul>
    </Fragment>
      )
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