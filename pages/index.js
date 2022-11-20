import { useRef, useState } from "react";

function HomePage() {

  const [feedBackItems, setFeedBackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        text: enteredFeedback
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedBackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler} >
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="id" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" row="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler} >Load Feedback</button>
      <h2>Feedback</h2>
      <ul>
        { feedBackItems.map((item) => ( <li key={item.id}>{item.text}</li> )) }
      </ul>
    </div>
  );
}

export default HomePage;
