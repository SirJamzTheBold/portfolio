function StartPage({ dispatcher }) {
  return (
    <div className="start-page">
      <p>
        This form will challenge your patience, your confidence, and even your
        sanity. Good luck!
      </p>
      <p>You'll need it!</p>
      <button className="btn" onClick={() => dispatcher({ type: "start" })}>
        Start
      </button>
    </div>
  );
}

export default StartPage;
